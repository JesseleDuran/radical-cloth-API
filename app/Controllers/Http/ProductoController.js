'use strict'

const Producto = use('App/Models/Producto')
const Imagen = use('App/Models/Imagen')
class ProductoController {

    async index ({response}) {

        const productos = await Producto
        .query()
        .with('imagenes')
        .fetch()

        return response.json(productos)
    }

    async show ({params, response}) {
        const producto = await Producto.find(params.id)
        return response.json(producto)
    }

    async store ({request, response}) {
        let productoInfo = request.only(['precio', 'nombre', 'dias_hacer', 'descripcion'])

        const newProduct = await Producto.create(productoInfo)
        productoInfo = request.only(['imagenes'])

        if(productoInfo.imagenes.length > 0) {
            for(let imagen of productoInfo.imagenes) {
                const newImagen = new Imagen()
                newImagen.direccion_imagen = imagen.direccion_imagen
                newImagen.producto_id = newProduct.id
                await newImagen.save()
            }
        }
        return response.status(201).json(newProduct)
    }

    async update ({params, request, response}) {
        let productoInfo = request.only(['precio', 'nombre', 'dias_hacer', 'descripcion'])

        const producto = await Producto.find(params.id)
        if (!producto) {
          return response.status(404).json({data: 'Resource not found'})
        }
        producto.precio = productoInfo.precio
        producto.nombre = productoInfo.nombre
        producto.dias_hacer = productoInfo.dias_hacer
        producto.descripcion = productoInfo.descripcion
        await producto.save()
        productoInfo = request.only(['imagenes'])

        if(productoInfo.imagenes.length > 0) {
            for(let imagen of productoInfo.imagenes) {
                const newImagen = new Imagen()
                newImagen.direccion_imagen = imagen.direccion_imagen
                newImagen.producto_id = newProduct.id
                await newImagen.save()
            }
        }

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
