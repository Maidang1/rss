// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ReadableStreamToJSON } from "@maidang606/utils"
import { peoplesConfig } from "@/config/user"
import { XMLParser } from "fast-xml-parser"
const xmlParser = new XMLParser()

export const config = {
  runtime: 'edge',
}



type AnyFunction = (...args: any[]) => any


const HOST_URL = process.env.PROD ? process.env.HOST_URL : "http://localhost:1200"

// https://rss-hub-ruddy-one.vercel.app
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = await ReadableStreamToJSON(req.body)
  const { github, bilibili } = peoplesConfig[user as keyof typeof peoplesConfig]

  const tasks: any[] = []

  if (github) {
    tasks.push({
      fn: () => fetch(`${HOST_URL}/github/repos/${github}`),
      tag: "github",
      author: "maidang1"
    })
  }

  // https://rsshub.app/bilibili/user/dynamic/2267573
  if (bilibili) {
    tasks.push({
      fn: () => fetch(`${HOST_URL}/bilibili/user/dynamic/${bilibili}`),
      tag: "bilibili",
      author: "maidang1"
    })
  }
  const result: any[] = []

  const dataRes = await new Promise(async (resolve, reject) => {
    try {
      for (let i = 0; i < tasks.length; i++) {
        const { fn, tag, author } = tasks[i];
        const data = await fn()
        const text = await data.text()
        const json = xmlParser.parse(text)
        result[i] = json.rss.channel
        result[i].tag = tag
        result[i].author = author
        if (result.length === tasks.length) {
          resolve(result)
        }
      }
    } catch {
      reject([])
    }
  })

  return new Response(JSON.stringify(dataRes), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  })
}
