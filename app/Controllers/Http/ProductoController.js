'use strict'

const Producto = use('App/Models/Producto')
const Imagen = use('App/Models/Imagen')
const Helpers = use('Helpers')
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
        const producto_imagenes = await producto.imagenes().fetch()
        return response.json({producto, 'imagenes': producto_imagenes})
    }

    async store ({request, response}) {
        let filesNames = []
        const hasImage = request.only(['hasImagen'])
        let productoInfo = request.only(['precio', 'nombre', 'dias_hacer', 'descripcion'])
        const newProduct = await Producto.create(productoInfo)

        if(hasImage.hasImagen !== 'false') {
            filesNames = await this.storeFile({request})
            for(let name of filesNames) {
                const newImagen = new Imagen()
                newImagen.name_imagen = name
                newImagen.producto_id = newProduct.id
                await newImagen.save()
            }
        }     
        
        return response.status(201).json({'producto': newProduct, 'imagenes': filesNames})
    }

    async storeFile({request, response}) {

        const productoPics = request.file('imagenes', {
            types: ['image'],
            size: '60mb'
        })
        let names = []
        for (let i in productoPics) {
            for (let j in productoPics[i]) {
                if (productoPics[i][j].hasOwnProperty('clientName')) {
                    names.push(productoPics[i][j].clientName)
                }
            }
        }
            
        await productoPics.moveAll(Helpers.tmpPath('productos'))
        
        if (!productoPics.movedAll()) {
            return response.status(404).json({error: 'Files did not were updated'})
        }
        return names
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
                newImagen.name_imagen = imagen
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
        return response.status(204).json('Success')
    }
}

module.exports = ProductoController
