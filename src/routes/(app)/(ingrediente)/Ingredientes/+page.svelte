<script lang="ts">
  import IngredientesRow from "$lib/components/Ingredientes.svelte"
  import "$lib/styles/global.css"
  import "$lib/styles/Main-container.css"
  import "$lib/styles/Card.css"
  import "$lib/styles/Card-element.css"
  import "$lib/styles/Button.css"
  import { Ingrediente } from "$lib/types/Ingrediente"
  import { ingredienteService } from "$lib/services/ingredienteService"
  import { goto } from "$app/navigation"

  let mostrar = true

  let ingredientes = $state([] as Ingrediente[])

  const cargarIngredientes = async () => {
    const data = await ingredienteService.todasLasIngredientes() // supondremos que devuelve Ingrediente[]
    ingredientes = data // asignamos al array reactivo
  }
  cargarIngredientes()

  const eliminarIngredienteYRefrescar = async (ingrediente: Ingrediente) => {
    await ingredienteService.eliminarIngrediente(ingrediente)
    await cargarIngredientes()
  }
</script>

<div class="main-card-header">
  <span class="main-card-title">Ingredientes</span>
  <button class="primary-button desktop-add-button" onclick={() => goto("/Crear_ingrediente")}> Nuevo Ingrediente </button>
  <!-- svelte-ignore a11y_consider_explicit_label -->
  <button class="primary-button mobile-add-button" onclick={() => goto("/Crear_ingrediente")}>
    <div class="add-button-icon"></div>
  </button>
</div>
<section class="main-card card">
  <table class="card-table">
    <thead class="card-table-head">
      <tr class="atributtes">
        <th class="table-item-name">Nombre</th>
        <th class="table-item-cost">Costo</th>
        <th class="table-item-group">Grupo Alimenticio</th>
        <th class="table-item-origin">Origen</th>
        <th class="table-action-items">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each ingredientes as ingrediente (ingrediente.id)}
        <IngredientesRow {ingrediente} {mostrar} onDelete={eliminarIngredienteYRefrescar} />
      {:else}
        <h3>No se encontraron ingredientes</h3>
      {/each}
    </tbody>
  </table>
</section>
