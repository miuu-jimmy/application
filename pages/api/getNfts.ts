// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  result: { success: boolean , nfts: string[]}
}


const getNFT = async (userWalletPubKey : string)  => { 
    const nfts  = []
    // fetch in database 

    // Quick solution 
    // find the nft in  local storage 
    nfts[0] = "http://localhost:3000/nft/" + userWalletPubKey + ".png"

    return nfts

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const nfts = await getNFT(req.query.user as string )
  const success = true
  let result : Data = { result : {success, nfts}}
  
  
  res.status(200).json(result)
}

