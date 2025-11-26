import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup, waitFor } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import Page from '../../routes/(auth)/Login/+page.svelte'
import { authService } from "$lib/services/authService"
import { toasts } from "$lib/components/toast/toastStore"
import { goto } from '$app/navigation'

vi.mock('$app/navigation', () => ({
  goto: vi.fn(),
}))

vi.mock("$lib/services/authService")
vi.mock("$lib/components/toast/toastStore", () => ({toasts: { push: vi.fn()}}))

describe("pagina Login", () => {
  afterEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  it ("muestra un error si los campos estan vacios", async () => {
    render(Page)

    const loginButton = screen.getByRole("button", {name: /Iniciar sesión/i})
    await userEvent.click(loginButton)

    expect(screen.getByText("Los campos son obligatorios")).toBeTruthy()
  })

  it ("muestra error si las credenciales (usuario o contraseña) son incorrectas", async () => {
    vi.mocked(authService.login).mockRejectedValueOnce({
      response: { data: "Usuario o contraseña incorrectos", status: 400}
    })
    render(Page)

    const userInput = screen.getByLabelText("Usuario")
    const passInput = screen.getByLabelText("Contraseña")
    const loginButton = screen.getByRole("button", {name: /Iniciar sesión/i})

    await userEvent.type(userInput, "a")
    await userEvent.type(passInput, "a")
    await userEvent.click(loginButton)

    expect(await screen.findByText("Usuario o contraseña incorrectos")).toBeTruthy()

  })

  it("pasamos a la parte de pedidos si se concreta correctamente el login", async () => {

    const username = "123"
    const password = "123"

    vi.mocked(authService.login).mockResolvedValueOnce({ username })

    render(Page)

    const userInput = screen.getByLabelText("Usuario")
    const passInput = screen.getByLabelText("Contraseña")
    const loginButton = screen.getByRole("button", {name: /Iniciar sesión/i})

    await userEvent.type(userInput, username)
    await userEvent.type(passInput, password)
    await userEvent.click(loginButton)

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith(username, password)
      expect(toasts.push).toHaveBeenCalledWith("Sesión iniciada correctamente", { type: "success"})
      expect(goto).toHaveBeenCalledWith('/Pedidos')
    })
  })
})