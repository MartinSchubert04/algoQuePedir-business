import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup, waitFor } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import Page from '../../routes/(auth)/Register/+page.svelte'
import Login from '../../routes/(auth)/Login/+page.svelte'
import { authService } from "$lib/services/authService"
import { toasts } from "$lib/components/toast/toastStore"
import { goto } from '$app/navigation'


vi.mock('$app/navigation', () => ({
  goto: vi.fn(),
}))

vi.mock("$lib/services/authService")
vi.mock("$lib/components/toast/toastStore", () => ({toasts: { push: vi.fn()}}))

describe ("pagina register", () => {
  afterEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  it ("al ingresar un caracter en algun campo, aparece 'todos los camos son obligatorios' ", async () => {
    render(Page)

    const userInput = screen.getByLabelText("Usuario")

    await userEvent.type(userInput, "a")

    expect(await screen.findByText("No puede haber campos vacios"))

  })

  it ("se escribe el usuario pero las contraseñas no coinciden", async () => {
    render(Page)

    const userInput = screen.getByLabelText("Usuario")
    const passInput = screen.getByLabelText("Contraseña")
    const confPassInput = screen.getByLabelText("Confirmar contraseña")

    await userEvent.type(userInput, "a")
    await userEvent.type(passInput, "a")
    await userEvent.type(confPassInput, "1")

    expect(await screen.findByText("Las contraseñas no coinciden"))

  })

  it ("redirige al login y muestra el toast si el registro fue exitoso", async () => {
    render(Page)

    const userInput = screen.getByLabelText("Usuario")
    const passInput = screen.getByLabelText("Contraseña")
    const confPassInput = screen.getByLabelText("Confirmar contraseña")
    const registrarseInput = screen.getByRole("button", {name: /Registrarse/i})

    const username = "a"
    const password = "a"
    const confpw = "a"
    vi.mocked(authService.register).mockResolvedValueOnce({ username })

    await userEvent.type(userInput, username)
    await userEvent.type(passInput, password)
    await userEvent.type(confPassInput, confpw)
    await userEvent.click(registrarseInput)

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith(username, password, confpw)
      expect(toasts.push).toHaveBeenCalledWith("Registro exitoso!", { type: "success"})
      expect(goto).toHaveBeenCalledWith('/Login')
    })
  })

  it ("tira error si se quiere registrar un usuario con un nombre de usuario ya existente", async () => {
    
    //aca creamos un usuario
    render(Page)

    const userInput = screen.getByLabelText("Usuario")
    const passInput = screen.getByLabelText("Contraseña")
    const confPassInput = screen.getByLabelText("Confirmar contraseña")
    const registrarseInput = screen.getByRole("button", {name: /Registrarse/i})

    const username = "a"
    const password = "a"
    const confpw = "a"
    vi.mocked(authService.register).mockResolvedValueOnce({ username })

    await userEvent.type(userInput, username)
    await userEvent.type(passInput, password)
    await userEvent.type(confPassInput, confpw)
    await userEvent.click(registrarseInput)

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith(username, password, confpw)
      expect(toasts.push).toHaveBeenCalledWith("Registro exitoso!", { type: "success"})
      expect(goto).toHaveBeenCalledWith('/Login')
    })

    render(Login)
    //creamos otro usuario con el mismo nombre
    const registrateInput = screen.getByRole("button", {name: /Registrate/i})
    await userEvent.click(registrateInput)

    await userEvent.type(userInput, username)
    await userEvent.type(passInput, password)
    await userEvent.type(confPassInput, confpw)
    await userEvent.click(registrarseInput)

    await waitFor(() => {
      expect(screen.findByText("El usuario ingresado ya existe"))
    })
  })
})