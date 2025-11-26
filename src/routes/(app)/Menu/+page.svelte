<script lang="ts">
  import "$lib/styles/menu.css"
  import "$lib/styles/Card.css"
  import "$lib/styles/Card-element.css"
  import "$lib/styles/Button.css"
  import "$lib/styles/Icon.css"

  import Plato from "$lib/components/Plato.svelte"
  import { Plato as PlatoType } from "$lib/types/Plato"
  import { goto } from "$app/navigation"
  import { platoService } from "$lib/services/platoService"
  import { onMount } from "svelte"
  import { showError } from "$lib/domain/errorHandler"

  const username = localStorage.getItem("username") ?? ""

  const navegarA = (path: string) => {
    goto(`${path}`)
  }

  const getAllPlatos = async () => {
    try {
      platos = await platoService.getAll(username)
    } catch (e) {
      showError(e)
      platos = []
    }
    return platos
  }

  const deletePlatoAndRefresh = async (id: number) => {
    await platoService.eliminarPlato(id, username)
    platos = await getAllPlatos()
  }

  // Inicializamos como array vacío
  let platos = $state<PlatoType[]>([])

  onMount(async () => {
    platos = await getAllPlatos()
  })
</script>

<section class="main-card-header">
  <h2 class="main-card-title">Gestión del Menú</h2>
  <button class="primary-button desktop-add-button" onclick={() => navegarA("/Crear_Edicion_plato")} aria-label="Agregar un nuevo plato"> Agregar Nuevo Plato </button>
  <button class="primary-button mobile-add-button" onclick={() => navegarA("/Crear_Edicion_plato")} aria-label="Agregar un nuevo plato">
    <div class="add-button-icon"></div>
  </button>
</section>

<section aria-labelledby="platos-disponibles">
  <h2 id="platos-disponibles" class="main-card-header">Platos Disponibles</h2>

  <div class="main-card card">
    {#each platos as plato (plato.id)}
      <Plato {plato} onDelete={deletePlatoAndRefresh} />
    {:else}
      <div class="no-menu-container">
        <h3>No hay platos disponibles</h3>
      </div>
    {/each}
  </div>
</section>

<style>
  h3 {
    display: flex;
    min-height: 4rem;
    align-items: center;
  }
</style>
