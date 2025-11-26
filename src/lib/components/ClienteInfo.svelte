<script>
  let { nombreCliente, apellidoCliente, usuario, foto } = $props()
</script>

<img src={foto} alt={nombreCliente} />
<div class="descripcion" style="align-content: center">
  <p class="texto_principal">{nombreCliente} {apellidoCliente}</p>
  <dl class="texto_secundario" style="display: flex; gap: 0.2rem;">
  <dt><b>usuario</b></dt>
  <dd>{usuario}</dd>
</dl>
</div>
