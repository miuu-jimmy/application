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


type Data = { success: boolean , path: string,msg: String}
export const config = {
  api: {
    bodyParser: false,
    
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let result : Data = {success : false ,path:"", msg:""}
  let sentfields:any
  let sentfiles:any
  try {
  const {fields, files } = await new Promise((resolve, reject) => {
    const form = new IncomingForm()
   
    form.parse(req, (err, fields, files) => {
      console.log("/UploadCover")
      //console.log(files)
      if (err) return reject(err)
      resolve({ fields, files })
    })
   

  })
  sentfields = fields
  sentfiles = files
  } catch (err) {
    console.log(err)
  }
  
  console.log(sentfiles)
  try {
  const contents = await fs.rename(sentfiles?.file.filepath,"public/nft/" + sentfields.username + ".png")
  result.msg= "We've uploaded your cover"
  result.path= "public/nft/" + sentfields.username + ".png"
  result.success= true
  } catch (err) {
    result.msg = err as String
    
  }
 
  
  
  res.status(200).json(result)
}

