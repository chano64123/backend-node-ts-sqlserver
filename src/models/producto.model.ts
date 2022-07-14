import Categoria from "./categoria.model"

class Producto {
  constructor(
      public id: number,
      public categoria: Categoria,
      public nombre: string,
      public cantidad: number,
  ) { 
      this.id = id
      this.nombre = nombre
      this.categoria = categoria
      this.cantidad = cantidad
  }
}

export default Producto
