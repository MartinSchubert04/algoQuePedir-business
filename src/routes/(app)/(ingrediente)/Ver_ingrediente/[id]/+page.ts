import { ingredienteService } from '$lib/services/ingredienteService'
import { error } from '@sveltejs/kit'

export function load({params}) {
  const cargarIngrediente = async () => {
    const ingredienteData = await ingredienteService.getIngredienteById(+params.id)
    if(!ingredienteData.id){
      throw error(404, "No se encontró el ingrediente")
    }
    return {ingrediente: ingredienteData}
  }
  return cargarIngrediente()
}