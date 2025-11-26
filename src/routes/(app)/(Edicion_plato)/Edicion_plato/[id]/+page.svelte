<script lang="ts">
  import "$lib/styles/Card.css"
  import "$lib/styles/edicion-plato.css"
  import "$lib/styles/Button.css"
  import "$lib/styles/Switch.css"
  import "$lib/styles/guardar-cambios.css"
  import "$lib/styles/Input.css"
  import { localService } from "$lib/services/localService"
  import ingmock from "$lib/data/ingredientes.json"
  import IngredientesRow from "$lib/components/Ingredientes.svelte"
  import { platos_mock } from "$lib/mocks/plato_mock"
  import { page } from "$app/state"
  import { ingredienteService } from "$lib/services/ingredienteService"
  import { Ingrediente } from "$lib/types/Ingrediente"
  import InputCustom from "$lib/components/Input.svelte"
  import { Plato } from "$lib/types/Plato"
  import { goto } from "$app/navigation"
  import { Local, LocalReducido } from "$lib/types/Local"
  import { platoService } from "$lib/services/platoService"
  import { healthService } from "$lib/services/healthCheckService.js"
  import { error } from "@sveltejs/kit"
  import { ingredientes } from "$lib/mocks/ingredientesMock"
  import { imgNotFound } from "$lib/assets/index.js"
  import { showError } from "$lib/domain/errorHandler.js"

  let { data } = $props()
  let mostrar = false
  let plato = data.plato as Plato

  let nombre = $state("")
  let descripcion = $state("")
  let imagen = $state("")
  let valorBase = $state(0)
  let esDeAutor = $state(false)
  let ingredienteslist: Ingrediente[] = $state([])

  const UpdatePlato = async (plato: Plato) => {
    if (!plato) return // No hacer nada si la data no se ha cargado

    try {
      await healthService.healthCheck()
    } catch (e) {
      throw showError("Backend no disponible", e)
    }
    try {
      await platoService.actualizarPlato(plato)
      goto("/Menu")
    } catch (e) {
      showError("Error al actualizar el plato.", e)
    }
  }

  const eliminarIngredienteYRefrescar = (ingrediente: Ingrediente) => {
    ingredienteslist = ingredienteslist.filter((ing) => ing != ingrediente)
  }
  function togglePlatoAutor(nuevoValor: boolean) {
    plato.esDeAutor = nuevoValor
  }

  nombre = plato.nombrePlato
  descripcion = plato.descripcion
  imagen = plato.imagenPlato
  valorBase = plato.valorBase
  esDeAutor = plato.esDeAutor
  ingredienteslist = plato.ingredientes

  let img = $derived(plato.imagenPlato && (plato.imagenPlato.startsWith("http") || plato.imagenPlato.startsWith("data:") || plato.imagenPlato.startsWith("/src/")) ? plato.imagenPlato : imgNotFound)
</script>

{#if plato}
  <!-- editar plato (cuadrito) -->
  <form
    class="main-card-ing-form"
    onsubmit={(e) => {
      e.preventDefault()
      plato.nombrePlato = nombre
      plato.descripcion = descripcion
      plato.imagenPlato = imagen
      plato.valorBase = valorBase
      plato.esDeAutor = esDeAutor
      plato.ingredientes = ingredienteslist
      UpdatePlato(plato)
    }}
  >
    <!-- editar plato (cuadrito) -->
    <div class="costos-section">
      <h1>Editar Plato</h1>

      <div class="grid-editar-plato">
        <div class="inputs-column">
          <InputCustom inputLabel="Nombre*" inputType="text" isRequired={true} bind:value={nombre}></InputCustom>
          <InputCustom inputLabel="Descripción*" inputType="text" isRequired={true} bind:value={descripcion}></InputCustom>
          <InputCustom inputLabel="URL de la imagen*" inputType="text" bind:value={imagen}></InputCustom>
        </div>

        <div class="dish-image">
          <img class="imagen-plato" src={img} alt="Todavia sin imagen" />
        </div>
      </div>
    </div>

    <!-- costos (cuadrito) -->
    <div class="costos-section">
      <h3>Costos</h3>

      <div class="form-group">
        <label for="precioBase">Precio Base*</label>
        <!-- input -->
        <input type="number" id="precioBase" bind:value={valorBase} />
      </div>

      <!-- toggles -->
      <div class="form-toggle">
        <div>
          <label for="platoAutor">Plato de Autor</label>
          <p>Aplica un porcentaje adicional al precio de venta</p>
        </div>
        <div class="position-switch">
          <div class="container-switch">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="switch-label"></label>
            <div class="toggle-enhanced">
              <input id="switch-enhanced" type="checkbox" bind:checked={esDeAutor} onchange={() => togglePlatoAutor(esDeAutor)} />
              <label for="switch-enhanced">Toggle</label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-toggle">
        <div>
          <label for="platoPromo">Plato en Promoción</label>
          <p class="warning">Los platos nuevos no puedn estar en promocion. Esta funcionalidad se habilita luego de 30 dias editado el plato</p>
        </div>
        <div class="position-switch">
          <div class="container-switch">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="switch-label"></label>
            <div class="toggle-enhanced">
              <input type="checkbox" id="switch-enhanced°2" disabled /><label for="switch-enhanced°2">Toggle</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- personalizar ingredientes (cuadrito)-->
    <div class="costos-section">
      <h3>Personalizar ingredientes</h3>

      <!-- componente ingredientes (organizado por columnas)-->

      <!-- ingredientes -->
      <section class="ingrediente-section-edicionPlato">
        <table class={mostrar ? "" : "table-edicionPlato"}>
          <thead class="card-table-head">
            <tr class="atributtes-ingpla">
              <th class="table-item-name {mostrar ? '' : 'th-edicionPlato'}">Nombre</th>
              <th class="table-item-group-ingpla {mostrar ? '' : 'th-edicionPlato'}">Grupo</th>
              <th class="table-item-origin-ingpla {mostrar ? '' : 'th-edicionPlato'}">Origen</th>
              <th class="table-item-origin-ingpla {mostrar ? '' : 'th-edicionPlato'}">Borrar</th>
            </tr>
          </thead>
          <tbody>
            {#each ingredienteslist as ingrediente (ingrediente.nombre)}
              <IngredientesRow {ingrediente} {mostrar} onDelete={eliminarIngredienteYRefrescar} />
            {/each}
          </tbody>
        </table>
      </section>

      <div class="guardar-cambios-section">
        <button class="primary-button" type="submit"> Guardar </button>
        <button class="secondary-button" type="button" onclick={() => goto("/Menu")}> Descartar </button>
      </div>
    </div>
  </form>
{/if}
