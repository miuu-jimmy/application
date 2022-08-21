// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AccountLayout, TOKEN_PROGRAM_ID , transfer, getOrCreateAssociatedTokenAccount, createTransferInstruction} from '@solana/spl-token';
import { Account, Connection,Ed25519Keypair, Keypair, PublicKey,clusterApiUrl, Signer,Transaction, TransactionInstruction } from '@solana/web3.js'
import type { NextApiRequest, NextApiResponse } from 'next'
import {Swap, }  from '@project-serum/swap';
import { TokenListContainer, TokenInfo, TokenListProvider, Strategy} from '@solana/spl-token-registry';
import { getProvider, Program, AnchorProvider, Wallet  } from '@project-serum/anchor';
import { Metaplex, keypairIdentity, bundlrStorage, Nft } from "@metaplex-foundation/js";
import { IncomingForm } from 'formidable'
// you might want to use regular 'fs' and not a promise one
import { promises as fs } from 'fs'
import db from '../../lib/db'
var select_tracks_by_user = db.prepare("SELECT * FROM `tracks` WHERE `user_id` = ? ORDER BY `created` DESC LIMIT 1");

const bs58 = require('bs58');
type Data = { success: boolean , nft: Nft, msg: String}
const loadSecretKey = async function() {
  const environnement = "dev"
  if (environnement == "dev")
  {
    return Keypair.generate() 
  }  else  {
    // read from file 
    return Keypair.generate() 
  }

} 
const loadWallet = async function() {
  const environnement = "dev"
  if (environnement == "dev")
  {
    console.log("Setting Dev Wallet")
    const b = bs58.decode("5ZZqrLpJ9rRAg7nGCKJBLLifEJ3tMp7ZanNtQteEfcZwg2bS7tbqWp8WW9F8uhKAEb1ha79bDMvDv3mmAKMfMVZN")
    const j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    return new Wallet(Keypair.fromSecretKey(j))
  }  else  {
    // read from file 
    return Wallet.local()
  }

} 

const getNFT = async (owner : Wallet)  => { 
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(owner.publicKey),{programId: TOKEN_PROGRAM_ID,});
  
 
    const balance = AccountLayout.decode( tokenAccounts.value[0].account.data);
    console.log(`${new PublicKey(balance.mint)}   ${balance.amount}`);
    return balance

}

const requestNft= async function (userWalletPubKey : string) {

  // Fetch the Wa ve Vault Wallet Balance for USDC and SOl 
 
  const result = {success: false, nft: {} as Nft }
  let msg = ""
  let connection = new Connection('https://api.devnet.solana.com');
  // save the file locally

  let ownerWallet = await loadWallet()
  let ownerProvider = new AnchorProvider(connection,ownerWallet, {})
  const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(ownerWallet.payer))
  .use(bundlrStorage());
  
  try {
  const { nft } = await metaplex
    .nfts()
    .create({
        uri: "https://localhost:3000/nft/" + userWalletPubKey,
        name: "wave " + userWalletPubKey.substring(0,10),
        owner: new PublicKey(userWalletPubKey),
        sellerFeeBasisPoints: 500, // Represents 5.00%.
    })
    .run();
    result.success= true; 
    result.nft = nft; 
  } catch (err){
    console.log(err)
    result.success= false; 
  }
  return result
}
// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  }
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let result : Data = {success : false , nft: {} as Nft , msg:""}
  const {fields, files } = await new Promise((resolve, reject) => {
    const form = new IncomingForm()
   
    form.parse(req, (err, fields, files) => {
      console.log("/UploadCover")
      console.log(files)
      if (err) return reject(err)
      //console.log(files)
      resolve({ fields, files })
    })
   

  })
  const select =  select_tracks_by_user.all(fields.username)
  console.log(select)
  //console.log(contents)
  let nft :Nft
  try {
    let rs = await requestNft(fields.username as string)
    nft = rs.nft
    result.msg= result.msg + "Created an NFT at " + nft.mintAddress
    result.success=true
    result.nft = nft
  } catch (err) {
    result.msg = err as String
  }
  
  
  res.status(200).json(result)
}

