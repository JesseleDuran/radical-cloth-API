'use strict'
const Pedido = use('App/Models/Pedido')
const Chat = use('App/Models/Chat')
const User = use('App/Models/User')
const Helpers = use('Helpers')
class PedidoController {

    async create ({request, response, auth}) {
        try {
            let pedidoInfo = request.only(['talla', 'color', 'producto_id', 'cantidad'])
            const productoPic = request.file('imagen')
            let fotoName = ''
            //find id of user admin
            const userAdmin = await User.query().where('admin', 1).first()
            if(productoPic) {
                fotoName = await this.storeFile({request})
            }
            //create chat of pedido
            const chat = new Chat()
            chat.user_id_1 = auth.user.id
            chat.user_id_2 = userAdmin.id
            await chat.save()
            //create pedido
            const pedido = new Pedido()
            pedido.cliente_id = auth.user.id
            pedido.producto_id = pedidoInfo.producto_id
            pedido.chat_id = chat.id
            pedido.talla = pedidoInfo.talla
            pedido.color = pedidoInfo.color
            pedido.foto = fotoName
            pedido.cantidad = pedidoInfo.cantidad
            await pedido.save()
            
            return response.status(201).json({'pedido': pedido, 'chat': chat})
        }catch (error) {
            return response.status(401).send({"error": error.message})
        }
    }

    async storeFile({request, response}) {

        const productoPic = request.file('imagen', {
            types: ['image'],
            size: '60mb'
        })
        const name = new Date().getTime() + '.' + productoPic.subtype
        await productoPic.move(Helpers.publicPath('personalizados'), {
            name: name,
            overwrite: true
        })
        
        if (!productoPic.moved()) {
            return response.status(404).json({error: 'File did not update'})
        }
        return name 
    }

    async indexAuth ({response, auth}) {
        const pedidos = await Pedido
        .query()
        .where('cliente_id', auth.user.id)
        .with('chat')
        .with('producto')
        .fetch()
        return response.json(pedidos)
    }

    async indexToAdmin ({response, request}) {
        const pedidos = await Pedido
        .query()
        .with('chat')
        .with('producto')
        .fetch()
        return response.json(pedidos)
    }

    async updateStatus ({response, request, params}) {
        let pedidoInfo = request.only(['status'])
        const pedido = await Pedido.find(params.id)
        if (!pedido) {
            return response.status(404).json({data: 'Resource not found'})
        }
        pedido.status = pedidoInfo.status
        await pedido.save()
        return response.status(200).json(pedido)
    }
}

module.exports = PedidoController
