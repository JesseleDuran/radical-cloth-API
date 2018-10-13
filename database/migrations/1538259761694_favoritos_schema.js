'use strict'

const Schema = use('Schema')

class FavoritosSchema extends Schema {
  up () {
    this.create('favoritos', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('producto_id').notNullable().unsigned().references('id').inTable('producto')
      table.timestamps()
    })
  }

  down () {
    this.drop('favoritos')
  }
}

module.exports = FavoritosSchema
