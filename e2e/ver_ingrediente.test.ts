import test, { expect } from "playwright/test";

test.describe("Revisar que los datos del back del ingrediente sean correctos", () => {

  test("Revisar el nombre", async ({page}) => {
    async function login(){
      await page.goto("/Login")
      const inputs = await page.locator(".input-form .input")
      await inputs.first().fill("123")
      await inputs.last().fill("123")
      await Promise.all([
        await page.locator(".no-underline").click()
      ])
    }
    await login()
    await page.goto('/Ingredientes')

    // Esperar que la tabla cargue al menos un ingrediente
    await page.waitForTimeout(2000)
    await page.waitForSelector('tbody tr')
    const filas = await page.locator('tbody tr').count()
    expect(filas).toBeGreaterThan(0)
    
    // 🧱 Guardar el nombre actual del primer ingrediente para restaurar después
    const primerIngrediente = page.locator('tbody tr').first()
    const primerIngredienteNombre = await primerIngrediente.innerText()
    // Esto nos lleva a la pagina de ver ingrediente
    await primerIngrediente.locator('td:last-child > :nth-child(1) > a').click()

    const inputNombre = page.getByTestId('input-nombre')
    await expect(primerIngredienteNombre).toContain(await inputNombre.inputValue())
  })
})