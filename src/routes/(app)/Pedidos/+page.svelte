<script lang="ts">
  import "$lib/styles/pedidos.css"
  import "$lib/styles/Button.css"
  import "$lib/styles/Card.css"

  import Pedido from "$lib/components/PedidoCard.svelte"
  import Filtro from "$lib/components/Filtro.svelte"
  import type { PedidoDTO } from "$lib/types/Pedido"
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { pedidoService } from '$lib/services/detalleService';
  
  let { data }: { data: { pedidos?: PedidoDTO[], filtroActivo: string } } = $props();

  const pedidosStore = writable(data.pedidos ?? []);
  const filtroStore = writable(data.filtroActivo || "General");

  let pedidos = $derived(data.pedidos ?? []);
  pedidosStore.subscribe(v => pedidos = v);

  let filtroActivo = $derived(data.filtroActivo);
  filtroStore.subscribe(v => filtroActivo = v);

  const filtros = ["General", "Pendientes", "Preparados", "Entregados", "Cancelados"];

  const mapFiltroEstado: Record<string, string> = {
    Pendientes: "PENDIENTE",
    Preparados: "PREPARADO",
    Entregados: "ENTREGADO",
    Cancelados: "CANCELADO"
  };

  const username = localStorage.getItem("username") ?? "";

  const recargarPedidos = async (estado?: string) => {
    try {
      const nuevos = await pedidoService.getAllPedidos(username, estado);
      pedidosStore.set(nuevos);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Error al recargar pedidos:", e);
    }
  };

  const cambiarFiltro = (nuevoFiltro: string) => {
    if (nuevoFiltro === filtroActivo) return;
    filtroStore.set(nuevoFiltro);

    const estadoParaBackend = nuevoFiltro === "General" ? undefined : mapFiltroEstado[nuevoFiltro];
    recargarPedidos(estadoParaBackend);

    const url = new URL(window.location.href);
    if (nuevoFiltro === "General") {
      url.searchParams.delete('filtro');
    } else {
      url.searchParams.set('filtro', nuevoFiltro);
    }
    goto(url, { replaceState: true });
  };

  onMount(() => {
    const estadoInicial = mapFiltroEstado[filtroActivo];
    recargarPedidos(estadoInicial);

    // actualizo los filtros cada 5 segundos
    const intervalId = setInterval(() => {
      const estado = filtroActivo === "General" ? undefined : mapFiltroEstado[filtroActivo];
      recargarPedidos(estado);
    }, 5000);

    return () => clearInterval(intervalId);
  });
</script>

<section class="pedidos-main-container">
  <h2 class="section-title">Pedidos Actuales</h2>
  <div class="lista-filtros-pedidos">
    {#each filtros as filtro (filtro)}
      <Filtro texto={filtro} activo={filtro === filtroActivo} onclick={() => cambiarFiltro(filtro)} />
    {/each}
  </div>
  <div class="divider"></div>

  <div class="pedidos-container">
    {#if pedidos.length > 0}
      {#each pedidos as pedido (pedido.id)}
        <Pedido
          id={pedido.id}
          nombreCliente={pedido.nombreCliente}
          apellidoCliente={pedido.apellidoCliente}
          usuario={pedido.usuario}
          foto={pedido.foto}
          hora={pedido.hora}
          items={pedido.items}
          total={pedido.total}
          direccion={pedido.direccion}
          latitud={pedido.latitud}
          longitud={pedido.longitud}
          metodoPago={pedido.metodoPago}
        />
      {/each}
    {:else}
      <p class="mensaje-sin-pedidos">No hay pedidos para el filtro seleccionado</p>
    {/if}
  </div>
</section>
