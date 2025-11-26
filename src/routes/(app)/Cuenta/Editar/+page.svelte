<script lang="ts">
  import "$lib/styles/Button.css"
  import "$lib/styles/Card.css"
  import "$lib/styles/Input.css"
  import "$lib/styles/perfil-local.css"
  import InputCustom from "$lib//components/Input.svelte"
  import DoubleButton from "$lib/components/DoubleButton.svelte"
  import { localService } from "$lib/services/localService"
  import type { PageProps } from "./View/$typesenta/$types"
  import { Local, MedioDePago } from "$lib/types/Local"
  import { imgNotFound } from "$lib/assets"
  import { showError } from "$lib/domain/errorHandler"
  import { goto } from "$app/navigation"

  let { data }: PageProps = $props()
  let local = $state(data.local ?? new Local())

  const username = localStorage.getItem("username") ?? ""

  function toggleMedioDePago(medio: MedioDePago, checked: boolean) {
    if (checked) {
      if (!local.mediosDePago.includes(medio)) {
        local.mediosDePago = [...local.mediosDePago, medio]
      }
    } else {
      local.mediosDePago = local.mediosDePago.filter((m: MedioDePago) => m !== medio)
    }
  }

  async function guardar() {
    try {
      const saved = local.id ? await localService.update(local) : await localService.crear(local, username)
      local = saved
      goto("/Cuenta")
    } catch (error: unknown) {
      showError(error)
    }
  }

  function descartar() {
    goto("/Cuenta")
  }

  let imgInput = $derived(local.imgURL && (local.imgURL.startsWith("http") || local.imgURL.startsWith("data:")) ? local.imgURL : "")

  let imgDisplay = $derived(imgInput !== "" && (imgInput.startsWith("https") || imgInput.startsWith("data:") || imgInput.length > 30) ? imgInput : imgNotFound)

  $effect(() => {
    local.imgURL = imgDisplay
  })
</script>

<div class="main-content-container">
  <div class="main-card-header">
    <h1 class="main-card-title">Información del local</h1>
  </div>

  <form onsubmit={guardar}>
    <section class="card card-local card-row">
      <div class="input-form-local">
        <InputCustom
          inputLabel="Nombre del local"
          inputType="text"
          isRequired={true}
          inputClass="input-local"
          inputContainerClass="input-container-local"
          testId="nombreId"
          bind:value={local.nombreLocal}
        ></InputCustom>
        <InputCustom inputLabel="URL de la imagen" inputType="text" inputClass="input-local" inputContainerClass="input-container-local" isRequired={true} bind:value={imgInput}></InputCustom>
      </div>
      <div class="image-wrapper">
        <img class="imagen-local" src={imgDisplay} alt="imagen-local" />
      </div>
    </section>

    <section class="card-local card">
      <h2 class="card-title">Dirección</h2>
      <div class="direccion-input-container">
        <InputCustom inputLabel="Direccion" inputType="text" isRequired={true} inputClass="input-local" inputContainerClass="input-container-local" bind:value={local.calle} testId="calleId"
        ></InputCustom>
        <InputCustom inputLabel="Latitud*" inputType="number" step="any" inputClass="input-local" inputContainerClass="input-container-local" bind:value={local.latitud}></InputCustom>
        <InputCustom inputLabel="Altura*" inputType="number" isRequired={true} inputClass="input-local" inputContainerClass="input-container-local" bind:value={local.altura}></InputCustom>
        <InputCustom inputLabel="Longitud*" inputType="number" step="any" inputClass="input-local" inputContainerClass="input-container-local" bind:value={local.longitud}></InputCustom>
      </div>
    </section>

    <section class="card card-local">
      <h2 class="card-title">Porcentajes</h2>
      <div class="porcentajes-input-container">
        <InputCustom
          inputLabel="% de comisión con la app *"
          inputType="number"
          isRequired={true}
          step="any"
          inputClass="input-local"
          inputContainerClass="input-container-local"
          bind:value={local.porcentajeComision}
        ></InputCustom>
        <InputCustom
          inputLabel="% de comisión de autor *"
          inputType="number"
          isRequired={true}
          step="any"
          inputClass="input-local"
          inputContainerClass="input-container-local"
          bind:value={local.porcentajeAutor}
          testId="comisionAutor"
        ></InputCustom>
      </div>
      <h2 class="card-title">Método de pago</h2>
      <div class="pago-checkbox-container">
        <div class="pago-checkbox-item">
          <input
            type="checkbox"
            name="efectivo"
            data-testid="checkbox-efectivo"
            checked={local.mediosDePago.includes(MedioDePago.EFECTIVO)}
            onchange={(e) => toggleMedioDePago(MedioDePago.EFECTIVO, e.currentTarget.checked)}
          />
          <label for="efectivo">Efectivo</label>
        </div>
        <div class="pago-checkbox-item">
          <input
            type="checkbox"
            name="qr"
            data-testid="checkbox-qr"
            checked={local.mediosDePago.includes(MedioDePago.QR)}
            onchange={(e) => toggleMedioDePago(MedioDePago.QR, e.currentTarget.checked)}
          />

          <label for="qr">QR</label>
        </div>
        <div class="pago-checkbox-item">
          <input
            type="checkbox"
            name="transferencia"
            data-testid="checkbox-transferencia"
            checked={local.mediosDePago.includes(MedioDePago.TRANSFERENCIA)}
            onchange={(e) => toggleMedioDePago(MedioDePago.TRANSFERENCIA, e.currentTarget.checked)}
          />
          <label for="transferencia">Transferencia</label>
        </div>
      </div>
    </section>

    <DoubleButton primaryButtonContent="Guardar" secondaryFunction={descartar} secondaryButtonContent="Descartar"></DoubleButton>
  </form>
</div>
