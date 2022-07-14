import { Router } from 'express'
import { CategoriaController } from '../controllers/categoria.controller'

const router = Router()

router.get('/api/categorias', CategoriaController.getCategorias)
router.get('/api/categorias/:id', CategoriaController.getCategoriaById)
router.get('/api/categorias/nombre/:nombre', CategoriaController.getCategoriaByNombre)
router.post('/api/categorias', CategoriaController.addCategoria)
router.put('/api/categorias/:id', CategoriaController.updateCategoria)
router.delete('/api/categorias/:id', CategoriaController.deleteCategoria)

export default router
