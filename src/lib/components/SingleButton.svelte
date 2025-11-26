<script lang="ts">
  import "$lib/styles/Button.css"

  let { content, fun } = $props()
</script>

<div class="buttons-container">
  <button class="primary-button" onclick={fun}>{content}</button>
</div>
