import { web3 } from "@project-serum/anchor";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { createTransferInstruction, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';


export const PayFee = async () => {
  
  var connection = new web3.Connection(
    web3.clusterApiUrl('mainnet-beta'),
  );
  
  const getProvider = async () => {
    if ("solana" in window) {

      // opens wallet to connect to
      await window.solana.connect(); 

      const provider = window.solana;
      if (provider.isPhantom) {
        console.log("Is Phantom installed?  ", provider.isPhantom);
        return provider;
      }
    } else {
      window.open("https://www.phantom.app/", "_blank");
    }
  }

 
    var provider = await getProvider()

    const publicKey = provider.publicKey
    const signTransaction = provider.signTransaction

    const amount = 1

    const wve_address = new web3.PublicKey("33MJjPS6H7P2nwD648uiTiUu8v5fJ1zKyjnVqeWZ344F")

    const toPubkey = new web3.PublicKey("4hH5BHEJ3JznsTZdVykntUv3R4fFZPSHjZiauoSCBQEt")


    if (!publicKey || !signTransaction) throw new WalletNotConnectedError()
    
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,
        wve_address,
        publicKey,
        signTransaction
    )

    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,
        wve_address,
        toPubkey,
        signTransaction
    )

    const transaction = new Transaction().add(
        createTransferInstruction(
            fromTokenAccount.address, 
            toTokenAccount.address, 
            publicKey,
            amount * LAMPORTS_PER_SOL,
            [],
            TOKEN_PROGRAM_ID
        )
    )

    let blockhashObj = await connection.getLatestBlockhash()
    transaction.recentBlockhash = await blockhashObj.blockhash
    transaction.feePayer = await provider.publicKey
    
    let signed = await provider.signTransaction(transaction)
    let signature = await connection.sendRawTransaction(signed.serialize())
    await connection.confirmTransaction(signature)
    console.log("Payment sent!")
    console.log(signature)
  }
