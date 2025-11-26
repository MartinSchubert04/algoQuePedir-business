import { grupoAlimenticioService } from '$lib/services/grupoAlimenticioService.js'

export function load() {
  const cargarGrupos = async () => {
    const gruposData = await grupoAlimenticioService.getAllGrupos()
    
    return {grupos: gruposData}
  }
  return cargarGrupos()
}