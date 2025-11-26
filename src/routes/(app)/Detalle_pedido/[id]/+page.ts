export const ssr = false

import { browser } from '$app/environment'
import { redirect } from '@sveltejs/kit'
import { pedidoService } from '$lib/services/detalleService';
import { showError } from '$lib/domain/errorHandler.js';

export async function load({ params }) {

  let username = ""

  if (browser) {
    username = localStorage.getItem("username") ?? ""
  }

  if (!username) {
    throw redirect(302, '/Login')
  }

  try {
    const pedido = await pedidoService.getPedidoById(Number(params.id), username);
    return { pedido };
  } catch (e) {
    showError('Error en load /pedidos:', e);
    return null ;
  }
}


