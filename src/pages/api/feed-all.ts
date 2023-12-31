// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SERVER_URL } from '@/constance';
import { execSQL } from '@/database/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  runtime: 'edge',
}
export default async function handler() {

  try {
    const data = await fetch(`http://127.0.0.1:8080/rss`, {
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
