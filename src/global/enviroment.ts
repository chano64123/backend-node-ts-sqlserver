export enum errores {
  ERROR_SERVIDOR = 'Error en el servidor',
  ERROR_CONECTAR_BD = 'Error al conectar con la base de datos',
  ERROR_BD = 'Error en la base de datos',
  //categorias
  ERROR_INSERTAR_CATEGORIA = 'Error al crear la categoria',
  ERROR_ACTUALIZAR_CATEGORIA = 'Error al actualizar la categoria',
  ERROR_ELIMINAR_CATEGORIA = 'Error al eliminar la categoria',
}

export enum mensajes {
  // CATEGORIAS
  LISTA_CATEGORIAS = 'Lista de Categorias',
  CATEGORIA_ID = 'Categoria por id',
  CATEGORIA_NOMBRE = 'Categoria por nombre',
  CATEGORIA_AGREGADA = 'Categoria agregada',
  CATEGORIA_ACTUALIZADA = 'Categoria actualizada',
  CATEGORIA_ELIMINADA = 'Categoria eliminada',
  CATEGORIA_NOMBRE_NO_ENCONTRADO = 'Categorias no encontradas por nombre',
  CATEGORIA_NO_ENCONTRADA = 'Categoria no encontrada',
  CATEGORIA_NO_RESULTADO = 'No hay categorias registradas',

  // PRODUCTOS
  LISTA_PRODUCTOS = 'Lista de Productos',
  LISTA_PRODUCTOS_CATEGORIA = 'Lista de Productos por categoria',
  LISTA_PRODUCTOS_NOMBRE = 'Lista de Productos por nombre',
  PRODUCTO_AGREGADO = 'Producto agregado',
  PRODUCTO_ACTUALIZADO = 'Producto actualizado',
  PRODUCTO_ELIMINADO = 'Producto eliminado',
  PRODUCTO_ID = 'Producto por id',
  PRODUCTO_NO_ENCONTRADO = 'Producto no encontrado',
  PRODUCTO_NO_RESULTADO = 'No hay productos registrados',
}