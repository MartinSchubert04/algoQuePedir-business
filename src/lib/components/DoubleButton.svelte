<script lang="ts">
  import "$lib/styles/Button.css"

  let { primaryButtonContent, secondaryButtonContent, primaryFunction = function (): void {}, secondaryFunction } = $props()
</script>

<div class="buttons-container">
  <button class="primary-button" onclick={primaryFunction}>{primaryButtonContent}</button>
  <button class="secondary-button" onclick={secondaryFunction}>{secondaryButtonContent}</button>
</div>
