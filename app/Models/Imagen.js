'use strict'

const Model = use('Model')

class Imagen extends Model {

    static get table () {
        return 'imagenes_productos'
    }

    producto() {
        return this.belongsTo('App/Models/Producto', 'id', 'id')
    }
}

module.exports = Imagen
