'use strict'

const Schema = use('Schema')

class MenssagesSchema extends Schema {
  up () {
    this.create('menssages', (table) => {
      table.increments()
      table.integer('autor_1').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('chat_id').notNullable().unsigned().references('id').inTable('chat').onDelete('CASCADE')
      table.text('mensaje')
      table.timestamps()
    })
  }

  down () {
    this.drop('menssages')
  }
}

module.exports = MenssagesSchema
