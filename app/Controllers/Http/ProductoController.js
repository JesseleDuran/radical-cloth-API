'use strict'

const Producto = use('App/Models/Producto')
class ProductoController {

    async index ({response}) {
        let productos = await Producto.all()
        return response.json(productos)
    }

    async show ({params, response}) {
        const producto = await Producto.find(params.id)
        return response.json(producto)
    }

    async store ({request, response}) {
        const productoInfo = request.only(['precio', 'nombre', 'dias_hacer', 'descripcion'])

        const producto = new Producto()
        producto.precio = productoInfo.precio
        producto.nombre = productoInfo.nombre
        producto.dias_hacer = productoInfo.dias_hacer
        producto.descripcion = productoInfo.descripcion

        await producto.save()
        return response.status(201).json(producto)
    }

    async update ({params, request, response}) {
        const productoInfo = request.only(['precio', 'nombre', 'dias_hacer', 'descripcion'])

        const producto = await Producto.find(params.id)
        if (!producto) {
          return response.status(404).json({data: 'Resource not found'})
        }
        producto.precio = productoInfo.precio
        producto.nombre = productoInfo.nombre
        producto.dias_hacer = productoInfo.dias_hacer
        producto.descripcion = productoInfo.descripcion

        await producto.save()
        return response.status(200).json(producto)
    }

    async delete ({params, response}) {
        const producto = await Producto.find(params.id)
        if (!producto) {
            return response.status(404).json({data: 'Resource not found'})
        }
        await producto.delete()
        return response.status(204).json(null)
    }
}

module.exports = ProductoController
