// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AccountLayout, TOKEN_PROGRAM_ID, transfer, getOrCreateAssociatedTokenAccount, createTransferInstruction } from '@solana/spl-token';
import { Account, Connection, Ed25519Keypair, Keypair, PublicKey, clusterApiUrl, Signer, Transaction, TransactionInstruction } from '@solana/web3.js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Swap, } from '@project-serum/swap';
import { TokenListContainer, TokenInfo, TokenListProvider, Strategy } from '@solana/spl-token-registry';
import { getProvider, Program, AnchorProvider, Wallet } from '@project-serum/anchor';
import { Market } from '@project-serum/serum';
import { token } from '@project-serum/anchor/dist/cjs/utils';
import BN from 'bn.js';
import { spawn } from 'child_process';

import db from '../../lib/db'

//////////////////////////////////////////////////////////////////////////////
// Prepared Statements

var insert_transaction = db.prepare("INSERT INTO `transactions`('user_id', 'signature', 'created') VALUES (?, ?, ?)")
var update_track_payment = db.prepare("UPDATE `tracks` SET `TotalPayments` = `TotalPayments` + ? WHERE `user_id` = ? AND `name` = ?");

const bs58 = require('bs58');
type Data = { success: boolean, msg: String }


const loadSecretKey = async function () {
  const environnement = "dev"
  if (environnement == "dev") {
    return Keypair.generate()
  } else {
    // read from file 
    return Keypair.generate()
  }

}
const loadWallet = async function () {
  const environnement = "dev"
  if (environnement == "dev") {
    console.log("Setting Dev Wallet")
    const b = bs58.decode("5ZZqrLpJ9rRAg7nGCKJBLLifEJ3tMp7ZanNtQteEfcZwg2bS7tbqWp8WW9F8uhKAEb1ha79bDMvDv3mmAKMfMVZN")
    const j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    return new Wallet(Keypair.fromSecretKey(j))
  } else {
    // read from file 
    return Wallet.local()
  }

}

const getBalance = async (owner: Wallet) => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(owner.publicKey), { programId: TOKEN_PROGRAM_ID, });


  const balance = AccountLayout.decode(tokenAccounts.value[0].account.data);
  console.log(`${new PublicKey(balance.mint)}   ${balance.amount}`);
  return balance

}
const swapUtil = async function () {

  //let marketAddress = new PublicKey('7xMDbYTCqQEcK2aM9LbetGtNFJpzKdfXzLL5juaLh4GJ');
  //let programAddress = new PublicKey("EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o");
  //let market = await Market.load(connection, marketAddress,{},programAddress);
  // Anchor version 
  /* // Fetching orderbooks
let bids = await market.loadBids(connection);
let asks = await market.loadAsks(connection);
// L2 orderbook data
for (let [price, size] of bids.getL2(20)) {
 console.log(price, size);
}*/
  //const tokenstrat = await new TokenListProvider( )
  // const tokenlist = await tokenstrat.resolve("Solana" as Strategy)
  // const SOL  = tokenlist.filterByTag("SOL").getList()[0]
  // const USDC = tokenlist.filterByTag("USDC").getList()[0]
  // Swap some tokens 
  /*let payer = new PublicKey("CpMah17kQEL2wqyMKt3mZBdTnZbkbfx4nqmQMFDP5vwp"); // spl-token account : USDC
  const client = new Swap(ownerProvider, tokenlist)
  const exchangeRate  = {
    rate: new BN(1),
    fromDecimals: SOL.decimals,
    quoteDecimals: USDC.decimals,
    strict: true,
};
  const res = await client.swap({
    fromMint: new PublicKey(SOL.address),
    toMint: new PublicKey(USDC.address),
    amount: new BN(1),
    minExchangeRate: exchangeRate,
    fromMarket: market
  });
  console.log(res);
  */
}
const requestUSDC = async function (userWalletPubKey: string, amount: number, trackName: string) {

  // Fetch the Wa ve Vault Wallet Balance for USDC and SOl 

  const result = { success: false, msg: "" }
  let msg = ""

  let connection = new Connection('https://api.devnet.solana.com');

  let ownerWallet = await loadWallet()
  let ownerProvider = new AnchorProvider(connection, ownerWallet, {})


  // USDC MINT
  const mint = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU")

  console.log("Getting Token Account")
  let fromTokenAccount
  try {
    fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      ownerWallet.payer,
      mint,
      ownerWallet.payer.publicKey,
    );
  } catch (err) {
    result.msg = "Error Fetching Owner ADA, Try Again later"
    return result
  }
  console.log("Getting Balance")
  let balance
  try {
    balance = await getBalance(ownerWallet)
  } catch (err) {
    result.msg = "Error Fetching Owner Balance, Try Again later"
    return result
  }
  // Get the token account of the toWallet address, and if it does not exist, create it
  console.log("Getting receiver TokenAccount")
  let toTokenAccount
  try {
    toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, ownerWallet.payer, mint, new PublicKey(userWalletPubKey));
  } catch (err) {
    result.msg = "Error Fetching user ADA, Try Again later"
    return result
  }
  // USDT balance == 0
  if (Number(balance.amount) == 0) {
    // swap token 
    swapUtil()
    result.success = false
    result.msg = "We are Getting more USDC - try again Later"

  } else {
    // transfer the USDC amount to the user
    console.log("createTransfer instruction ")
    const transfer = new Transaction();

    let blockhash
    try {
      blockhash = await connection.getLatestBlockhash('finalized');
    } catch (err) {
      result.msg = "Error Fetching LatestBlockhash, Try Again later"
      return result
    }
    transfer.recentBlockhash = blockhash.blockhash
    transfer.add(createTransferInstruction(
      fromTokenAccount.
        address, toTokenAccount.
      address, ownerWallet.publicKey,
      amount
    ))

    transfer.sign(ownerWallet.payer)
    console.log("Transfer  ")
    let res
    try {
      res = await ownerProvider.sendAndConfirm(transfer)
    } catch (err) {
      result.msg = "Error Sending Transaction LatestBlockhash, Try Again later"
      return result
    }
    // saving in db
    try {
      insert_transaction.run(userWalletPubKey, res, Date.now())
      update_track_payment.run(amount, userWalletPubKey, trackName)
    }
    catch (err) {
      result.msg = "Transfer Successfull - Error while saving track data in db, Ask support for more information"
      result.success = true
      return result
    }
    result.success = true
    result.msg = "Successfull USDC transfer, Check your History "
  }
  return result
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let result = { success: false, msg: "" }
  if (req.query.amount && req.query.track && req.query.user) {

    let rs = await requestUSDC(req.query.user as string, Number(req.query.amount), req.query.track as string)
    result = rs

  }



  res.status(200).json(result)
}

