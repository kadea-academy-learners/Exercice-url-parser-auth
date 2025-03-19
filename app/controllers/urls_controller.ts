import Url from '#models/url'
import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'

export default class UrlsController {
  public async generate({request,response}:HttpContext){

const {url,shortUrl} = request.all()


   try {

    const qrCode = await QRCode.toDataURL(url)
    const addUrlData = await Url.create({fullUrl:url.url,shortUrl,qrCode})
    if (!addUrlData) {
      return response.status(401).send({messages:"Données éronées"})
    }

    return response.redirect('pages/goToUrl')
   } catch (error) {
    return response.status(400).send({messages:error})

   }
  }

  public async showUrls({response,view}:HttpContext){
    try {
      const getUrlsData = await Url.all()
      if (!getUrlsData) {
        return response.status(400).send({messages:"non trouvé"})
      }
      const parseUrlsToJSON = getUrlsData.map((url)=>url.toJSON())

      return view.render('pages/goToUrl',{parseUrlsToJSON})
    } catch (error) {

    }
  }

}
