'use strict'

const Model = use('Model')

class Producto extends Model {

    static get table () {
        return 'producto'
    }

    static get primaryKey () {
        return 'id'
    }
}

module.exports = Producto
