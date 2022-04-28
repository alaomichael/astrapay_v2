import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.string('phone_number', 255).notNullable()
      table.string('account_name', 255).notNullable()
      table.string('account_number', 255).nullable()
      table.string('email', 255).notNullable().unique()
      table.string('gender', 10).notNullable()
      table.date('date_of_birth').notNullable()
      table.string('password').notNullable()
      table.string('remember_me_token').nullable()
      table.jsonb('address').nullable()
      table.string('account_type', 180).notNullable()
      table.string('sms_notification').notNullable()
      table.string('email_notification').notNullable()
      table.jsonb('documents').nullable()
      table.string('branch_code').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
