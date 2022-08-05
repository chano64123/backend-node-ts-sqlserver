import { Router } from 'express'
import { ProductoController } from '../controllers/producto.controller'

const router = Router()

router.get('/api/productos', ProductoController.getProductos)
router.get('/api/productos/:id', ProductoController.getProductoById)
router.get('/api/productos/nombre/:nombre', ProductoController.getProductoByNombre)
router.get('/api/productos/categoria/:id', ProductoController.getProductoByIdCategoria)
router.post('/api/productos', ProductoController.addProducto)
router.put('/api/productos/:id', ProductoController.updateProducto)
router.delete('/api/productos/:id', ProductoController.deleteProducto)

export default router
