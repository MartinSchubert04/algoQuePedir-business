<script lang="ts">
  import "$lib/styles/Card.css"
  import "$lib/styles/edicion-plato.css"
  import "$lib/styles/Button.css"
  import "$lib/styles/Switch.css"
  import "$lib/styles/guardar-cambios.css"
  import "$lib/styles/Input.css"
  import { platoService } from "$lib/services/platoService"
  import { LocalReducido } from "$lib/types/Local"
  import IngredientesRow from "$lib/components/Ingredientes.svelte"
  import { ingredienteService } from "$lib/services/ingredienteService"
  import InputCustom from "$lib/components/Input.svelte"
  import { Ingrediente } from "$lib/types/Ingrediente"
  import { Plato } from "$lib/types/Plato"
  import { goto } from "$app/navigation"
  import { localService } from "$lib/services/localService"

  let mostrar = false
  let nombrePlato = $state("")
  let descripcion = $state("")
  let imagenPlato = $state("")
  let valorBase = $state(0)
  let esDeAutor = $state(false)
  // enpromocion siempre es false al crear y editar por enunciado
  let enPromocion = $state(false)
  let ingredientes: Ingrediente[] = $state([])

  const username = localStorage.getItem("username") ?? ""

  const crearPlato = async (nombrePlato: string, descripcion: string, valorBase: number, esDeAutor: boolean, ingredientes: Ingrediente[]) => {
    //obtenemos el local actual
    const actual = await localService.getLocalActual("fede")
    const localReducido = new LocalReducido(
      actual.id,
      actual.nombreLocal,
      actual.imgURL ?? "",
      {
        calle: actual.calle ?? "",
        altura: actual.altura ?? 0,
        coordenadas: {
          x: actual.longitud ?? 0,
          y: actual.latitud ?? 0
        }
      },
      actual.porcentajeComision ?? 0,
      actual.porcentajeAutor ?? 0,
      actual.mediosDePago ?? [],
      [],
      actual.pendiente ?? false,
      actual.adminUsername ?? "",
      [],
      [],
      { mensajes: [] }
    )
    console.log("Local actual:", actual)
    // Validación básica (puedes agregar más)
    if (!nombrePlato || valorBase <= 0) {
      alert("El nombre y el precio base son obligatorios.")
      return
    }

    const nuevoPlato = new Plato(null, nombrePlato, descripcion, ingredientes, localReducido, undefined, undefined, imagenPlato, esDeAutor, undefined, 0, valorBase)
    try {
      // console.log("JSON :", JSON.stringify(nuevoPlato, null, 2))
      await platoService.crearPlato(nuevoPlato, username)
      goto("/Menu") // Redirigir después de crear
    } catch (error) {
      console.error("Error al crear el plato:", error)
      alert("Hubo un error al guardar el plato.")
    }
  }

  const cargarIngredientes = async () => {
    try {
      const data = await ingredienteService.todasLasIngredientes() // supondremos que devuelve Ingrediente[]
      ingredientes = data // asignamos al array reactivo
    } catch (error) {
      console.error("Error al cargar ingredientes:", error)
    }
  }
  cargarIngredientes()

  const eliminarIngredienteYRefrescar = (ingrediente: Ingrediente) => {
    ingredientes = ingredientes.filter((i) => i.nombre !== ingrediente.nombre)
  }
  function togglePlatoAutor(nuevoValor: boolean) {
    esDeAutor = nuevoValor
  }
</script>

<form
  class="main-card-ing-form"
  onsubmit={(e) => {
    e.preventDefault()
    crearPlato(nombrePlato, descripcion, valorBase, esDeAutor, ingredientes)
  }}
>
  <!-- editar plato (cuadrito) -->
  <div class="costos-section">
    <h1>Crear Plato</h1>
    <div class="grid-editar-plato">
      <div class="inputs-column">
        <InputCustom inputLabel="Nombre*" inputType="text" isRequired={true} bind:value={nombrePlato}></InputCustom>
        <InputCustom inputLabel="Descripción*" inputType="text" isRequired={true} bind:value={descripcion}></InputCustom>
        <InputCustom inputLabel="URL de la imagen*" inputType="text" bind:value={imagenPlato}></InputCustom>
      </div>

      <div class="dish-image">
        <img class="imagen-plato" src={imagenPlato} alt="Todavia sin imagen" />
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
            <input type="checkbox" id="switch-enhanced" bind:checked={esDeAutor} onchange={() => togglePlatoAutor(esDeAutor)} /><label for="switch-enhanced">Toggle</label>
          </div>
        </div>
      </div>
    </div>

    <div class="form-toggle">
      <div>
        <label for="platoPromo">Plato en Promoción</label>
        <p class="warning">Los platos nuevos no puedn estar en promocion. Esta funcionalidad se habilita luego de 30 dias creado el plato</p>
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
          {#each ingredientes as ingrediente (ingrediente.nombre)}
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
