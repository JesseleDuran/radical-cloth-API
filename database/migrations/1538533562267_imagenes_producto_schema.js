'use strict'

const Schema = use('Schema')

class ImagenesProductoSchema extends Schema {
  up () {
    this.create('imagenes_productos', (table) => {
      table.increments()
      table.integer('producto_id').notNullable().unsigned().references('id').inTable('producto')
      table.string('direccion_imagen', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('imagenes_productos')
  }
}

module.exports = ImagenesProductoSchema
