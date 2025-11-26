<script lang="ts">
  import "$lib/styles/Input.css"
  import "$lib/styles/Main-container.css"
  import "$lib/styles/Card.css"
  import "$lib/styles/Card-element.css"
  import "$lib/styles/Button.css"
  import "$lib/styles/Icon.css"
  import "$lib/styles/Switch.css"
  import "$lib/styles/Crear-ing.css"
  import { goto } from "$app/navigation"
  import { ingredienteService } from "$lib/services/ingredienteService.js"
  import Input from "$lib/components/Input.svelte"

  let { data } = $props()

  let ingrediente = data.ingrediente
</script>

<div class="main-card-header">
  <span class="main-card-title">Edicion Ingredientes</span>
</div>
<section class="main-card card card-inputs">
  <div class="container-inputs crear-ing-container-inputs">
    <div class="crear-ing-input">
      <Input inputLabel="Nombre" inputType="text" isEnabled={false} value={ingrediente.nombre} testId="input-nombre" />
    </div>
    <div class="crear-ing-input">
      <Input inputLabel="Costo" inputType="number" isEnabled={false} value={ingrediente.costoMercado} testId="input-precio" />
    </div>
    <div class="crear-ing-input">
      <Input inputLabel="Grupo alimenticio" inputType="text" isEnabled={false} value={ingrediente.grupoAlimenticio} testId="drop-grupo" />
    </div>

    <div class="container-switch">
      <label class="switch-label">Origen animal</label>
      <div class="toggle-enhanced">
        <input disabled type="checkbox" id="switch-enhanced" bind:checked={ingrediente.esDeOrigenAnimal} data-testid="switch-origen" /><label for="switch-enhanced">Toggle</label>
      </div>
    </div>
  </div>
</section>
<div class="guardar-cambios-section">
  <button class="secondary-button" type="submit" onclick={() => goto("/Ingredientes")}>Volver</button>
</div>
