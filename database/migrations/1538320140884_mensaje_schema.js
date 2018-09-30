'use strict'

const Schema = use('Schema')

class MensajeSchema extends Schema {
  up () {
    this.create('mensajes', (table) => {
      table.increments()
      table.integer('id_sender').notNullable().unsigned().references('id').inTable('users')
      table.string('file_direction', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('mensajes')
  }
}

module.exports = MensajeSchema
