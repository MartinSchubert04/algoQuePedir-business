import { Ingrediente, type IngredienteJson } from '$lib/types/Ingrediente'

import { getAxiosData } from './common'
import { REST_SERVER_URL } from './configuration'
import axios from 'axios'

class IngredienteService {

  async todasLasIngredientes() {
    try {
      const queryIngredientes = () => axios.get<IngredienteJson[]>(REST_SERVER_URL + '/ingrediente')
      const data = await getAxiosData(queryIngredientes)
      return data && Array.isArray(data) ? data.map(Ingrediente.fromJson) : []
    } catch {
      return [] // Lista vacía si el backend falla
    }
  }

  async getIngredienteById(id: number) {
    const queryById = () => axios.get<Ingrediente>(REST_SERVER_URL + '/ingrediente/' + id)
    const IngredienteJson = await getAxiosData(queryById)
    return Ingrediente.fromJson(IngredienteJson)
  }

  async actualizarIngrediente(ingrediente: Ingrediente) {
    return axios.put<Ingrediente>(REST_SERVER_URL + '/ingrediente/' + ingrediente.id, ingrediente.toJSON())
  }

  async crearIngrediente(ingrediente: Ingrediente) {
    return axios.post(REST_SERVER_URL + '/ingrediente', ingrediente.toJSON())
  }

  async eliminarIngrediente(ingrediente: Ingrediente) {
    return axios.delete(REST_SERVER_URL + '/ingrediente/' + ingrediente.id)
  }

}

export const ingredienteService = new IngredienteService()