import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import Page from "../../routes/(app)/Cuenta/Editar/+page.svelte"
import { Local, MedioDePago } from "../types/Local"

describe("+page.svelte parcial", () => {
  afterEach(() => cleanup())

  it("checkbox de medios de pago refleja correctamente el estado", async () => {
    const localMock = new Local()
    localMock.mediosDePago = [MedioDePago.EFECTIVO]

    render(Page, { data: { local: localMock } })

    const efectivoCheckbox = screen.getByTestId("checkbox-efectivo")
    const qrCheckbox = screen.getByTestId("checkbox-qr")

    expect(efectivoCheckbox).toBeChecked()
    expect(qrCheckbox).not.toBeChecked()

    // simular click para agregar QR
    await userEvent.click(qrCheckbox)
    expect(qrCheckbox).toBeChecked()
  })

  it("botones de Guardar y Descartar existen", () => {
    render(Page, { data: { local: new Local() } })

    expect(screen.getByText("Guardar")).toBeTruthy()
    expect(screen.getByText("Descartar")).toBeTruthy()
  })
})