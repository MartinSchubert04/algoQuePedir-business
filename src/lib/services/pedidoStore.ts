import { writable } from "svelte/store";
import type { PedidoDTO } from "$lib/types/Pedido";

export const pedidoStore = writable<PedidoDTO | null>(null);
