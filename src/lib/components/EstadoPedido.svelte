<script lang="ts">
  import "$lib/styles/global.css"
  type Estado = {
    numeroPedido ?: number;
    estado ?: string;
  }
  let {numeroPedido, estado} : Estado = $props()
</script>

<article class="pedido">
  <h2 class="numeroPedido">Pedido #{numeroPedido}</h2>
  <div class="estadoHeader">
    <span class="estadoPedido"><b>Estado del Pedido</b></span>
    <span class={`badgePedido badgePedido--${estado?.toLowerCase().replace(' ', '_')}`}>{estado}</span>
  </div>
</article>

<style>
  .badgePedido--entregado{
    background-color: var(--color-entregado);
  }
  .badgePedido--pendiente {
    background-color: var(--color-pendiente);
  }
  .badgePedido--cancelado {
    background-color: var(--color-cancelado);
  }
  .badgePedido--preparado {
    background-color: var(--color-preparado);
  }
</style>
