<script lang="ts">
  import "$lib/styles/Card.css"
  import "$lib/styles/Card-element.css"
  import "$lib/styles/detalle_pedido.css"

  import Pago from "$lib/components/Pago.svelte"
  import CardInfoCliente from "$lib/components/DetallePedido.svelte"

  import { goto } from "$app/navigation"
  import type { PedidoDTO } from "$lib/types/Pedido";
  import { onMount } from "svelte"
  import { writable } from "svelte/store"
  import { pedidoService } from "$lib/services/detalleService"

  let { data }: { data: { pedido: PedidoDTO } } = $props();

  const navegarA = (path: string) => {
    goto(`${path}`)
  }

  const pedidoStore = writable<PedidoDTO>(data.pedido)
  let pedido: PedidoDTO = data.pedido
  pedidoStore.subscribe(v => pedido = v)

  const username = localStorage.getItem("username") ?? ""

    const recargarPedido = async () => {
      try {
        const actualizado = await pedidoService.getPedidoById(pedido.id, username)
        pedidoStore.set(actualizado)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Error al recargar pedido:", e)
      }
    }

    onMount(() => {
      recargarPedido()

      const intervalId = setInterval(() => {
        recargarPedido()
      }, 5000)

      return () => clearInterval(intervalId)
    })

</script>

<div id="detalle-pedido-container">
  <CardInfoCliente pedido={$pedidoStore}></CardInfoCliente>
  <Pago pedido={$pedidoStore}></Pago>

  <div class="button-container">
    <button class="primary-button" data-testid="boton-volver" onclick={() => navegarA("/Pedidos")}> Volver </button>
  </div>
</div>
