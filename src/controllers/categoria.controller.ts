import { Request, Response } from 'express'
import * as sql from '../database'
import Categoria from '../models/categoria.model'
import Respuesta from '../models/respuesta.model'
import { errores, mensajes } from '../global/enviroment'

export class CategoriaController {
  static getCategorias = async (_req: Request, res: Response) => {
    let respuesta: any
    let codigo: number = 200
    try {
      const pool = await sql.getConnection()
      if (pool) {
        const result = await pool.request().query(sql.queriesCategoria.getCategorias)

        if (result.rowsAffected[0] > 0){
        // mapeando resultado a la clase Categoria
          const categorias = result.recordset.map(categoria => {
            return new Categoria(categoria.idCategoria, categoria.nombre)
          })

          // armando respuesta de la consulta
          codigo = 200
          respuesta = Respuesta.getSuccess(categorias, mensajes.LISTA_CATEGORIAS)
        } else {
          // armando respuesta de la consulta
          codigo = 404
          respuesta = Respuesta.getSuccessNoResult(mensajes.CATEGORIA_NO_RESULTADO)
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

  static getCategoriaById = async (req: Request, res: Response) => {
    let respuesta: any
    let codigo: number = 200
    try {
      const pool = await sql.getConnection()
      if (pool) {
        const id: number = Number(req.params.id)
        const result = await pool.request().input("idCategoria", sql.sql.Int, id).query(sql.queriesCategoria.getCategoriaById)

        if (result.rowsAffected[0] > 0){
          // mapeando resultado a la clase Categoria
          const categorias = result.recordset.map(categoria => {
            return new Categoria(categoria.idCategoria, categoria.nombre)
          })

          // armando respuesta de la consulta
          codigo = 200
          respuesta = Respuesta.getSuccess(categorias[0], mensajes.CATEGORIA_ID)
        } else {
          // armando respuesta de la consulta
          codigo = 404
          respuesta = Respuesta.getSuccessNoResult(mensajes.CATEGORIA_NO_ENCONTRADA)
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

  static getCategoriaByNombre = async (req: Request, res: Response) => {
    let respuesta: any
    let codigo: number = 200
    try {
      const pool = await sql.getConnection()
      if (pool) {
        const nombre: string = req.params.nombre
        //const result = await pool.request().input("nombre", sql.sql.VarChar, nombre).query(sql.queriesCategoria.getCategoriaByNombre)
        const result = await pool.request().input("nombre", sql.sql.VarChar, nombre).query(`SELECT * FROM categoria WHERE nombre LIKE '%` + nombre + `%'`)

        if (result.rowsAffected[0] > 0){
          // mapeando resultado a la clase Categoria
          const categorias = result.recordset.map(categoria => {
            return new Categoria(categoria.idCategoria, categoria.nombre)
          })

          // armando respuesta de la consulta
          codigo = 200
          respuesta = Respuesta.getSuccess(categorias, mensajes.CATEGORIA_NOMBRE)
        } else {
          // armando respuesta de la consulta
          codigo = 404
          respuesta = Respuesta.getSuccessNoResult(mensajes.CATEGORIA_NOMBRE_NO_ENCONTRADO)
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

  static addCategoria = async (req: Request, res: Response) => {
    let respuesta: any
    let codigo: number = 200
    try {
      const pool = await sql.getConnection()
      if (pool) {
        const nombre: string = req.body.nombre
        const result = await pool.request().input("nombre", sql.sql.VarChar, nombre).query(sql.queriesCategoria.addCategoria)
        
        if (result.rowsAffected[0] == 1){
            const result1 = await pool.request().query(sql.queriesCategoria.getLastCategoria)

          // mapeando resultado a la clase Categoria
          const categoria = result1.recordset.map(categoria => {
            return new Categoria(categoria.idCategoria, categoria.nombre)
          })

          // armando respuesta de la consulta
          codigo = 201
          respuesta = Respuesta.getSuccess(categoria, mensajes.CATEGORIA_AGREGADA)
        } else {
          // armando respuesta de la consulta
          codigo = 400
          respuesta = Respuesta.getErrorNoReultNoErrorMessage(errores.ERROR_INSERTAR_CATEGORIA)
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

  static updateCategoria = async (req: Request, res: Response) => {
    let respuesta: any
    let codigo: number = 200
    try {
      const pool = await sql.getConnection()
      if (pool) {
        const id: number = Number(req.params.id)
        const nombre: string = req.body.nombre
        const result = await pool.request().input("nombre", sql.sql.VarChar, nombre).input("idCategoria", sql.sql.Int, id).query(sql.queriesCategoria.updateCategoria)
        
        if (result.rowsAffected[0] == 1){
            const result1 = await pool.request().input("idCategoria", sql.sql.Int, id).query(sql.queriesCategoria.getCategoriaById)

          // mapeando resultado a la clase Categoria
          const categoria = result1.recordset.map(categoria => {
            return new Categoria(categoria.idCategoria, categoria.nombre)
          })

          // armando respuesta de la consulta
          codigo = 200
          respuesta = Respuesta.getSuccess(categoria, mensajes.CATEGORIA_ACTUALIZADA)
        } else {
          // armando respuesta de la consulta
          codigo = 304
          respuesta = Respuesta.getErrorNoReultNoErrorMessage(errores.ERROR_ACTUALIZAR_CATEGORIA)
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

  static deleteCategoria = async (req: Request, res: Response) => {
    let respuesta: any
    let codigo: number = 200
    try {
      const pool = await sql.getConnection()
      if (pool) {
        const id: number = Number(req.params.id)
        const result = await pool.request().input("idCategoria", sql.sql.Int, id).query(sql.queriesCategoria.deleteCategoria)
    
        if (result.rowsAffected[0] == 1){
          // armando respuesta de la consulta
          codigo = 200
          respuesta = Respuesta.getSuccessNoResult(mensajes.CATEGORIA_ELIMINADA)
        } else {
          // armando respuesta de la consulta
          codigo = 400
          respuesta = Respuesta.getErrorNoReultNoErrorMessage(errores.ERROR_ELIMINAR_CATEGORIA)
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
      console.log(respuesta)
      return res.status(codigo).json(respuesta)
    }
  }
}

