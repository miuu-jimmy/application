// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../lib/db'


//////////////////////////////////////////////////////////////////////////////
// Prepared Statements

var select_tracks_by_user = db.prepare("SELECT * FROM `tracks` WHERE `user_id` = ?");


type Data = { success: boolean, tracks: any[], msg: String }



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let result: Data = { success: false, tracks: [{}], msg: "" }
  if (req.query.user) {
    try {
      const res = await select_tracks_by_user.all(req.query.user);
      result.success = true
      result.tracks = res
    } catch (error) {
      console.log(error);
      result.msg = "Error fetching DB data. error: " + error
    }

  }

  res.status(200).json(result)
}

