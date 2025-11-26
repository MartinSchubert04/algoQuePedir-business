import axios from "axios"
import type { PedidoDTO } from "../types/Pedido"
import { REST_SERVER_URL } from "./configuration"


class PedidosService {
  async getAllPedidos(): Promise<PedidoDTO[]> {
    const res = await axios.get<PedidoDTO[]>(`${REST_SERVER_URL}/pedidos`)
    return res.data
  }

  async getPedidoById(id: number): Promise<PedidoDTO> {
    const res = await axios.get<PedidoDTO>(`${REST_SERVER_URL}/pedidos/${id}`)
    return res.data
  }
}

export const pedidosService = new PedidosService();