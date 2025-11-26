import axios from "axios"
import { REST_SERVER_URL } from "./configuration"
class GrupoAlimenticioService{
  async getAllGrupos(){
    const res = await axios.get(`${REST_SERVER_URL}/getGruposAlimenticios`)
    return res.data
  }
}

export const grupoAlimenticioService = new GrupoAlimenticioService()