export const ssr = false
import { platoService } from '$lib/services/platoService'
import { browser } from '$app/environment'
import { redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'

export async function load({params}) {

  let username = ""

  if (browser) {
    username = localStorage.getItem("username") ?? ""
  }

  if (!username) {
    throw redirect(302, '/Login')
  }

  const cargarIngrediente = async () => {
    const platoData = await platoService.getPlatoById(+params.id, username)
    if(!platoData.id){
      throw error(404, "No se encontró el plato")
    }
    return {plato: platoData}
  }
  return cargarIngrediente()
}
