<script lang="ts">
  import ResumenPedido from "./ResumenPedido.svelte"

  let { resumenPedido = [] } = $props()
</script>

<section class="card resumen">
  <h2 class="titulo-header">Resumen del pedido</h2>
  <table class="card-table-detalle-pedido">
    <thead>
      <tr class="resumen-atributtes">
        <th class="table-item-name plato">Plato</th>
        <th class="table-item-name cantidad">Cantidad</th>
        <th class="table-action-items precio">Precio</th>
      </tr>
    </thead>
    <tbody class="card-table-body">
      {#each resumenPedido as p (p.id)}
        <ResumenPedido
          nombrePlato={p.nombrePlato}
          descripcion={p.descripcion}
          imagenPlato={p.imagenPlato}
          cantidad={p.cantidad}
          itemCosto={p.costo}
        />
      {/each}
    </tbody>
  </table>
</section>
