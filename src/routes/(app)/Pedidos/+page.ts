import { pedidoService } from '$lib/services/detalleService';
import { showError } from '$lib/domain/errorHandler.js';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
export const ssr = false

const mapFiltroEstado: Record<string, string> = {
  Pendientes: "PENDIENTE",
  Preparados: "PREPARADO",
  Entregados: "ENTREGADO",
  Cancelados: "CANCELADO"
}

export async function load({ url }) {
  let username = ""

  if (browser) {
    username = localStorage.getItem("username") ?? ""
  }

  if (!username) {
    throw redirect(302, '/Login')
  }
  const filtroActivo = url.searchParams.get('filtro') || 'General';
  const estadoParaBackend = filtroActivo === 'General' ? undefined : mapFiltroEstado[filtroActivo];
  try {
    const pedidos = await pedidoService.getAllPedidos(username, estadoParaBackend);
    return { pedidos, filtroActivo }
  } catch (e) {
    showError('Error en load /pedidos:', e);
    return null ;
  }
}
