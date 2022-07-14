export enum queriesCategoria {
  getCategorias = 'SELECT * FROM categoria',
  getCategoriaById = 'SELECT * FROM categoria WHERE idCategoria = @idCategoria',
  getCategoriaByNombre = `SELECT * FROM categoria WHERE nombre LIKE (%@nombre%)`,
  addCategoria = 'INSERT INTO categoria (nombre) VALUES (@nombre)',
  getLastCategoria = 'SELECT TOP 1 * FROM categoria ORDER BY idCategoria DESC',
  updateCategoria = 'UPDATE categoria SET nombre = @nombre WHERE idCategoria = @idCategoria',
  deleteCategoria = 'DELETE FROM categoria WHERE idCategoria = @idCategoria'
}

export enum queriesProducto {
  getProductos = 'SELECT * FROM producto',
  getProductoById = 'SELECT * FROM producto WHERE idProducto = @idProducto',
  getProductoByNombre = 'SELECT * FROM producto WHERE nombre = @nombre',
  getProductoByIdCategoria = 'SELECT * FROM producto WHERE idCategoria = @idCategoria',
  addProducto = 'INSERT INTO producto (nombre, idCategoria, cantidad) VALUES (@nombre, @idCategoria, @cantidad)',
  updateProducto = 'UPDATE producto SET nombre = @nombre, idCategoria = @idCategoria, cantidad = @cantidad WHERE idProducto = @idProducto',
  deleteProducto = 'DELETE FROM producto WHERE idProducto = @idProducto'
}