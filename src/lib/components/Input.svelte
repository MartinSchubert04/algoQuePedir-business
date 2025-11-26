<script lang="ts">
  import "../styles/Input.css"
  import { warning } from "$lib/assets"

  let {
    inputLabel,
    inputType,
    hasIcon = false,
    iconPath = "",
    iconPathSlash = "",
    value = $bindable(),
    isEnabled = true,
    isRequired = false,
    step = null,
    testId = "input-comp",
    onInputFun = () => {},
    enableErrorMsg = false,
    message = "",
    inputClass = "",
    inputContainerClass = ""
  } = $props()

  let showPassword = $state(false)

  const togglePassword = () => {
    showPassword = !showPassword
  }

  const inputId = inputLabel.toLowerCase().replace(/\s+/g, "-")
</script>

<div class="input-container {inputContainerClass}">
  <input
    id={inputId}
    class="input {inputClass}"
    type={showPassword ? "text" : inputType}
    autocomplete="off"
    placeholder=" "
    data-testid={testId}
    name="input"
    disabled={!isEnabled}
    required={isRequired}
    bind:value
    oninput={onInputFun}
    step={inputType === "number" ? step : undefined}
  />
  <!--<label class="input-label" for="input">{inputLabel}</label>-->
  <label class="input-label" for={inputId}>{inputLabel}</label>

  {#if hasIcon}
    <img src={showPassword ? iconPathSlash : iconPath} class="input-icon-eye" alt="input-icon" onclick={togglePassword} style="cursor: pointer;" />
  {/if}

  {#if enableErrorMsg}
    <div class="card-alert-container">
      <img src={warning} class="input-icon-warning" alt="warning-img" />
      <span class="card-message input-alert">{message}</span>
    </div>
  {/if}
</div>
