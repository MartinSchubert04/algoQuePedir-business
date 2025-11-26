import { Local, type LocalJSON } from '../types/Local';
import { REST_SERVER_URL } from './configuration';
import axios from 'axios';

class LocalService {
  async update(local: Local) {

    const res = await axios.put<LocalJSON>(REST_SERVER_URL + '/local', local.toJSON())
    return Local.fromJson(res.data)
  }

  async crear(local: Local, adminName: string) {
    const body = {
      local: local.toJSON(),
      adminName: adminName
    }

    const res = await axios.post(REST_SERVER_URL + '/local', body)    
    return Local.fromJson(res.data)
  }

  async getLocalActual(user: string) {
    const res = await axios.get(`${REST_SERVER_URL}/local?user=${user}`)
    return Local.fromJson(res.data)
  }
}

export const localService = new LocalService()