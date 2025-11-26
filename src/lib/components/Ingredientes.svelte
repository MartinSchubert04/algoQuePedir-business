<script lang="ts">
  import "$lib/styles/global.css"
  import "$lib/styles/Main-container.css"
  import "$lib/styles/Card.css"
  import "$lib/styles/Icon.css"
  import "$lib/styles/Card-element.css"
  import linea from "$lib/assets/line-vertical.svg"
  import Tacho from "./Tacho.svelte"
  import Lapiz from "./Lapiz.svelte"
  import Ojo from "./Ojo.svelte"
  import palta from "$lib/assets/avocado.svg"
  import vaca from "$lib/assets/cow.svg"
  import type { IngredientesRow } from "$lib/types/Ingrediente"
  import { Ingrediente } from "$lib/types/Ingrediente"
  import { ingredienteService } from "$lib/services/ingredienteService"
  import { invalidate } from "$app/navigation"

  let { ingrediente, mostrar, onDelete }: IngredientesRow & { mostrar: boolean } & { onDelete: (i: Ingrediente) => void } = $props() // Tipado del callback: Espera un Ingrediente y devuelve una Promise (async function)

  const eliminar = async () => {
    // Ejecuta la función onDelete que le pasó el padre, pasando el ingrediente de esta fila
    onDelete(ingrediente)
  }
</script>

<tr class={mostrar ? "atributtes" : "atributesingpla"}>
  <td class="table-item-name">{ingrediente.nombre}</td>
  {#if mostrar}
    <td class="table-item-cost">${ingrediente.costoMercado}</td>
  {/if}
  <td class={mostrar ? "table-item-group" : "table-item-group-ingpla"}>{ingrediente.grupoAlimenticio}</td>
  <td class={mostrar ? "table-item-origin" : "table-item-origen-ingpla "}>
    {#if ingrediente.esDeOrigenAnimal}
      <img src={vaca} alt="Origen animal" class="icon-action" />
    {:else}
      <img src={palta} alt="Origen vegetal" class="icon-action" />
    {/if}
  </td>
  <td class={mostrar ? "table-action-items" : "table-action-items-ingpla"}>
    {#if mostrar}
      <div class="hidden-item">
        <a href={`/Ver_ingrediente/${ingrediente.id}`}><Ojo /></a>
      </div>
      <!-- svelte-ignore a11y_missing_attribute -->
      <img src={linea} class="icon-action icon-line hidden-item" />
    {/if}

    {#if mostrar}
      <a href={`/Edicion_ingrediente/${ingrediente.id}`}><Lapiz /></a>
      <!-- svelte-ignore a11y_missing_attribute -->
      <img src={linea} class="icon-action icon-line" />
    {/if}
    <div></div>
    <button class="secondary" type="button" onclick={eliminar}> <Tacho id={String(ingrediente.id)} /> </button>
  </td>
</tr>

<style>
  .secondary {
    background-color: unset;
    border: 0;
    padding: 0;
  }

  .atributesingpla {
    width: 100%;
    border-bottom: 1px solid var(--color-sombra);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1.3em 1.3em;
    box-sizing: border-box;
  }

  .table-item-group-ingpla {
    width: 9rem;
    display: flex;
    justify-content: start;
  }

  .table-item-origen-ingpla {
    width: 5rem;
    display: flex;
    justify-content: start;
  }
  .atributesingpla td:nth-last-child(2), /* anteúltimo */
    .atributesingpla td:nth-last-child(3) {
    color: grey;
  }

  @media (max-width: 430px) {
    .atributesingpla td:nth-last-child(2), /* anteúltimo */
    .atributesingpla td:nth-last-child(3) {
      display: block;
      width: 3.8rem;
      /* Permite el salto de línea normal */
      white-space: normal;
      /* Para forzar un corte en palabras largas si es necesario */
      overflow-wrap: break-word;
    }

    .table-item-group-ingpla {
      width: 9rem;
      display: flex;
      justify-content: start;
    }

    .table-item-origen-ingpla {
      padding-left: 0.7rem;
    }
    .atributesingpla {
      padding: 1.3em 0.8em;
      font-size: 0.7em;
    }
  }
</style>
