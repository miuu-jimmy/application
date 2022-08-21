import { AccountLayout, TOKEN_PROGRAM_ID, createMint } from '@solana/spl-token';
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { mintTo, getMint, getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import React, { useState } from 'react';
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useConnection,useWallet } from '@solana/wallet-adapter-react';
import { useSnackbar } from 'nextjs-toast'

export default function PaymentButton({wallet,setBalanceUpdated}) {
  const snackbar = useSnackbar()
  const revenue = 1000
  const percentage = 40
  const amount = (revenue*percentage)/100
  const connection = useConnection();
  //const { publicKey, connect, connecting, connected } = useWallet();
  

  const Keys = wallet;
  // send USDC  via api call
  const sendUSDC = async (amount) => {
    console.log(amount)
    let res
    let data
    if (amount && Keys) {
      try {
        res = await fetch('/api/requestUSDC?user='+Keys.publicKey.toString()+"&amount=" + amount.toString()+"&track=TrackA")
        data = await res.json()
        if (!data.success) {
          snackbar.showMessage(data.msg, "error", "filled")
          return
        } else {
          snackbar.showMessage(data.msg, "success", "filled")
        }
      } catch(err) {
        snackbar.showMessage("Error Fetching api. error: " + err, "error", "filled")
        return
      }
    
    setBalanceUpdated(true)
  }
    return {data}
  }

  // spl-token version
  /*const sendSPL = async (amount, wallet) => {
      // Connect to cluster
      console.log("SPL TOKEN TEST")
      const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');
      // Generate a new wallet keypair and airdrop SOL
      const fromWallet = Keypair.generate();
      const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);

      // Wait for airdrop confirmation
      await connection.confirmTransaction(fromAirdropSignature);

      // Generate a new wallet to receive newly minted token
      const toWallet = wallet;
      
      // Create new token mint
      const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 9);
      if (connection.rpcEndpoint.includes('testnet')) {
        //hardcode USDT mint
        console.log("Trying on testnet")
          mint=new PublicKey("CpMah17kQEL2wqyMKt3mZBdTnZbkbfx4nqmQMFDP5vwp")
      } 
      else if (connection.rpcEndpoint.includes('mainnet') ){
        // hardcodez USDT mint
          mint= new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB")
      } 
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey,
      );
      // Get the token account of the toWallet address, and if it does not exist, create it
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet.publicKeyD);

      // Mint 1 new token to the "fromTokenAccount" account we just created
      let signature = await mintTo(
          connection,
          fromWallet,
          mint,
          fromTokenAccount.address,
          fromWallet.publicKey,
          1000000000,
          
      );
      console.log('mint tx:', signature);

      // Transfer the new token to the "toTokenAccount" we just created
      signature = await transfer(
          connection,
          fromWallet,
          fromTokenAccount.address,
          toTokenAccount.address,
          fromWallet.publicKey,
          amount
      );
      console.log('transfer tx:', signature);

      getBalance(wallet)


    /*   const tokenAccounts = await connection.getTokenAccountsByOwner(
        new PublicKey(toWallet.publicKey),
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );
        const balance = AccountLayout.decode(tokenAccounts.value[0].account.data).amount;
        console.log(`${balance}`); 

      }
      */

      const getBalance = async (wallet)  => { 
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(wallet.publicKey),{programId: TOKEN_PROGRAM_ID,});
        
       
          const balance = AccountLayout.decode( tokenAccounts.value[0].account.data);
          console.log(`${new PublicKey(balance.mint)}   ${balance.amount}`);
        
 
      }
      
     
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
      
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="max-w-xl text-sm text-gray-500">
            <p>
              
            </p>
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
           
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={()=>sendUSDC(amount)}
            >
              Get Payment
            </button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

