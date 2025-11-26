<script lang="ts">
  import "$lib/styles/Card.css"
  import "$lib/styles/edicion-plato.css"
  import "$lib/styles/Button.css"
  import "$lib/styles/Switch.css"
  import "$lib/styles/guardar-cambios.css"
  import "$lib/styles/Input.css"
  import { goto } from "$app/navigation"
  import IngredientesRow from "$lib/components/Ingredientes.svelte"
  import InputCustom from "$lib/components/Input.svelte"
  import { Ingrediente } from "$lib/types/Ingrediente"
  import { Plato } from "$lib/types/Plato"

  let { data } = $props()
  let mostrar = false
  let plato = data.plato as Plato

  const eliminarIngredienteYRefrescar = async (ingrediente: Ingrediente) => {}
</script>

{#if plato}
  <!-- editar plato (cuadrito) -->
  <!-- editar plato (cuadrito) -->
  <div class="costos-section">
    <h1>Ver Plato</h1>

    <div class="grid-editar-plato">
      <div class="inputs-column">
        <InputCustom inputLabel="Nombre*" inputType="text" isRequired={true} value={plato.nombrePlato} isEnabled={false}></InputCustom>
        <InputCustom inputLabel="Descripción*" inputType="text" isRequired={true} value={plato.descripcion} isEnabled={false}></InputCustom>
        <InputCustom inputLabel="URL de la imagen*" inputType="text" value={plato.imagenPlato} isEnabled={false}></InputCustom>
      </div>

      <div class="dish-image">
        <img class="imagen-plato" src={plato.imagenPlato} alt="Todavia sin imagen" />
      </div>
    </div>
  </div>

  <!-- costos (cuadrito) -->
  <div class="costos-section">
    <h3>Costos</h3>

    <div class="form-group">
      <label for="precioBase">Precio Base*</label>
      <!-- input -->
      <input type="number" id="precioBase" value={plato.valorBase} readonly disabled />
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
            <input id="switch-enhanced" type="checkbox" checked={plato.esDeAutor} disabled />
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
          {#each plato.ingredientes as ingrediente (ingrediente.nombre)}
            <IngredientesRow {ingrediente} {mostrar} onDelete={eliminarIngredienteYRefrescar} />
          {/each}
        </tbody>
      </table>
    </section>

    <div class="guardar-cambios-section">
      <button class="secondary-button" type="button" onclick={() => goto("/Menu")}> Volver </button>
    </div>
  </div>
{/if}
