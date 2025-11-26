import axios from "axios"
import type { PedidoDTO } from "../types/Pedido"
import { REST_SERVER_URL } from "./configuration"

class PedidoService {
  async getAllPedidos (user: string, estado?: string): Promise<PedidoDTO[]> {
    let url = `${REST_SERVER_URL}/pedidos?user=${user}`;
    if (estado) {
      url += `&estado=${estado}`;
    }
    const res = await axios.get(url)
    return res.data
  }

  async getPedidoById(id: number, user: string): Promise<PedidoDTO> {
    const res = await axios.get(`${REST_SERVER_URL}/pedidos/${id}?user=${user}`)
    return res.data
  }
}

export const pedidoService = new PedidoService()
