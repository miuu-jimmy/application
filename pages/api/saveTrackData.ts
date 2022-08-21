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

export const config = {
  api: {
    bodyParser: false,
    
  },
}
var insert_tracks = db.prepare("INSERT INTO `tracks`('user_id', 'name', cover , music ,'streams', 'TotalPayments', 'created') VALUES (?, ?, ?,?,?, ?, ?)")

type Data = { success: boolean , msg: String}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let result : Data = {success : false , msg:""}
  const {fields, files } = await new Promise((resolve, reject) => {
    const form = new IncomingForm()
   //console.log(form)
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      console.log(fields)
      resolve({ fields, files })
    })
  })
  console.log(files)
  
  try {
  await insert_tracks.run(fields.username,fields.name,fields.coverPath,fields.musicPath,0,0,Date.now())
  result.msg= "We've saved the track metadata"
  result.success=true
  } catch (err) {
    result.msg = err as String
    
  }
 
  
  
  res.status(200).json(result)
}

