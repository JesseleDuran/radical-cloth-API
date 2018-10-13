'use strict'

const Model = use('Model')

class Favorito extends Model {

    static get table () {
        return 'favoritos'
    }

    user() {
        return this.belongsTo('App/Models/User', 'id', 'id')
    }

    producto() {
        return this.belongsTo('App/Models/Producto', 'producto_id', 'id')
    }
}

module.exports = Favorito
