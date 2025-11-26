<script lang="ts">
  import ToastContainer from "$lib/components/toast/ToastContainer.svelte"

  import "$lib/styles/global.css"
  import favicon from "$lib/assets/favicon.svg"
  import NavBar from "$lib/components/NavBar.svelte"
  import MainContainer from "$lib/components/MainContainer.svelte"
  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<NavBar />

<MainContainer>
  {@render children?.()}
</MainContainer>

<ToastContainer />
