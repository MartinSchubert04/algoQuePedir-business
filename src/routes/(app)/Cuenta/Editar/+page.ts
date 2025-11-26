export const ssr = false

import { showError } from '$lib/domain/errorHandler.js'
import { localService } from '$lib/services/localService'
import { browser } from '$app/environment'
import { redirect } from '@sveltejs/kit'

export async function load() {

  let username = ""

  if (browser) {
    username = localStorage.getItem("username") ?? ""
  }

  if (!username) {
    throw redirect(302, '/Login')
  }

  try {
    const local = await localService.getLocalActual(username) 
    return { local }
  }
  catch(e) {
    showError("Conexion al servidor", e)
  } 
}
