<script lang="ts">
  let { metodoPago = "Método desconocido", variante = "default" } = $props()

  const iconosMedioPago: Record<string, string> = {
    EFECTIVO: "ph-money",
    TRANSFERENCIA: "ph-credit-card",
    QR: "ph-qr-code"
  }
  let metodoIcon = iconosMedioPago[metodoPago]
</script>

{#if variante === "paginaPedido"}
  <div class="payment-container">
    <i class={`ph ${metodoIcon}`} aria-hidden="true"></i>
    <p class="item-pago paginaPedido">{metodoPago}</p>
  </div>
{:else}
  <div class="payment-container">
    <i class={`ph ${metodoIcon}`} aria-hidden="true"></i>
    <p class="item-pago">{metodoPago}</p>
  </div>
{/if}
