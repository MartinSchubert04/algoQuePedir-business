<script>
  import ClienteInfo from "./ClienteInfo.svelte"
  import DireccionInfo from "./DireccionInfo.svelte"
  import PagoInfo from "./PagoInfo.svelte"
  /*   import { LISTA_PEDIDOS_MOCK } from "$lib/mocks/listaDePedidos" */
  /*   import { goto } from '$app/navigation'; */
  let {
    id,
    nombreCliente,
    apellidoCliente,
    usuario,
    foto,
    hora,
    items,
    total,
    direccion,
    iconoGlobo = "ph-map-pin",
    latitud,
    longitud,
    metodoPago,
  } = $props()
</script>

<div class="pedido-container" style="font-size: .8rem"   data-testid="pedido-item">
  <p class="pedido-numero">Pedido #{id}</p>

  <div class="user-info-pedido">
    <ClienteInfo {nombreCliente} {apellidoCliente} {usuario} {foto} />
  </div>

  <div class="detalles-pedido">
    <p class="input-label-pedido">Hora: {hora}</p>
    <div class="horizontal-divider"></div>
    <p class="input-label-pedido">Artículos: {items}</p>
    <div class="horizontal-divider"></div>
    <p class="input-label-pedido">Total: ${total.toFixed(2)}</p>
  </div>

  <DireccionInfo {direccion} {iconoGlobo} {latitud} {longitud}/>
  <PagoInfo variante="paginaPedido" {metodoPago} />

  <div class="prepare-button-container">
    <a href={`/Detalle_pedido/${id}`} data-testid="detalle-pedido-link-{id}">
      <button class="prepare-button primary-button">Preparar</button>
    </a>
  </div>
</div>
