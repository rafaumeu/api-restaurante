export default {
  client: 'sqlite3',
  connection: {
    filename: './src/database/database.db'
  },
  pool: {
    afterCreate: (conn: any, done: any) => {
      conn.run('PRAGMA foreign_keys = ON')
      done()
    }
  },
  migrations: {
    extensions: "ts",
    directory: './src/database/migrations'
  },
  seeds : {
    extensions: "ts",
    directory: './src/database/seeds'
  },
  useNullAsDefault: true
}