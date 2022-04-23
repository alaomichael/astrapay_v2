import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Investment from 'App/Models/Investment'

export default class InvestmentsController {
  public async index({}: HttpContextContract) {
    const investment = await Investment.query().preload('user')
    return investment
  }
  public async show({ params }: HttpContextContract) {
    try {
      const investment = await Investment.find(params.id)
      if (investment) {
        await investment.preload('user')
        // await investment.preload('forum');
        return investment
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const investment = await Investment.find(params.id)
    if (investment) {
      investment.title = request.input('title')
      investment.content = request.input('content')
      if (await investment.save()) {
        await investment.preload('user')
        // await investment.preload('forum')
        return investment
      }
      return // 422
    }
    return // 401
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()
    const investment = new Investment()
    investment.title = request.input('title')
    investment.content = request.input('content')
    // investment.forumId = request.input('forum');
    await user.related('investments').save(investment)
    return investment
  }
  public async destroy({ response, auth, params }: HttpContextContract) {
    const user = await auth.authenticate()
    const investment = await Investment.query()
      .where('user_id', user.id)
      .where('id', params.id)
      .delete()
    console.log('Deleted data:', investment)
    return response.redirect('/dashboard')
  }
}
