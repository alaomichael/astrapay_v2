import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('firstName', 255).notNullable()
      table.string('lastName', 255).notNullable()
      table.string('phoneNumber', 255).notNullable()
      table.string('accountName', 255).notNullable()
      table.string('accountNumber', 255).nullable()
      table.string('email', 255).notNullable().unique()
      table.string('gender', 10).notNullable()
      table.date('dateOfBirth').notNullable()
      table.text('password').notNullable()
      table.string('remember_me_token').nullable()
      // table.float('long').nullable()
      // table.float('lat').nullable()
      table.json('address').nullable()
      table.string('accountType', 180).notNullable()
      table.boolean('smsNotification').notNullable()
      table.boolean('emailNotification').notNullable()
      table.jsonb('documents').nullable()
      table.string('branchCode').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
