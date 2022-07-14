import express from 'express'
import config from './config'
import cors  from 'cors'
//import productoRoutes from './routes/producto.routes'
import categoriaRoutes from './routes/categoria.routes'


const app  = express()

// setings
app.set('port', config.port)
app.use(cors({
  origin:true,
  credentials:true
}))

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (_req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Bienvenido al API de la aplicación'
  })
})

//rutas
//app.use(productoRoutes)
app.use(categoriaRoutes)

// 404
app.use((_req, res) => {
  res.status(404).json({
    message: '404 not found'
  })
})

export default app
