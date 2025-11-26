<script lang="ts">
  import "../styles/global.css"
  import "../styles/Nav-bar.css"
  import { page } from "$app/stores"
  import { goto } from "$app/navigation"
  import { user, bowl, cart, plato, fork } from "../assets"

  function logoutAndNavigate() {
    localStorage.removeItem("username")
    location.href = "/Login"
  }

  const navegarA = (path: string) => {
    goto(`${path}`)
  }
</script>

<header>
  <input type="checkbox" id="menu-checkbox" class="menu-checkbox" style="display: none" />
  <nav>
    <div class="nav">
      <div class="logo-container">
        <img src={bowl} alt="logo" />
      </div>
      <div class="links mobile-only">
        <div class="logo-container-mobile">
          <img src={bowl} alt="Login" />
        </div>
        <a onclick={() => navegarA("/Pedidos")} class:active={$page.url.pathname === "/Pedidos"}>
          <img src={cart} alt="Pedidos" />
        </a>
        <a onclick={() => navegarA("/Menu")}>
          <img src={fork} alt="Menú" />
        </a>
        <a onclick={() => navegarA("/Ingredientes")}>
          <img src={plato} alt="Ingredientes" />
        </a>
        <div class="user-icon">
          <a onclick={navegarA("Cuenta")} role="button" aria-label="Cerrar sesión">
            <img src={user} alt="Cuenta" />
          </a>
        </div>
      </div>

      <div class="nav-title">
        <b>Algo que pedir</b>
      </div>
    </div>
    <div class="links">
      <a class="nav-bar-link" class:active={$page.url.pathname === "/Pedidos" || $page.url.pathname.startsWith("/Detalle_pedido")} onclick={() => navegarA("/Pedidos")}> Pedidos </a>
      <a class="nav-bar-link" class:active={$page.url.pathname === "/Menu"} onclick={() => navegarA("/Menu")}> Menú </a>
      <a class="nav-bar-link" class:active={$page.url.pathname === "/Ingredientes" || $page.url.pathname.startsWith("/Edicion_ingrediente")} onclick={() => navegarA("/Ingredientes")}>
        Ingredientes
      </a>
      <a class="nav-bar-link" class:active={$page.url.pathname === "/Cuenta"} onclick={() => navegarA("/Cuenta")}> Cuenta </a>
      <label class="menu-btn" for="menu-checkbox">
        <span></span>
      </label>
      <div class="user-icon">
        <img src={user} alt="Perfil" />
      </div>
    </div>
  </nav>
</header>
