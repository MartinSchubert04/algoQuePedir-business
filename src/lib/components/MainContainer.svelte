<script lang="ts">
  import "$lib/styles/global.css"
  import "$lib/styles/Main-container.css"
  let { children, fullVH = "" } = $props()
</script>

<main class="main-container {fullVH}">
  {@render children?.()}
</main>
