import { DateTime } from 'luxon'
import Investment from 'App/Models/Investment'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export type AddressAttributes = {
  country: string
  state: string
  city: string
  street: string
  long: number
  lat: number
}

type DocumentType = 'INTERNATIONAL_PASSPORT' | 'NIN' | 'BVN' | 'UTILITY_BILL' | 'DRIVERS_LICENSE'

export type DocumentAttributes = {
  type: DocumentType
  documentId: string
  docFrontImageUrl: string
  docBackImageUrl: string
  expiryDate: Date
}

type AccountType = 'savings' | 'current';
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public phoneNumber: string

  @column()
  public accountName: string

  @column()
  public accountNumber: string

  @column()
  public gender: string

  @column.dateTime({ autoCreate: false })
  public dateOfBirth: DateTime

  @column()
  public address: AddressAttributes

  @column()
  public accountType: AccountType

  @column()
  public branchCode: string

  @column()
  public smsNotification: boolean

  @column()
  public emailNotification: boolean

  @column()
  public documents: DocumentAttributes[]

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Investment)
  public investments: HasMany<typeof Investment>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
