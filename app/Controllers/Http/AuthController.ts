import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '10 days',
    })
    return token.toJSON()
  }

  public async register({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const firstName = request.input('firstName')
    const lastName = request.input('lastName')
    const gender = request.input('gender')
    const phoneNumber = request.input('phoneNumber')
    const accountName = request.input('accountName')
    const accountNumber = request.input('accountNumber')
    const dateOfBirth = request.input('dateOfBirth')
    const address = request.input('address')
    const accountType = request.input('accountType')
    const smsNotification = request.input('smsNotification')
    const emailNotification = request.input('emailNotification')
    const documents = request.input('documents')
    const branchCode = request.input('branchCode')

    /**
     * Create a new user
     */
    const newUser = new User()
    newUser.email = email
    newUser.password = password
    newUser.name = firstName
    newUser.lastName = lastName
    newUser.gender = gender
    newUser.phoneNumber = phoneNumber
    newUser.accountName = accountName
    newUser.accountNumber = accountNumber
    newUser.accountType = accountType
    newUser.dateOfBirth = dateOfBirth
    newUser.address = JSON.stringify(address)
    newUser.smsNotification = JSON.stringify(smsNotification)
    newUser.emailNotification = JSON.stringify(emailNotification)
    newUser.documents = JSON.stringify(documents)
    newUser.branchCode = branchCode
    console.log(newUser)
    await newUser.save()
    const token = await auth.use('api').login(newUser, {
      expiresIn: '10 days',
    })

    return token.toJSON()
  }
}
