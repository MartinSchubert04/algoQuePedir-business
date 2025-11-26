import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup } from "@testing-library/svelte"
import Navbar from "../components/NavBar.svelte"



describe("Navbar test", () => {
  afterEach(() => cleanup())

  // Mock del store $page para que no rompa
  vi.mock("$app/stores", () => {
    return {
      page: {
        subscribe: (run: (val: any) => void) => {
          run({ url: { pathname: "/Pedidos" } })
          return () => {}
        }
      }
    }
  })

  // Mock de goto para simular navegación
  const mockGoto = vi.mock("$app/navigation", () => ({
    goto: vi.fn()
  }))

  it("renderiza logos principales", () => {
    render(Navbar)
    expect(screen.getByAltText("logo")).toBeInTheDocument()
    expect(screen.getByAltText("Perfil")).toBeInTheDocument()
  })

  it("renderiza los links visibles", () => {
    render(Navbar)
    const linkImgs = ["Pedidos", "Menú", "Ingredientes", "Cuenta"]
    linkImgs.forEach((alt) => {
      expect(screen.getByAltText(alt)).toBeInTheDocument()
    })
  })


})
