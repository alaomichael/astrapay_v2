import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Investments extends BaseSchema {
  protected tableName = 'investments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('amount', 255).notNullable()
      table.string('period', 255).notNullable()
      table.integer('user_id').notNullable()
      table.integer('walletId').nullable()
      table.string('rolloverType', 255).notNullable()
      table.string('tagName', 255).notNullable()
      table.string('currencyCode', 255).notNullable()
      table.float('long').nullable()
      table.float('lat').nullable()
      table.json('walletHolderDetails').notNullable()
      table.date('payoutDate').notNullable()
      table.float('interestRate').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
