// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PublicKey } from '@solana/web3.js'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  result: {}
}

const requestUSDC= async function (userWalletPubKey : PublicKey) {
  
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let {result}  = {result: {user: "myuser"}}
  
  res.status(200).json({ result: result })
}

