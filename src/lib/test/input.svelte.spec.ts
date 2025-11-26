import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import InputCustom from "../components/Input.svelte"

describe("InputCustom", () => {
  afterEach(() => cleanup())

  it("renderiza con label y valor inicial", () => {
    render(InputCustom, {
      inputLabel: "Nombre del local",
      value: "Mi Local",
      testId: "input-nombre",
    })

    const input = screen.getByTestId("input-nombre")
    expect(input).toHaveValue("Mi Local")

    const label = screen.getByText("Nombre del local")
    expect(label).toBeInTheDocument()
  })

  it("permite escribir en el input", async () => {
    render(InputCustom, {
      inputLabel: "Nombre del local",
      value: "",
      testId: "input-nombre",
    })

    const input = screen.getByTestId("input-nombre")
    await userEvent.type(input, "Nuevo valor")
    expect(input).toHaveValue("Nuevo valor")
  })

  it("deshabilita el input si isEnabled es false", () => {
    render(InputCustom, {
      inputLabel: "Nombre del local",
      value: "",
      testId: "input-nombre",
      isEnabled: false,
    })

    const input = screen.getByTestId("input-nombre")
    expect(input).toBeDisabled()
  })

  it("marca el input como requerido si isRequired es true", () => {
    render(InputCustom, {
      inputLabel: "Nombre del local",
      value: "",
      testId: "input-nombre",
      isRequired: true,
    })

    const input = screen.getByTestId("input-nombre")
    expect(input).toBeRequired()
  })
})
