import { Plato } from '$lib/types/Plato'

import { getAxiosData } from './common'
import { REST_SERVER_URL } from './configuration'
import axios from 'axios'

class PlatoService {

  async getAll(adminName: string) {
    const res = await axios.get<Plato[]>(`${REST_SERVER_URL}/platos?user=${adminName}`)
    return res.data
  }

  async getPlatoById(id: number, adminName: string) {
    const queryById = () => axios.get<Plato>(`${REST_SERVER_URL}/plato/${id}?user=${adminName}`)
    const PlatoJson = await getAxiosData(queryById)
    return Plato.fromJson(PlatoJson)
  }

  async actualizarPlato(Plato: Plato) {
    return axios.put<Plato>(REST_SERVER_URL + '/plato/' + Plato.id, Plato.toJSON())
  }

  async crearPlato(Plato: Plato, user: string) {
    return axios.post(REST_SERVER_URL + `/plato?user=${user}`, Plato.toJSON())
  }

  async eliminarPlato(id: number, user: string) {
    axios.delete(`${REST_SERVER_URL}/plato/${id}?user=${user}`)
  }

}

export const platoService = new PlatoService()