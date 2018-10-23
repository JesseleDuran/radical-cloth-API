'use strict'

const Schema = use('Schema')

class ChatSchema extends Schema {
  up () {
    this.create('chat', (table) => {
      table.increments()
      table.integer('user_id_1').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('user_id_2').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatSchema
