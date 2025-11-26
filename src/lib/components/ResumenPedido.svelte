<script lang="ts">
  import "$lib/styles/global.css"
  import "$lib/styles/pedidos.css"
  import "$lib/styles/Button.css"
  import "$lib/styles/Card.css"
  import burger from "$lib/assets/burger.jpg"

  type ContadorProps = {
    nombrePlato?: string
    descripcion?: string
    imagenPlato?: string
    itemCosto?: number
    cantidad?: number
    desde?: number
    hasta?: number
  }

  let {
    nombrePlato,
    descripcion,
    imagenPlato,
    itemCosto = $bindable(0),
    cantidad = $bindable(1),
  }: ContadorProps = $props()

</script>

<tr class="resumen-atributtes resumen-plato">
  <td class="descripcion-header">
    <img src={imagenPlato || burger} alt={nombrePlato} class="img-plato" /> <!-- q se cargue una burga si no hay imagen -->
    <div class="descripcion producto">
      <p class="texto_principal texto-tabla">{nombrePlato}</p>
      <p class="texto_secundario texto-tabla">{descripcion}</p>
    </div>
  </td>

  <td class="table-item-name">
      <span data-testid="cantidad">{cantidad}</span>
  </td>

  <td class="table-item-cost">${(cantidad * itemCosto).toFixed(2)}</td>
</tr>
