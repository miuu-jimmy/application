// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PublicKey } from '@solana/web3.js'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  result: {}
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let result  = {user: "myuser"}
  
  res.status(200).json({ result: result })
}

