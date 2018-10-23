'use strict'

const Schema = use('Schema')

class PedidoSchema extends Schema {
  up () {
    this.create('pedidos', (table) => {
      table.increments()
      table.integer('cliente_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('chat_id').notNullable().unsigned().references('id').inTable('chat').onDelete('CASCADE')
      table.string('talla', 254).notNullable()
      table.string('color', 254).notNullable()
      table.string('foto', 254).notNullable()
      table.boolean('is_terminado').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pedidos')
  }
}

module.exports = PedidoSchema