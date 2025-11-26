<script lang="ts">
  import "$lib/styles/Button.css"
  import "$lib/styles/global.css"
  import Ojo from "./Ojo.svelte"
  import linea from "$lib/assets/line-vertical.svg"
  import Tacho from "./Tacho.svelte"
  import Lapiz from "./Lapiz.svelte"
  import { platoService } from "$lib/services/platoService"
  import { Plato } from "$lib/types/Plato"
  let { plato, onDelete }: { plato: Plato; onDelete: (id: number) => Promise<void> } = $props()

  const eliminarPlato = async (plato: Plato) => {
    await onDelete(plato.id)
  }
</script>

<article class="card-menu">
  <div class="card-menu-left img">
    <img src={plato.imagenPlato} alt="Imagen del plato" />
    <div class="card-menu-left">
      <div class="card-text">
        <h3>{plato.nombrePlato}</h3>
        <p class="text-sub">{plato.descripcion}</p>
      </div>
    </div>
  </div>
  <p class="card-menu-precio">${plato.costo}</p>

  <div class="action-buttons">
    <div class="hidden-item">
      <a href={`/ver_Edicion_plato/${plato.id}`}><Ojo /></a>
    </div>
    <img src={linea} class="icon-action icon-line hidden-item" />
    <a href={`/Edicion_plato/${plato.id}`}><Lapiz /></a>
    <img src={linea} class="icon-action icon-line" />
    <button class="secondary" onclick={() => eliminarPlato(plato)}> <Tacho id={String(plato.id)} /> </button>
  </div>
</article>

<style>
  .action-buttons {
    display: flex;
    width: fit-content;
    align-items: center;
    flex-shrink: 0;
  }
  .card-menu {
    align-items: center;
    gap: 10px;
  }
  button {
    background-color: transparent;
    border: none;
    padding: 0;
  }
  .card-menu-precio {
    width: 7rem; 
    text-align: right;
    font-size: 1.2em;
    margin: 0;
    white-space: nowrap;
  }
  .card-menu-left {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 430px) {
  .card-menu-precio {
      width: 5rem;
      font-size: 0.8rem;
  }
   .card-text h3 {
    font-size: 0.8rem;
  }

  }
</style>
