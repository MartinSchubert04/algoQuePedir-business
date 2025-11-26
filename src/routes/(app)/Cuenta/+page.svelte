<script lang="ts">
  import "$lib/styles/Button.css"
  import "$lib/styles/Card.css"
  import "$lib/styles/Input.css"
  import "$lib/styles/perfil-local.css"
  import InputCustom from "$lib//components/Input.svelte"
  import type { PageProps } from "./View/$typesenta/$types"
  import { Local, MedioDePago } from "$lib/types/Local"
  import { imgNotFound } from "$lib/assets"
  import DoubleButton from "$lib/components/DoubleButton.svelte"
  import { goto } from "$app/navigation"

  let { data }: PageProps = $props()
  let local = $state(data.local ?? new Local())

  function navigateTo(path: string) {
    goto(`${path}`)
  }

  let img = $derived(local.imgURL && (local.imgURL.startsWith("http") || local.imgURL.startsWith("data:")) ? local.imgURL : imgNotFound)
  let imgInput = $state(local.imgURL.startsWith("data:") || local.imgURL.startsWith("http") ? local.imgURL : "")
</script>

<div class="main-content-container">
  <div class="main-card-header">
    <h1 class="main-card-title">Información del local</h1>
  </div>

  <section class="card card-local card-row">
    <div class="input-form-local">
      <InputCustom
        inputLabel="Nombre del local"
        inputType="text"
        isEnabled={false}
        testId="nombreId"
        inputClass="input-local"
        inputContainerClass="input-container-local"
        bind:value={local.nombreLocal}
      ></InputCustom>
      <InputCustom inputLabel="URL de la imagen" inputType="text" isEnabled={false} inputClass="input-local" inputContainerClass="input-container-local" bind:value={imgInput}></InputCustom>
    </div>
    <div class="image-wrapper">
      <img class="imagen-local" src={img} alt="imagen-local" />
    </div>
  </section>

  <section class="card-local card">
    <h2 class="card-title">Dirección</h2>
    <div class="direccion-input-container">
      <InputCustom inputLabel="Direccion" inputType="text" isEnabled={false} inputClass="input-local" inputContainerClass="input-container-local" bind:value={local.calle} testId="calleId"
      ></InputCustom>
      <InputCustom inputLabel="Latitud*" inputType="number" isEnabled={false} inputClass="input-local" inputContainerClass="input-container-local" bind:value={local.latitud}></InputCustom>
      <InputCustom inputLabel="Altura*" inputType="number" isEnabled={false} inputClass="input-local" inputContainerClass="input-container-local" bind:value={local.altura}></InputCustom>
      <InputCustom inputLabel="Longitud*" inputType="number" isEnabled={false} inputClass="input-local" inputContainerClass="input-container-local" bind:value={local.longitud}></InputCustom>
    </div>
  </section>

  <section class="card card-local">
    <h2 class="card-title">Porcentajes</h2>
    <div class="porcentajes-input-container">
      <InputCustom
        inputLabel="% de comisión con la app *"
        inputType="number"
        isEnabled={false}
        inputClass="input-local"
        inputContainerClass="input-container-local"
        bind:value={local.porcentajeComision}
      ></InputCustom>
      <InputCustom
        inputLabel="% de comisión de autor *"
        inputType="number"
        isEnabled={false}
        inputClass="input-local"
        inputContainerClass="input-container-local"
        bind:value={local.porcentajeAutor}
        testId="comisionAutor"
      ></InputCustom>
    </div>
    <h2 class="card-title">Método de pago</h2>
    <div class="pago-checkbox-container">
      <div class="pago-checkbox-item">
        <input type="checkbox" name="efectivo" data-testid="checkbox-efectivo" disabled={true} checked={local.mediosDePago.includes(MedioDePago.EFECTIVO)} />
        <label for="efectivo">Efectivo</label>
      </div>
      <div class="pago-checkbox-item">
        <input type="checkbox" name="qr" data-testid="checkbox-qr" disabled={true} checked={local.mediosDePago.includes(MedioDePago.QR)} />

        <label for="qr">QR</label>
      </div>
      <div class="pago-checkbox-item">
        <input type="checkbox" name="transferencia" data-testid="checkbox-transferencia" disabled={true} checked={local.mediosDePago.includes(MedioDePago.TRANSFERENCIA)} />
        <label for="transferencia">Transferencia</label>
      </div>
    </div>
  </section>
  <DoubleButton primaryButtonContent="Salir" primaryFunction={() => navigateTo("/Login")} secondaryFunction={() => navigateTo("/Cuenta/Editar")} secondaryButtonContent="Editar"></DoubleButton>
</div>
