// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabaseClient } from "@/database/db"

type Data = {
  name: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const connect = getDatabaseClient();
  const data = await connect.execute("select * from rss");
  res.status(200).send({ name: data.size });
}
