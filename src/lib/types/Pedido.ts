export type PlatoDTO = {
  id: number
  nombrePlato: string
  descripcion: string
  cantidad: number
  costo: number
  imagenPlato: string
}

export type PedidoDTO = {
  id: number
  estado: string
  usuario: string
  nombreCliente: string
  apellidoCliente: string
  foto: string
  hora: string
  items: number
  total: number
  direccion: string
  latitud: number
  longitud: number
  metodoPago: string
  platos: PlatoDTO[]
  costeEnvio: number
  adicionalPorMedio: number
}
