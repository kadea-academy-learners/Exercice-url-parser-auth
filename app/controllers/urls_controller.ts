import Url from '#models/url'
import { urlvalidatore } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'

export default class UrlsController {
  public async generate({request,response,auth,session}:HttpContext){

const data = request.all()



   try {
    const user =   auth.user!

    if (!user) {
       session.flash({error:'Utilisateur non trouvé'})
        return response.redirect().toRoute('pages/login')

    }
    const payload = await urlvalidatore.validate(data)



    const url = await Url.query().where('userId',user.id).where('fullUrl',payload.url).first()
    if (url) {
      session.flash({error:'Url existe déjà'})

        return response.redirect('pages/goToUrl')

    }

    const qrCode = await QRCode.toDataURL(payload.url)
    const addUrlData = await Url.create({fullUrl:payload.url,shortUrl:payload.shortUrl,qrCode,userId:user.id})
    if (!addUrlData) {
       session.flash({error:'Erreur lors de la création de l\'url'})
       return response.redirect('pages/home')

    }
    session.flash({success:'Url créé avec succès'})
    return response.redirect('pages/goToUrl')
   } catch (error) {
    console.log('error',error);
    session.flash({error:error})
     return response.redirect('pages/home')

   }
  }

  public async showUrls({response,view,auth,session}:HttpContext){
    const user = auth.user!
    try {
      const getUrlsDataByUser = await Url.query().preload('user').where('user_id',user.id).orderBy('id','asc').exec()
      if (!getUrlsDataByUser) {
         session.flash({error:'Urls non trouvé'})
          return response.redirect('pages/login')

      }
      const parseUrlsToJSON = getUrlsDataByUser.map((url)=>url.toJSON())

      return view.render('pages/goToUrl',{parseUrlsToJSON})
    } catch (error) {
      session.flash({error:error})
      return response.redirect('pages/login')

    }
  }

  public async deleteUrl({response,params,auth,bouncer,session}:HttpContext){
    try {
      const user = auth.user!


      if(!user){
        session.flash({error:'Utilisateur non trouvé'})
        return response.redirect('pages/login')
      }
      const   url = await Url.find(params.id)



      if (!url) {
        session.flash({error:'Url non trouvé'})
        return response.redirect().toRoute('goToUrl')
      }

      if(!(await bouncer.allows('deleteUrl',url))){

        session.flash({error:'Action non autorisée'})
        return response.redirect().toRoute('goToUrl')

      }
      await url.delete()
      session.flash({success:'Url supprimé avec succès'})
        return response.redirect().toRoute('goToUrl')

    } catch (error) {
     session.flash({error:error})
      return response.redirect('pages/goToUrl')

    }

  }

  public async updateUrl({response,params,auth,request,session,bouncer}:HttpContext){
    try {
      const user = auth.user!
      if(!user){
        session.flash({error:'Utilisateur non trouvé'})
        return response.redirect('pages/login')
      }
      const   url = await Url.find(params.id)

      if (!url) {
        session.flash({error:'Url non trouvé'})
        return response.redirect('pages/goToUrl')
      }
      if(!(await bouncer.allows('updateUrl',url))){
        session.flash({error:'Action non autorisée'})
        return response.redirect('pages/goToUrl')
      }

      const data = request.all()
      const payload = await urlvalidatore.validate(data)

      url.merge({fullUrl:payload.url,shortUrl:payload.shortUrl})
      await url.save()
      session.flash({success:'Url modifié avec succès'})
      return response.redirect().toRoute('goToUrl')
    } catch (error) {
      response.status(400).send({messages:error})
      return response.redirect('pages/goToUrl')

    }
  }

}
