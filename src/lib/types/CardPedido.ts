export type tipadoIcono =
  | "ph-credit-card"
  | "ph-money"
  | "ph-qr-code";

export type CardPedido = {
  id: number;
  size: string;
  estado: string,
  nombreCliente: string,
  usuario: string,
  foto: string,
  hora: string,
  items: number,
  total: number,
  direccion: string,
  iconoGlobo: string,
  latitud: number,
  longitud: number,
  metodoPago: string,
  metodoIcon: tipadoIcono,
}