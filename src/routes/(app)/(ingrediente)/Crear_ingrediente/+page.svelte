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
  import Input from "$lib/components/Input.svelte"
  import { ingredienteService } from "$lib/services/ingredienteService"

  let nombre = $state("")
  let costoMercado = $state(0)
  let grupoAlimenticio = $state("")
  let esDeOrigenAnimal = $state(false)

  const { data } = $props()
  const gruposAlimenticiosList = data.grupos

  const crearIngrediente = async (nombre: string, costoMercado: number, grupoAlimenticio: string, esDeOrigenAnimal: boolean) => {
    await ingredienteService.crearIngrediente(new Ingrediente(null, nombre, +costoMercado, grupoAlimenticio, esDeOrigenAnimal))
    goto("/Ingredientes")
  }
</script>

<div class="main-card-header">
  <span class="main-card-title">Crear Ingrediente</span>
</div>
<form
  class="main-card-ing-form"
  onsubmit={(e) => {
    e.preventDefault()
    crearIngrediente(nombre, costoMercado, grupoAlimenticio, esDeOrigenAnimal)
  }}
>
  <section class="main-card card card-inputs">
    <div class="container-inputs crear-ing-container-inputs">
      <div class="crear-ing-input">
        <Input inputLabel="Nombre" inputType="text" isRequired={true} bind:value={nombre} />
      </div>
      <div class="crear-ing-input">
        <Input inputLabel="Costo" inputType="number" step="0.01" isRequired={true} bind:value={costoMercado} />
      </div>
      <div class="crear-ing-input">
        <!-- <Input inputLabel="Grupo Alimenticio" inputType="text" bind:value={grupoAlimenticio} /> -->
        <select name="grupo-alimenticio" id="grupo-alimenticio" required bind:value={grupoAlimenticio}>
          <option value="" disabled>Elija una opción</option>
          {#each gruposAlimenticiosList as grupo (grupo)}
            <option value={grupo}>{grupo.replace("_", " ")}</option>
          {/each}
        </select>
      </div>

      <div class="container-switch">
        <label class="switch-label">Origen animal</label>
        <div class="toggle-enhanced">
          <input type="checkbox" id="switch-enhanced" bind:checked={esDeOrigenAnimal} /><label for="switch-enhanced">Toggle</label>
        </div>
      </div>
    </div>
  </section>
  <div class="guardar-cambios-section">
    <button class="primary-button" type="submit"> Guardar Cambios </button>
    <button class="secondary-button" type="submit" onclick={() => goto("/Ingredientes")}> Descartar Cambios </button>
  </div>
</form>
