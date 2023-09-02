import { connect } from '@planetscale/database'

const config = {}
let con: ReturnType<typeof connect> | null = null

export const getDatabaseClient = () => {
  if (con) return con;
  con = connect(config)
  return con
}
export const execSQL = async (sql: string) => {
  const con = getDatabaseClient()
  const result = await con.execute(sql)
  return result.rows
}