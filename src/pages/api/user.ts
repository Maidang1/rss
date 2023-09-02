// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { execSQL } from '@/database/db';
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  name: string
}
export const config = {
  runtime: 'edge',
}
export default async function handler(
  req: NextApiRequest,
) {
  const user = (req.cookies as any).get("username") || {};
  const { value } = user
  try {
    // const userInfo = await execSQL(`select * from users where name="${value}";`)
    // console.log("userInfo", userInfo)
    const userInfo = [{
      "id": 50993231,
      "node_id": "MDQ6VXNlcjUwOTkzMjMx",
      "avatar_url": "https://avatars.githubusercontent.com/u/50993231?v=4",
      "name": "Maidang1"
    }]
    return new Response(JSON.stringify(userInfo[0]), {
      status: 200,
      headers: {
        'content-type': 'application/json',

      }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ msg: e.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',

      }
    })
  }
}
