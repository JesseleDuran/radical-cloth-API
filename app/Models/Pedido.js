'use strict'

const Model = use('Model')

class Pedido extends Model {
    static get table () {
        return 'pedidos'
    }

    static get primaryKey () {
        return 'id'
    }

    cliente() {
        return this.belongsTo('App/Models/User', 'cliente_id', 'id')
    }

    chat() {
        return this.hasOne('App/Models/Chat', 'chat_id', 'id')
    }

    producto() {
        return this.belongsTo('App/Models/Producto', 'producto_id', 'id')
    }
}

module.exports = Pedido
