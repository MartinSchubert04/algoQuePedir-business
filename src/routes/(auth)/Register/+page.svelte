<script lang="ts">
  import "$lib/styles/Card.css"
  import "$lib/styles/global.css"
  import { olla, warning, ojo, ojotachado } from "$lib/assets"
  import { goto } from "$app/navigation"
  import InputCustom from "$lib/components/Input.svelte"
  import { authService } from "$lib/services/authService"
  import { getErrorMessage, showSuccess } from "$lib/domain/errorHandler"

  let pass: string = $state("")
  let passConfirm: string = $state("")
  let userName: string = $state("")
  let message = $state("")
  let enableErrorMsg = $state(false)

  const conditions = () => {
    return pass.length > 0 && passConfirm.length > 0 && userName.length > 0
  }

  const equalPass = () => {
    return pass == passConfirm
  }

  const navigateTo = (path: string) => {
    goto(`${path}`)
  }

  async function register(username: string, password: string, passConfirmation: string) {
    if (!(conditions() && equalPass())) {
      checkInput()
      return
    }

    try {
      await authService.register(username, password, passConfirmation)
      navigateTo("/Login")
      showSuccess("Registro exitoso!")
    } catch (error: unknown) {
      enableErrorMsg = true
      message = getErrorMessage(error)
    }
  }

  function checkInput() {
    if (!conditions()) {
      enableErrorMsg = true
      message = "No puede haber campos vacios"
      return
    }
    if (!equalPass()) {
      enableErrorMsg = true
      message = "Las contraseñas no coinciden"
      return
    }

    enableErrorMsg = false
  }
</script>

<section class="card register">
  <header class="card-header">
    <img src={olla} class="card-page-logo" alt="" />
    <span class=" main-card-title card-title-login">Crea tu cuenta</span>
  </header>
  <form class="input-form">
    <!-- prettier-ignore -->
    <InputCustom 
      inputLabel="Usuario" 
      inputType="text" 
      bind:value={userName} 
      onInputFun={() => checkInput()}>
    </InputCustom>
    <!-- prettier-ignore -->
    <InputCustom inputLabel="Contraseña" 
      inputType="password" 
      bind:value={pass} 
      onInputFun={() => checkInput()} 
      hasIcon={true} iconPath={ojo} 
      iconPathSlash={ojotachado}>
    </InputCustom>
    <!-- prettier-ignore -->
    <InputCustom 
      inputLabel="Confirmar contraseña" 
      inputType="password" 
      bind:value={passConfirm} 
      onInputFun={() => checkInput()} 
      hasIcon={true} iconPath={ojo} 
      iconPathSlash={ojotachado}>
    </InputCustom>

    {#if enableErrorMsg}
      <div class="card-alert-container">
        <img src={warning} class="input-icon-warning" alt="warning-img" />
        <span class="card-message input-alert">{message}</span>
      </div>
    {/if}
    <button class="card-btn" type="button" onclick={() => register(userName, pass, passConfirm)}>Registrarse</button>
  </form>
  <span class="card-message">¿Ya tienes una cuenta? <a role="button" onclick={() => navigateTo("/Login")}>Inicia sesión</a></span>
</section>
