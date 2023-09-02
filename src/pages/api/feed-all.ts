// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { execSQL } from '@/database/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  runtime: 'edge',
}
let cacheData = {}
let nextTime = new Date().getTime();
export default async function handler(
) {
  if (Object.keys(cacheData).length !== 0 && new Date().getTime() < nextTime) {
    console.log("using cache data")
    return new Response(JSON.stringify(cacheData), {
      headers: {
        'content-type': 'application/json',
      },
    })
  }
  try {
    const data = await execSQL(`select * from rss;`);
    console.log("using database data")
    cacheData = data
    nextTime = new Date().getTime() + 0.5 * 60 * 60 * 1000;
    return new Response(JSON.stringify({
      code: 0,
      msg: cacheData
    }), {
      headers: {
        'content-type': 'application/json',
      },
    })
  }
  catch (e: any) {
    console.log(e)
    cacheData = {}
    nextTime = new Date().getTime()
    return new Response(JSON.stringify({ code: -1, msg: e.message }), {
      headers: {
        'content-type': 'application/json',
      },
    })
  }

}
