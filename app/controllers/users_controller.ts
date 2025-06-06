import User from '#models/user'
import { loginvalidatore, uservalidatore } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { RoleValue } from '../Enumes/RoleEnum.js'

export default class UsersController {
  public async singIn({ request, response, session}: HttpContext) {
    try {
      const data = request.all()

      const payload = await uservalidatore.validate(data)

      const findUser = await User.findBy('email', payload.email)

      if (findUser) {
        session.flash('error', 'Email already registered')
        return response.redirect().back()
      }

      await User.create({
        email: payload.email,
        username: payload.username,
        password: payload.password,
        role: payload.role as RoleValue
      })


      session.flash('success', 'Registration successful')
      return response.redirect().toRoute('login')

    } catch (error) {
      console.error('Registration error:', error)
      session.flash('error', 'Registration failed')
      return response.redirect().back()
    }
  }

  public async login({request,response,view,auth}:HttpContext){
    const data = request.all()
    const payload = await loginvalidatore.validate(data)
    try {
      const user = await User.findBy('email',payload.email)
      console.log(user);
      if (!user) {
         response.status(400).send({messages:"Utilisateur non trouvé"})
          return response.redirect('pages/login')
      }
      console.log('credent');
      await auth.use('web').login(user)

      return view.render('pages/home',{isAuthenticated:true,
        user:user
      })
    } catch (error) {
      response.status(400).send({messages:error})
      return response.redirect().back()

    }
  }

  public async logout({response,auth}:HttpContext){
    await auth.use('web').logout()
    return response.redirect().toRoute('login')
  }
}
