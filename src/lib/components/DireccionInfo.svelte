<script>
  let { direccion, iconoGlobo = "ph-map-pin", latitud, longitud} = $props()
</script>

<div class="ubicacion-container">
  <div class="map-icon-container">
    <i class={`ph ${iconoGlobo}`} aria-hidden="true"></i>
  </div>
  <div class="descripcion">
    <p class="texto_principal">{direccion}</p>
    <p class="texto_secundario" style="text-wrap-mode: nowrap">
      Lat: {latitud}, Long: {longitud}
    </p>
  </div>
</div>
