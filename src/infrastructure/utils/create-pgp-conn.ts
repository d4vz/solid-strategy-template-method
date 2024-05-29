import pgPromise from 'pg-promise'

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_PORT = parseInt(process.env.DB_PORT!)

const url = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`

export const createPgConn = () => {
  const pgp = pgPromise()(url)
  return { connection: pgp, close: () => pgp.$pool.end() }
}
