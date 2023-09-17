// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SERVER_URL } from '@/constance';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
}
export default async function get(req: NextRequest) {
  console.log("NextRequest", req.nextUrl.search)
  try {
    const data = await fetch(`${SERVER_URL}/rss/user/link${req.nextUrl.search}`, {
      method: "GET",
    })
    const res = await data.json()
    return new Response(JSON.stringify({
      code: 0,
      data: res,
      msg: "success"
    }), {
      headers: {
        'content-type': 'application/json',
      },
      status: 200
    })
  } catch (e: any) {
    return new Response(JSON.stringify({
      code: 0,
      msg: e?.message,
      data: null
    }), {
      headers: {
        'content-type': 'application/json',
      },
      status: 500
    })
  }
}
