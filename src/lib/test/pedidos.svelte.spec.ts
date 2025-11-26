import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import Pagina from "../../routes/(app)/Pedidos/+page.svelte"
import { goto } from '$app/navigation';

vi.mock('$app/navigation', () => ({
  goto: vi.fn()
}))

const pedidosMock = [
  { id: 1, size: "small", estado: "PENDIENTE", nombreCliente: "Sofia", apellidoCliente: "Miller", usuario: "smiller2005", foto: "", hora: "12:30PM", items: 2, total: 25, direccion: "Av siempre viva 555", iconoGlobo: "ph-map-pin", latitud: 40.7128, longitud: -74.0060, metodoPago: "Pago con tarjeta de crédito", metodoIcon: "ph-credit-card", platos: [], costeEnvio: 20, adicionalPorMedio: 2 },
  { id: 2, size: "small", estado: "ENTREGADO", nombreCliente: "Sofia", apellidoCliente: "Miller", usuario: "smiller2005", foto: "", hora: "12:30PM", items: 2, total: 25, direccion: "Av siempre viva 555", iconoGlobo: "ph-map-pin", latitud: 40.7128, longitud: -74.0060, metodoPago: "Pago con efectivo", metodoIcon: "ph-money", platos: [], costeEnvio: 20, adicionalPorMedio: 2 },
  { id: 3, size: "small", estado: "CANCELADO", nombreCliente: "Sofia", apellidoCliente: "Miller", usuario: "smiller2005", foto: "", hora: "12:30PM", items: 2, total: 25, direccion: "Av siempre viva 555", iconoGlobo: "ph-map-pin", latitud: 40.7128, longitud: -74.0060, metodoPago: "Pago con QR", metodoIcon: "ph-qr-code", platos: [], costeEnvio: 20, adicionalPorMedio: 2 }
]

describe('Pagina', () => {
  afterEach(() => cleanup())
  beforeEach(() => {
    vi.clearAllMocks();
  })
  it('deberia empezar con filtro en general',  () => {
    render(Pagina, { props: { data: {pedidos: pedidosMock, filtroActivo: 'General' } } })

    const filtroGeneral = screen.getByTestId('filtro-General')
    expect(filtroGeneral).toHaveClass('active')

  })
  it('el usuario filtra los pedidos pendientes', async () => {
    const pedidosPendientes = pedidosMock.filter(p => p.estado === "PENDIENTE")

    render(Pagina, { props: { data: { pedidos: pedidosPendientes, filtroActivo: 'Pendientes' } } })

    const filtroPendientes = screen.getByTestId('filtro-Pendientes')
    expect(filtroPendientes).toHaveClass('active')

    const pedidosEnPantalla = screen.getAllByTestId('pedido-item')
    expect(pedidosEnPantalla).toHaveLength(pedidosPendientes.length)

  })
  it('no hay ningun pedido que cumpla con el filtro, muestra mensaje', async () => {
    render(Pagina, { props: { data: {pedidos: [], filtroActivo: 'Preparados' } } })
    const filtroPreparados = screen.getByTestId('filtro-Preparados')

    await userEvent.click(filtroPreparados)
    
    const mensaje = screen.getByText('No hay pedidos para el filtro seleccionado')
    expect(mensaje).toBeInTheDocument()

    const pedidosEnPantalla = screen.queryAllByTestId('pedido-item')
    expect(pedidosEnPantalla).toHaveLength(0)
  })
  it('al hacer click en boton preparar te lleva al detalle del pedido', () => {
    render(Pagina, { props: { data: {pedidos: pedidosMock, filtroActivo: 'General' } } })
    const primerPedido = pedidosMock[0]

    const link = screen.getByTestId(`detalle-pedido-link-${primerPedido.id}`);
    
    expect(link).toHaveAttribute('href', `/Detalle_pedido/1`)
  })

  it('el usuario llama a goto cuando filtra por pedidos pendientes', async () => {
    render(Pagina, { props: { data: { pedidos: pedidosMock, filtroActivo: 'General'} } })

    const filtroPendientes = screen.getByTestId('filtro-Pendientes')
    await userEvent.click(filtroPendientes)

    expect(goto).toHaveBeenCalledTimes(1)

    const expectedUrl = new URL(window.location.href);
    expectedUrl.searchParams.set('filtro', 'Pendientes');
    expect(goto).toHaveBeenCalledTimes(1);
    const calledUrl = (goto as any).mock.calls[0][0];
    expect(calledUrl.href).toBe(expectedUrl.href);

  })
})