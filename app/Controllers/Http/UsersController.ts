import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.all()

      if (users) {
        console.log('USERS: ', users)
        return response.ok(users)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // public async index({ response }) {
  //   const users = await .all()

  //   return response.ok(users)
  // }
  public async investmentsByUser({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    // await user.preload('investments')
    await user.$getRelated('investments')
    //  await user.$preloaded
    const investments = user.investments
    return investments
  }

  public async forumsByUser({}: HttpContextContract) {
    // const user = await auth.authenticate()
    // await user.preload('forums')
    // const forums = user.forums
    // return forums
  }
}
