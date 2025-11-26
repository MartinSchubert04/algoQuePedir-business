import { expect, test } from '@playwright/test'

test.describe('Flujo de edición desde la tabla de ingredientes', () => {
  const nuevoNombre = 'End to End test'

  test('editar un ingrediente existente y verificar actualización en la lista', async ({ page }) => {
    // Funcion auxiliar
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
    const filas = await page.locator('tbody tr').count()
    expect(filas).toBeGreaterThan(0)

    // 🧱 Guardar el nombre actual del primer ingrediente para restaurar después
    const primerIngrediente = page.locator('tbody tr').first()

    // Esto nos lleva a la pagina de editar ingrediente
    await primerIngrediente.locator('td:last-child > :nth-child(3)').click()


    const inputNombre = page.getByTestId('input-nombre')
    await inputNombre.fill(nuevoNombre)

    // 🔁 Esperar redirección y recarga de la lista
    const botonSubmit = page.locator('button[type="submit"]')
    await botonSubmit.click()
    await page.waitForURL("/Ingredientes")

    // ✅ Verificar que en la tabla figure el nuevo nombre
    const nombreActualizado = page.locator('tbody tr').first().locator('td').nth(0)
    await expect(nombreActualizado).toHaveText(nuevoNombre)
  })

  test("Borrar ingrediente de la lista", async ({page}) => {
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
    let filas = await page.locator('tbody tr').count()
    if(filas === 0){
      console.info("No hay ingredientes en el backend para testear borrar")
    }
    else{
      for(let i = filas; i > 0; i--){
        let primerIngrediente = page.locator('tbody tr').first()
        await primerIngrediente.locator('td:last-child > :nth-child(6)').click()
        await page.waitForTimeout(500)
      }
  
      filas = filas = await page.locator('tbody tr').count()
      expect(filas).toBe(0)
    }
  })
})