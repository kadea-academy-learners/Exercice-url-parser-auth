/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import Url from '#models/url'
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'

/**
 * Delete the following ability to start from
 * scratch
 */
export const editUser = Bouncer.ability(() => {
  return true
})

export const deleteUrl = Bouncer.ability((user: User, url: Url) => {
  if (user.id === url.userId && user.role === 'admin') {
    return true
  }
  return false
})

export const updateUrl = Bouncer.ability((user: User , url :Url)=>{
  if(user.id === url.userId){
    return true
  }
  return false
})
