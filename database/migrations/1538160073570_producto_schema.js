'use strict'

const Schema = use('Schema')

class ProductoSchema extends Schema {
  up () {
    this.create('producto', (table) => {
      table.increments()
      table.float('precio').unsigned()
      table.string('nombre', 254).notNullable().unique()
      table.integer('dias_hacer').unsigned()
      table.text('descripcion')
      table.timestamps()
    })
  }

  down () {
    this.drop('productos')
  }
}

module.exports = ProductoSchema
