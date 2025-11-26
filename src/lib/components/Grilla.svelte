<script>
  let { nombre, precio, grupo, origen } = $props()
  import Tacho from "./Tacho.svelte"
  import Lapiz from "./Lapiz.svelte"
  import Ojo from "./Ojo.svelte"
  import "$lib/styles/global.css"
  import "$lib/styles/Main-container.css"
  import "$lib/styles/Card.css"
  import "$lib/styles/Icon.css"
  import "$lib/styles/Card-element.css"
</script>

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
    <tbody class="card-table-body">
      <tr class="atributtes">
        <td class="table-item-name">{nombre}</td>
        <td class="table-item-cost">${precio}</td>
        <td class="table-item-group">{grupo}</td>
        <td class="table-item-origin">
          <img src={origen} alt="grupo alimenticio" class="icon-action" />
        </td>
        <td class="table-action-items">
          <div class="hidden-item">
            <Ojo />
            <!-- svelte-ignore a11y_missing_attribute -->
            <img src="assets/line-vertical.svg" class="icon-action icon-line" />
          </div>

          <Lapiz />
          <!-- svelte-ignore a11y_missing_attribute -->
          <img src="assets/line-vertical.svg" class="icon-action icon-line" />

          <Tacho id="delete-1" />
        </td>
      </tr>
    </tbody>
  </table>
</section>
