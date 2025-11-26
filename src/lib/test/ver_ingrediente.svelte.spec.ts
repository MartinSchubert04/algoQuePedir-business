import { screen, render, cleanup } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import Page from "../../routes/(app)/(ingrediente)/Ver_ingrediente/[id]/+page.svelte"
import { beforeEach, describe, expect, it } from "vitest"
import { Ingrediente } from "$lib/types/Ingrediente"


describe("Datos del form", () => {
  let ing: Ingrediente
  beforeEach(() => {
    ing = new Ingrediente(1, "Hamburguesa", 8000, "CEREALES_TUBERCULOS", true)
    cleanup()
  })
  
  it("Obtener nombre del input", () => {
    render(Page, {
      props: {
        data: {
          ingrediente: ing,
          backendStatus: "UP"
        }
      }
    })

    const nombre = screen.getByTestId("input-nombre")
    
    expect(nombre).toBeTruthy()
    expect((nombre as HTMLInputElement).value).toBe("Hamburguesa")
  })

  it("Cambio en el input", async () => {
    ing = ing = new Ingrediente(1, "Hamburguesa", 8000, "CEREALES_TUBERCULOS", true)
    render(Page, {
      props: {
        data: {
          ingrediente: ing,
          backendStatus: "UP"
        }
      }
    })

    const nombre = screen.getByTestId("input-nombre")

    await userEvent.type(nombre, "Lechuga")
    expect((nombre as HTMLInputElement).value).toBe("Hamburguesa")
  })

  it("Obtener precio del input", () => {
    render(Page, {
      props: {
        data: {
          ingrediente: ing,
          backendStatus: "UP"
        }
      }
    })
    const precio = screen.getByTestId("input-precio")

    expect(precio).toBeTruthy()
    expect((precio as HTMLInputElement).value).toBe("8000")
  })

  it("Obtener grupo", () => {
    render(Page, {
      props:{
        data:{
          ingrediente: ing,
          backendStatus: "UP"
        }
      }
    })

    const grupo = screen.getByTestId("drop-grupo")

    expect(grupo).toBeTruthy()
    expect((grupo as HTMLSelectElement).value).toBe("CEREALES_TUBERCULOS")
  })

  it("Obtener origen", () => {
    render(Page, {
      props:{
        data:{
          ingrediente: ing,
          backendStatus: "UP"
        }
      }
    })

    const origenAnimal = screen.getByTestId("switch-origen")

    expect(origenAnimal).toBeTruthy()
    expect((origenAnimal as HTMLInputElement).checked).toBe(true)
  })
})