<script lang="ts">
  import ToastContainer from "$lib/components/toast/ToastContainer.svelte"

  import favicon from "$lib/assets/favicon.svg"
  import MainContainer from "$lib/components/MainContainer.svelte"
  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<MainContainer fullVH="container-full-vh">
  {@render children?.()}
</MainContainer>

<ToastContainer />
