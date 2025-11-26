<script lang="ts">
  import ResumenDelPedido from "./ListaPedidos.svelte"
  import MetodoPago from "./PagoInfo.svelte"
  import type { PlatoDTO } from "$lib/types/Pedido"
  let { pedido } = $props()
  let resumenPedido = $derived(pedido?.platos ?? [])
  let subtotal = $derived(
    resumenPedido.reduce(
      (acc: number, p: PlatoDTO) => acc + (p.cantidad ?? 0) * (p.costo ?? 0),
      0
    )
  )
</script>

{#if pedido}
  <ResumenDelPedido resumenPedido={pedido.platos} />

  <section class="card pago">
    <h2 class="titulo-header">Pago</h2>
    <dl class="lista-pago">
      <div class="filaPago">
        <dt>Subtotal</dt>
        <dd>${subtotal.toFixed(2)}</dd>
      </div>
      <div class="filaPago">
        <dt>Comisión Delivery</dt>
        <dd>${pedido.costeEnvio.toFixed(2)}</dd>
      </div>
      <div class="filaPago">
        <dt>Incremento por tipo de pago ({((pedido?.adicionalPorMedio ?? 1) * 100 - 100).toFixed(0)}%)</dt>
        <dd>${((subtotal + pedido.costeEnvio) * (pedido.adicionalPorMedio - 1) || 0).toFixed(2)}</dd> <!-- fix -->
      </div>
      <div class="filaPago total">
        <dt><b>Total</b></dt>
        <dd><b>${pedido.total.toFixed(2)}</b></dd>
      </div>
    </dl>

    <h2 class="titulo-header">Método de pago</h2>
    <MetodoPago metodoPago={pedido.metodoPago}/>
  </section>
{:else}
  <p>Cargando pedido...</p>
{/if}
