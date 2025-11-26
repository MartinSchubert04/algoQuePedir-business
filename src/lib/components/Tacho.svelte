<script>
  import "$lib/styles/Button.css"
  let { id = "delete" } = $props()
</script>

<div class="can-container">
  <label for={id}>
    <div class="wrapper">
      <div class="lid">
        <div class="lid-filler"></div>
      </div>
      <div class="can">
        <div class="can-filler"></div>
      </div>
    </div>
  </label>
  <input class="can-checkbox" type="checkbox" {id} />
</div>

<!-- uso: <Tacho id="1"/>-->
