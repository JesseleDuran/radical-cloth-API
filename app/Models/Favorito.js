'use strict'

const Model = use('Model')

class Favorito extends Model {

    static get table () {
        return 'favoritos'
    }

    user() {
        return this.belongsTo('App/Models/User', 'id', 'id')
    }
}

module.exports = Favorito
