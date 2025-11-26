<script lang="ts">
  import EstadoPedido from "./EstadoPedido.svelte"
  import ClienteInfo from "./ClienteInfo.svelte"
  import DireccionInfo from "./DireccionInfo.svelte"
  let { pedido } = $props()
</script>

{#if pedido}
  <EstadoPedido numeroPedido={pedido.id} estado={pedido.estado} />

  <section class="card">
    <div class="datos-container">
      <h2 class="titulo-header">Cliente</h2>
      <div class="datos-header">
        <ClienteInfo
          nombreCliente={pedido.nombreCliente}
          apellidoCliente={pedido.apellidoCliente}
          usuario={pedido.usuario}
          foto={pedido.foto}
        />
      </div>
    </div>

    <div class="datos-container">
      <h2 class="titulo-header">Dirección de entrega</h2>
      <DireccionInfo
        direccion={pedido.direccion}
        latitud={pedido.latitud}
        longitud={pedido.longitud}
      />
    </div>
  </section>
{:else}
  <p>Cargando pedido...</p>
{/if}
