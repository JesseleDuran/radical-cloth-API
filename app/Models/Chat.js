'use strict'

const Model = use('Model')

class Chat extends Model {
    static get table () {
        return 'chat'
    }

    static get primaryKey () {
        return 'id'
    }

    pedido() {
        return this.hasOne('App/Models/Pedido', 'id', 'chat_id')
    }

    user1() {
        return this.belongsTo('App/Models/User', 'user_id_1', 'id')
    }

    //por los momentos siempre sera el admin
    user2() {
        return this.belongsTo('App/Models/User', 'user_id_2', 'id')
    }
    
}

module.exports = Chat
