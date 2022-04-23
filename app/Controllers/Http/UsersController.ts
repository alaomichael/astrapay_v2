import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async investmentsByUser({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    await user.preload('investments')
    const investments = user.investments
    return investments
  }

  public async forumsByUser({ auth }: HttpContextContract) {
    // const user = await auth.authenticate()
    // await user.preload('forums')
    // const forums = user.forums
    // return forums
  }
}
