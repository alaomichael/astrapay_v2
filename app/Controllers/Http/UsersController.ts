import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async index({ response }) {
    const users = await User.all()

    return response.ok(users)
  }
  public async investmentsByUser({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    await user.preload('investments')
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
