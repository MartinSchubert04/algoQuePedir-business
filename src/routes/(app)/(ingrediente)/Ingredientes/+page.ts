import { Ingrediente } from "$lib/types/Ingrediente"
import { ingredienteService } from "$lib/services/ingredienteService"
import { browser } from '$app/environment'
import { redirect } from '@sveltejs/kit'

export const ssr = false


export async function load() {

  let username = ""

  if (browser) {
    username = localStorage.getItem("username") ?? ""
  }

  if (!username) {
    throw redirect(302, '/Login')
  }


  let ingredientes: Ingrediente[] = []
  const data = await ingredienteService.todasLasIngredientes() // supondremos que devuelve Ingrediente[]
  ingredientes = data // asignamos al array reactivo
  return { ingredientes };
}
