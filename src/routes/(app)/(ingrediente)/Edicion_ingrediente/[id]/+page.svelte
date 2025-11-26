<script lang="ts">
  import "$lib/styles/Input.css"
  import "$lib/styles/Main-container.css"
  import "$lib/styles/Card.css"
  import "$lib/styles/Card-element.css"
  import "$lib/styles/Button.css"
  import "$lib/styles/Icon.css"
  import "$lib/styles/Switch.css"
  import "$lib/styles/Crear-ing.css"
  import { Ingrediente } from "$lib/types/Ingrediente.js"
  import { goto } from "$app/navigation"
  import { ingredienteService } from "$lib/services/ingredienteService.js"
  import Input from "$lib/components/Input.svelte"
  import { healthService } from "$lib/services/healthCheckService.js"
  import { error } from "@sveltejs/kit"
  import { showError } from "$lib/domain/errorHandler"

  let { data } = $props()

  let ingrediente = data.ingrediente
  const gruposAlimenticiosList = data.grupos

  const checkSubmit = (ingrediente: Ingrediente): boolean => {
    if (ingrediente.costoMercado == null || ingrediente.costoMercado <= 0) {
      showError("Ingrese un valor mayor a 0")
    } else {
      return true
    }
    return false
  }

  async function updateIngrediente(ingrediente: Ingrediente) {
    if ((await healthService.healthCheck()) != "UP") {
      throw error(503, "Backend no disponible")
    } else {
      if (checkSubmit(ingrediente)) {
        await ingredienteService.actualizarIngrediente(ingrediente)
        goto("/Ingredientes")
      }
    }
  }
</script>

<div class="main-card-header">
  <span class="main-card-title">Edicion Ingredientes</span>
</div>
<form
  class="main-card-ing-form"
  onsubmit={(e) => {
    e.preventDefault()
    updateIngrediente(ingrediente)
  }}
>
  <section class="main-card card card-inputs">
    <div class="container-inputs crear-ing-container-inputs">
      <div class="crear-ing-input">
        <Input inputLabel="Nombre" inputType="text" isRequired={true} bind:value={ingrediente.nombre} testId="input-nombre" />
      </div>
      <div class="crear-ing-input">
        <Input inputLabel="Costo" inputType="number" step="0.01" isRequired={true} bind:value={ingrediente.costoMercado} testId="input-precio" />
      </div>
      <div class="crear-ing-input">
        <select name="grupo-alimenticio" id="grupo-alimenticio" required bind:value={ingrediente.grupoAlimenticio} data-testid="drop-grupo">
          {#each gruposAlimenticiosList as grupo (grupo)}
            <option value={grupo}>{grupo.replace("_", " ")}</option>
          {/each}
        </select>
      </div>

      <div class="container-switch">
        <label class="switch-label">Origen animal</label>
        <div class="toggle-enhanced">
          <input type="checkbox" id="switch-enhanced" bind:checked={ingrediente.esDeOrigenAnimal} data-testid="switch-origen" /><label for="switch-enhanced">Toggle</label>
        </div>
      </div>
    </div>
  </section>
  <div class="guardar-cambios-section">
    <button type="submit" class="primary-button"> Guardar Cambios </button>
    <button class="secondary-button" onclick={() => goto("/Ingredientes")}> Descartar Cambios </button>
  </div>
</form>
