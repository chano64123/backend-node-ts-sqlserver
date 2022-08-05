import { Request, Response } from 'express'
import * as sql from '../database'
import Producto from '../models/producto.model'
import Categoria from '../models/categoria.model'
import Respuesta from '../models/respuesta.model'
import { errores, mensajes } from '../global/enviroment'

export class ProductoController {
  static getProductos = async (_req: Request, res: Response) => {
    let respuesta: any
    let codigo: number = 200
    try {
      const pool = await sql.getConnection()
      if (pool) {
        const resultProductos = await pool.request().query(sql.queriesProducto.getProductos)
        const resultCategorias = await pool.request().query(sql.queriesCategoria.getCategorias)

        if (resultProductos.rowsAffected[0] > 0){
          // mapeando resultado a la clase producto
          const productos = resultProductos.recordset.map(producto => {
            const categoriaResult: any = resultCategorias.recordset.map(categoria => { return new Categoria(categoria.idCategoria, categoria.nombre )}).find(categoria => categoria.id === producto.idCategoria)
            return new Producto(producto.idProducto, categoriaResult, producto.nombre, producto.cantidad)
          })

          // armando respuesta de la consulta
          codigo = 200
          respuesta = Respuesta.getSuccess(productos, mensajes.LISTA_PRODUCTOS)
        } else {
          // armando respuesta de la consulta
          codigo = 404
          respuesta = Respuesta.getSuccessNoResult(mensajes.PRODUCTO_NO_RESULTADO)
        }

      } else {
        // armando respuesta de la consulta
        codigo = 500
        respuesta = Respuesta.getErrorNoReultNoErrorMessage(errores.ERROR_CONECTAR_BD)
      }      
    } catch (error: any) {
      codigo = error.statusCode || 500
      respuesta = Respuesta.getError(errores.ERROR_SERVIDOR, error.message)
    } finally {
      return res.status(codigo).json(respuesta)
    }
  }

  static getProductoById = async (_req: Request, res: Response) => {
    let respuesta: any
    let codigo: number = 200
    try {
      const pool = await sql.getConnection()
      if (pool) {
        const idProducto: number = Number(_req.params.id)
        const resultProductos = await pool.request().input("idProducto", sql.sql.Int, idProducto).query(sql.queriesProducto.getProductoById)

        if (resultProductos.rowsAffected[0] > 0){
          const idCategoria: number = resultProductos.recordset[0].idCategoria
          console.log(idCategoria)
          const resultCategorias = await pool.request().input("idCategoria", sql.sql.Int, idCategoria).query(sql.queriesCategoria.getCategoriaById)  
          // mapeando resultado a la clase producto
          const productos = resultProductos.recordset.map(producto => {
            const categoriaResult: any = resultCategorias.recordset.map(categoria => { return new Categoria(categoria.idCategoria, categoria.nombre )}).find(categoria => categoria.id === producto.idCategoria)
            return new Producto(producto.idProducto, categoriaResult, producto.nombre, producto.cantidad)
          })

          // armando respuesta de la consulta
          codigo = 200
          respuesta = Respuesta.getSuccess(productos[0], mensajes.PRODUCTO_ID)
        } else {
          // armando respuesta de la consulta
          codigo = 404
          respuesta = Respuesta.getSuccessNoResult(mensajes.PRODUCTO_NO_ENCONTRADO)
        }

      } else {
        // armando respuesta de la consulta
        codigo = 500
        respuesta = Respuesta.getErrorNoReultNoErrorMessage(errores.ERROR_CONECTAR_BD)
      }      
    } catch (error: any) {
      codigo = error.statusCode || 500
      respuesta = Respuesta.getError(error.message, errores.ERROR_SERVIDOR)
    } finally {
      return res.status(codigo).json(respuesta)
    }
  }

  static getProductoByNombre = async (_req: Request, res: Response) => {
    try {
      return res.status(200).json(Respuesta.getSuccess({}, mensajes.LISTA_PRODUCTOS))
    } catch (error: any) {
      console.log(error.message)
      return res.status(500).json({
        success: false,
        message: errores.ERROR_SERVIDOR,
        error: error.message
      })
    }
  }

  static getProductoByIdCategoria = async (_req: Request, res: Response) => {
    try {
      return res.status(200).json(Respuesta.getSuccess({}, mensajes.LISTA_PRODUCTOS))
    } catch (error: any) {
      console.log(error.message)
      return res.status(500).json({
        success: false,
        message: errores.ERROR_SERVIDOR,
        error: error.message
      })
    }
  }

  static addProducto = async (_req: Request, res: Response) => {
    try {
      return res.status(200).json(Respuesta.getSuccess({}, mensajes.LISTA_PRODUCTOS))
    } catch (error: any) {
      console.log(error.message)
      return res.status(500).json({
        success: false,
        message: errores.ERROR_SERVIDOR,
        error: error.message
      })
    }
  }

  static updateProducto = async (_req: Request, res: Response) => {
    try {
      return res.status(200).json(Respuesta.getSuccess({}, mensajes.LISTA_PRODUCTOS))
    } catch (error: any) {
      console.log(error.message)
      return res.status(500).json({
        success: false,
        message: errores.ERROR_SERVIDOR,
        error: error.message
      })
    }
  }

  static deleteProducto = async (_req: Request, res: Response) => {
    try {
      return res.status(200).json(Respuesta.getSuccess({}, mensajes.LISTA_PRODUCTOS))
    } catch (error: any) {
      console.log(error.message)
      return res.status(500).json({
        success: false,
        message: errores.ERROR_SERVIDOR,
        error: error.message
      })
    }
  }
}