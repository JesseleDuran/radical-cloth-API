'use strict'

const Model = use('Model')

class Producto extends Model {

    static get table () {
        return 'producto'
    }

    static get primaryKey () {
        return 'id'
    }

    imagenes() {
        return this.hasMany('App/Models/Imagen', 'id', 'producto_id')
    }

    favoritos() {
        return this.hasMany('App/Models/Favorito', 'id', 'producto_id')
    }
}

module.exports = Producto
