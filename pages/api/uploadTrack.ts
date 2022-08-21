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
export const config = {
  api: {
    bodyParser: false,
    
  },
}

type Data = { success: boolean ,path: String, msg: String}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let result : Data = {success : false , path:"", msg:""}
  const {fields, files } = await new Promise((resolve, reject) => {
    const form = new IncomingForm()
   //console.log(form)
    form.parse(req, (err, fields, files) => {
      console.log("/UploadTrack")
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })
  console.log(files)
  try {
    await fs.access("public/music/" + fields.username)
  }catch (err){
    await fs.mkdir("public/music/" + fields.username)
  }
  try {
   
  const contents = await fs.rename(files?.file2.filepath,"public/music/"+ fields.username +"/" + fields.name + ".mp3")
  result.msg= "We've uploaded your Track"
  result.path= "public/music/"+ fields.username +"/" + fields.name + ".mp3"
  result.success = true ;
  } catch (err) {
    result.msg = err as String
    
  }
 
  
  
  res.status(200).json(result)
}

