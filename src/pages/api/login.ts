// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CLIENT_ID, CLIENT_SECRET } from '@/config/user'
import { execSQL } from '@/database/db'
import type { NextApiRequest, NextApiResponse } from 'next'
const cookieAge = 24 * 60 * 60 * 30; // 30 天过期

type Data = {
  name: string
}
export const config = {
  runtime: 'edge',
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const parsedUrl = new URL(req.url!)
  const params = new URLSearchParams(parsedUrl.search);
  const code = params.get('code')
  let userInfo: any = {}
  try {
    if (code) {
      const res = await fetch(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        }
      }).then(data => data.json()).catch(err => {
        console.log("error", err)
      })

      const { access_token } = res;
      userInfo = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `token ${access_token}`
        }
      }).then(data => data.json())
      console.log(userInfo)
      const { id, node_id, avatar_url, login } = userInfo;
      execSQL(`INSERT INTO users (id, node_id, avatar_url, name) VALUES (${id}, "${node_id}", "${avatar_url}", "${login}");`)
    }
    return new Response(JSON.stringify("login success go back home"), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        "Set-Cookie": `username=${userInfo.login}; Path=/; Max-Age=${cookieAge}; HttpOnly`

      },
    })
  } catch (e) {
    return new Response(JSON.stringify("login error"), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }

}
