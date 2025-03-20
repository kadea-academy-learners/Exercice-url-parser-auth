import User from '#models/user'
import { loginvalidatore, uservalidatore } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { RoleValue } from '../Enumes/RoleEnum.js'

export default class UsersController {
  public async singIn({request,response,view}:HttpContext){
    const data = request.all()

    const payload = await uservalidatore.validate(data)


    try {



      const finduser = await User.findBy('email',payload.email)
      console.log('finuser',finduser);

      if (finduser) {
         response.status(400).send({messages:"Utilisateur non trouvé"})
         return response.redirect('pages/login')
      }
      await User.create({email:payload.email,username:payload.username,password:payload.password,role:payload.role as RoleValue})
        return view.render('pages/login',{username:payload.username})

    } catch (error) {
      return response.redirect().back()

    }
  }

  public async login({request,response,view,auth}:HttpContext){
    const data = request.all()
    console.log( 'data',data);
    const payload = await loginvalidatore.validate(data)

    try {



      const user = await User.findBy('email',payload.email)


      if (!user) {
         response.status(400).send({messages:"Utilisateur non trouvé"})
          return response.redirect('pages/login')

      }
      const isPasswordValid = await User.verifyCredentials(payload.email,payload.password)
      if (!isPasswordValid) {
        response.status(400).send({messages:"Mot de passe incorrect"})
        return response.redirect('pages/login')
      }

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
