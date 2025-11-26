import type { CardPedido } from "$lib/types/CardPedido.ts";
import fotoUsuario from "$lib/assets/fotom.jpg"
import hamburguesa from "$lib/assets/burger.jpg";
import papasFritas from "$lib/assets/papas.png";
import refresco from "$lib/assets/refresco.png";
import type { CardResumen } from "$lib/types/CardResumen.ts";

export const LISTA_PEDIDOS_MOCK: CardPedido[] = [
  {
    id: 1,
    size: "small",
    estado: "Pendiente",
    nombreCliente: "Sofia Miller",
    usuario: "smiller2005",
    foto: fotoUsuario,
    hora: "12:30PM",
    items: 2,
    total: 25,
    direccion: "Av siempre viva 555",
    iconoGlobo: "ph-map-pin",
    latitud: 40.7128,
    longitud: -74.0060,
    metodoPago: "Pago con tarjeta de crédito",
    metodoIcon: "ph-credit-card"
  },
  {
    id: 2,
    size: "small",
    estado: "Entregado",
    nombreCliente: "Sofia Miller",
    usuario: "smiller2005",
    foto: fotoUsuario,
    hora: "12:30PM",
    items: 2,
    total: 25,
    direccion: "Av siempre viva 555",
    iconoGlobo: "ph-map-pin",
    latitud: 40.7128,
    longitud: -74.0060,
    metodoPago: "Pago con efectivo",
    metodoIcon: "ph-money"
  },
  {
    id: 3,
    size: "small",
    estado: "Cancelado",
    nombreCliente: "Sofia Miller",
    usuario: "smiller2005",
    foto: fotoUsuario,
    hora: "12:30PM",
    items: 2,
    total: 25,
    direccion: "Av siempre viva 555",
    iconoGlobo: "ph-map-pin",
    latitud: 40.7128,
    longitud: -74.0060,
    metodoPago: "Pago con qr",
    metodoIcon: "ph-qr-code"
  },
  {
    id: 4,
    size: "small",
    estado: "Preparado",
    nombreCliente: "Sofia Miller",
    usuario: "smiller2005",
    foto: fotoUsuario,
    hora: "12:30PM",
    items: 2,
    total: 25,
    direccion: "Av siempre viva 555",
    iconoGlobo: "ph-map-pin",
    latitud: 40.7128,
    longitud: -74.0060,
    metodoPago: "Pago con tarjeta de crédito",
    metodoIcon: "ph-credit-card"
  }
]

export const LISTA_RESUMEN_PEDIDO_MOCK : CardResumen[] = [
  {
    id: 1,
    nombrePlato: "Hamburguesa",
    descripcion: "Hamburguesa clasica con queso y papas fritas",
    cantidad: 1,
    costo: 12,
    imagenPlato: hamburguesa,
  },
  {
    id: 2,
    nombrePlato: "Papas fritas",
    descripcion: "Tradicionales papas fritas crocantes",
    cantidad: 1,
    costo: 5,
    imagenPlato: papasFritas,
  },
  {
    id: 3,
    nombrePlato: "Refresco",
    descripcion: "Jugo natural de fruta",
    cantidad: 1,
    costo: 3,
    imagenPlato: refresco,
  },
]