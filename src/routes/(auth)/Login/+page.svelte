<script lang="ts">
  import "$lib/styles/Card.css"
  import "$lib/styles/global.css"
  import "$lib/styles/Input.css"
  import "$lib/styles/Main-container.css"
  import { olla, ojo, ojotachado, warning } from "$lib/assets"
  import { goto } from "$app/navigation"
  import InputCustom from "$lib/components/Input.svelte"
  import { authService } from "$lib/services/authService"
  import { showSuccess, getErrorMessage } from "$lib/domain/errorHandler"

  let pass: string = $state("")
  let userName: string = $state("")
  let userExist: boolean = $state(true)
  let message: string = $state("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let enableErrorMsg = $state(false)

  const navigateTo = (path: string) => {
    goto(`${path}`)
  }

  const conditions = () => {
    return pass.length > 0 && userName.length > 0
  }

  async function validateUser(username: string, password: string) {
    if (!conditions()) {
      enableErrorMsg = true
      userExist = false 
      message = "Los campos son obligatorios"
      return
    }

    try {
      const data = await authService.login(username, password)
      localStorage.setItem("username", data.username)
      navigateTo("/Pedidos")
      showSuccess("Sesión iniciada correctamente")
    } catch (e : unknown) {
      enableErrorMsg = true
      userExist = false
      message = getErrorMessage(e)
    }
  }

  $effect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    userName
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    pass
    userExist = true
    enableErrorMsg = false
  })
</script>

<main class="main-container container-full-vh">
  <section class="card login">
    <header class="card-header">
      <img src={olla} class="card-page-logo" alt=""/>
      <span class="main-card-title card-title-login">Algo que pedir</span>
    </header>
    <form class="input-form">
      <InputCustom inputLabel="Usuario" inputType="text" bind:value={userName}></InputCustom>
      <InputCustom inputLabel="Contraseña" inputType="password" bind:value={pass} hasIcon={true} iconPath={ojo} iconPathSlash={ojotachado}></InputCustom>
      {#if !userExist}
        <div class="card-alert-container">
          <img src={warning} class="input-icon-warning" alt="warning-img" />
          <span class="card-message input-alert">{message}</span>
        </div>
      {/if}
      <a onclick={() => validateUser(userName, pass)} class="no-underline">
        <button class="card-btn" type="button">Iniciar sesión</button>
      </a>
    </form>
    <span class="card-message">
      ¿No tienes cuenta? <a role = "button" onclick={() => navigateTo("/Register")}>Registrate</a>
    </span>
  </section>
</main>
