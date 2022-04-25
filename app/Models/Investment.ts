import { DateTime } from 'luxon'
import User from 'App/Models/User'

import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

export default class Investment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number

  @column()
  public period: string

  @column()
  public walletId: number

  @column()
  public userId: number

  @column()
  public rolloverType: string

  @column()
  public tagName: string

  @column()
  public currencyCode: string

  @column()
  public long: number

  @column()
  public lat: number

  @column()
  public walletHolderDetails: JSON

  @column.dateTime({ autoCreate: false })
  public payoutDate: DateTime

  @column()
  public interestRate: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationship
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
