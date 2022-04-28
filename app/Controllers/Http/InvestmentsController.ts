import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Investment from 'App/Models/Investment'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class InvestmentsController {
  public async index({}: HttpContextContract) {
    // const investment = await Investment.query().preload('user')
    const investment = await Investment.all()
    console.log('INVESTMENT: ', investment)
    return investment
  }
  public async show({ params, response }: HttpContextContract) {
    console.log('INVESTMENT params: ', params)
    try {
      const investment = await Investment.query().where('user_id', params.id)
      if (investment) {
        console.log(
          'INVESTMENT: ',
          investment.map((inv) => inv)
        )
        // return investment
        return response.status(200).json(investment)
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const investment = await Investment.find(params.id)
    if (investment) {
      investment.amount = request.input('amount')
      investment.period = request.input('period')
      if (await investment.save()) {
        await investment.preload('user')
        // await investment.preload('forum')
        return investment
      }
      return // 422
    }
    return // 401
  }

  public async store({ request }: HttpContextContract) {
    const investmentSchema = schema.create({
      amount: schema.number(),
      rolloverType: schema.string({ escape: true }, [rules.maxLength(3)]),
      period: schema.string({ escape: true }, [rules.maxLength(100)]),
      userId: schema.number(),
      tagName: schema.string({ escape: true }, [rules.maxLength(150)]),
      currencyCode: schema.string({ escape: true }, [rules.maxLength(5)]),
      long: schema.number(),
      lat: schema.number(),
      walletHolderDetails: schema.object().members({
        firstName: schema.string(),
        lastName: schema.string(),
        phone: schema.number(),
        investorFundingWalletId: schema.string(),
      }),
    })
    const payload: any = await request.validate({ schema: investmentSchema })
    const investment = await Investment.create(payload)
    // const newInvestment = request.all() as Partial<Investment>
    // const investment = await Investment.create(newInvestment)
    return investment
  }

  public async store1({ request, response }) {
    const investmentSchema = schema.create({
      amount: schema.number(),
      rolloverType: schema.string({ escape: true }, [rules.maxLength(3)]),
      period: schema.string({ escape: true }, [rules.maxLength(100)]),
      userId: schema.number(),
      tagName: schema.string({ escape: true }, [rules.maxLength(150)]),
      currencyCode: schema.string({ escape: true }, [rules.maxLength(5)]),
      long: schema.number(),
      lat: schema.number(),
    })

    const payload: any = await request.validate({ schema: investmentSchema })
    const investment: Investment = await Investment.create(payload)

    return response.ok(investment)
  }

  public async store2({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()
    const investment = new Investment()
    investment.amount = request.input('amount')
    investment.period = request.input('period')
    investment.rolloverType = request.input('rolloverType')
    investment.tagName = request.input('tagName')
    investment.currencyCode = request.input('currencyCode')
    investment.long = request.input('long')
    investment.lat = request.input('lat')
    investment.walletHolderDetails = request.input('walletHolderDetails')
    //  investment.walletHolderDetails = JSON.stringify(request.input('walletHolderDetails'))
    console.log('Investment:', investment)
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
