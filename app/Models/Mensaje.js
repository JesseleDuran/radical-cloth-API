'use strict'

const Model = use('Model')

class Mensaje extends Model {
    static get table () {
        return 'menssages'
    }

    static get primaryKey () {
        return 'id'
    }

    chat() {
        return this.hasOne('App/Models/Chat', 'chat_id', 'id')
    }

    autor() {
        return this.belongsTo('App/Models/User', 'autor_id', 'id')
    }

    
}

module.exports = Mensaje
