import {config} from 'dotenv'
config()

export default{
  // puerto del server
  port: process.env.PORT || 3000,
  // base de datos
  dbUser: process.env.DB_USER_AZURE || '',
  dbPassword: process.env.DB_PASSWORD_AZURE || '',
  dbServer: process.env.DB_SERVER_AZURE || '',
  dbDatabase: process.env.DB_DATABASE_AZURE || ''
}