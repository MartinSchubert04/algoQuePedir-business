<script lang="ts">
  let { texto, activo = false, onclick }: { texto: string, activo?: boolean, onclick?: () => void } = $props()
</script>

<button class="filtro-pedidos" class:active={activo} {onclick} data-testid="filtro-{texto}" >
  <p class="input-label-pedido">{texto}</p>
  <div class="filtro-texto-sombra"></div>
</button>
