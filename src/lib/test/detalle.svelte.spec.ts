import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest'
import { render, screen, cleanup, waitFor } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import Pagina from '../../routes/(app)/Detalle_pedido/[id]/+page.svelte'
import { pedidoService } from '$lib/services/detalleService'
import { goto } from '$app/navigation'

vi.mock('$app/navigation', () => ({
  goto: vi.fn(),
}))

vi.mock('$lib/services/detalleService', () => ({
  pedidoService: {
    getPedidoById: vi.fn(),
  },
}))

const detalleMock = {
  id: 1,
  estado: 'PENDIENTE',
  usuario: 'smiller2005',
  nombreCliente: 'Sofia',
  apellidoCliente: 'Miller',
  foto: '/src/lib/assets/fotom.jpg',
  hora: '17:10',
  items: 1,
  total: 1731.45,
  direccion: 'Av siempre viva',
  latitud: 555.0,
  longitud: 1.0,
  metodoPago: 'TRANSFERENCIA',
  platos: [
    {
      id: 577080980,
      nombrePlato: 'Hamburguesa',
      descripcion: 'Hamburguesa clásica con queso',
      cantidad: 1,
      imagenPlato: '/src/lib/assets/burger.jpg',
      costo: 1537.45,
    },
  ],
  costeEnvio: 194.0,
  adicionalPorMedio: 1.05,
}
const data = {
  pedido: detalleMock,
}

describe('Página de detalle de pedido', () => {
  beforeEach(() => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => 'smiller2005')
    pedidoService.getPedidoById.mockResolvedValue(detalleMock)
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('debería renderizar correctamente los datos del pedido', async () => {
    
    const { container } = render(Pagina, { props: { data } })

    await waitFor(() => {
      expect(screen.getByText('Pedido #1')).toBeInTheDocument()
    })

    expect(screen.getByText('Sofia Miller')).toBeInTheDocument()
    expect(screen.getByText(/usuario/i)).toBeInTheDocument()
    expect(screen.getByText(/Av siempre viva/i)).toBeInTheDocument()
    expect(screen.getByText('PENDIENTE')).toBeInTheDocument()
    expect(screen.getByText('TRANSFERENCIA')).toBeInTheDocument()

  
    const icon = container.querySelector('.ph-credit-card')
    expect(icon).not.toBeNull()

  
    expect(screen.getByRole('button', { name: /volver/i })).toBeInTheDocument()
  })

  it ('al hacer click al boton de volver te lleva a la parte de los pedidos', async () => {
    render(Pagina, { props: { data } })

    await waitFor(() => {
      expect(screen.getByText('Pedido #1')).toBeInTheDocument()
    })

    const botonVolver = screen.getByTestId('boton-volver')
    await userEvent.click(botonVolver)

    expect(goto).toHaveBeenCalledWith('/Pedidos')
  })

})
