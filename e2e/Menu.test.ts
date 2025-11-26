import { expect, test, type Page } from '@playwright/test'

test.describe('Flujo completo de platos', () => {
  let platoId: number

  test('crear, editar, verificar y eliminar un plato', async ({ page, request }) => {

   await login(page)
   

    await page.goto('/Menu')
    await expect(page.getByText('Gestión del Menú')).toBeVisible()
    await expect(page.getByText('Platos Disponibles')).toBeVisible()

    await page.getByText("Agregar Nuevo Plato").click();    
    await expect(page).toHaveURL("Crear_Edicion_plato")

    // formulario con lo minimo
    await completarFormularioPlato({
      nombre: 'Milanesa Napolitana',
      descripcion: 'Milanesa con salsa, jamón y queso',
      imagen: 'https://example.com/milanesa.jpg',
      costo: 3500
    }, page)

    // Esperar POST de creación
    const [response] = await Promise.all([
      page.waitForResponse(res =>
        res.request().method() === 'POST'
      ),
      page.getByRole('button', { name: /Guardar/i }).click()
      
    ])
    const json = await response.json()
    platoId = json.id
    expect(platoId).toBeTruthy()

    //   nuevo plato 
    await page.goto('/Menu')
    await expect(page.getByText('Milanesa Napolitana')).toBeVisible()
    await expect(page.getByText('$3500')).toBeVisible()

    //  Editar el plato
    await page.locator(`a[href="/Edicion_plato/${platoId}"]`).click(); 
    await expect(page).toHaveURL((`/Edicion_plato/${platoId}`))

    await completarFormularioPlato({
      nombre: 'Milanesa con Puré',
      descripcion: 'Milanesa servida con puré de papas',
      imagen: 'https://example.com/milanesa-pure.jpg',
      costo: 3700
    }, page)

    // Esperar PUT
    const [putResponse] = await Promise.all([
      page.waitForResponse(res =>
        res.request().method() === 'PUT'
      ),
      page.getByRole('button', { name: /Guardar/i }).click()
    ])
   
    await expect(page.getByText('Milanesa con Puré')).toBeVisible()
    await expect(page.getByText('$3700')).toBeVisible()

    // Verificar 
    await page.goto('/Menu')
    await expect(page.getByText('Milanesa con Puré')).toBeVisible()
    await expect(page.getByText('$3700')).toBeVisible()

    // Eliminar el plato
    const [deleteResponse] = await Promise.all([
      page.waitForResponse(res =>
        res.request().method() === 'DELETE'
      ),
      await page.locator(`label[for="${platoId}"]`).click()
    ])
    expect(deleteResponse.ok()).toBeTruthy()

    // Verificar 
    await page.goto('/Menu')
    await expect(page.getByText('Milanesa con Puré')).not.toBeVisible()
  })
})

/**
 * Completa el formulario minimo de creación/edición de platos.
 */

// : inicia sesión con usuario estándar (user: 123, pass: 123)
 
async function login(page: Page) {
  await page.goto('/Login')

  // Completa los inputs
  await page.getByTestId('input-comp').nth(0).fill('123') // primer input
  await page.getByTestId('input-comp').nth(1).fill('123') // segundo input

  await page.getByRole('button', { name: /Iniciar sesión/i }).click()

  // Espera la redirección (a /Pedidos o la siguiente pantalla)
  await page.waitForURL("/Pedidos")
  await expect(page).toHaveURL("/Pedidos")
}

async function completarFormularioPlato(data: {
  nombre: string
  descripcion: string
  imagen: string
  costo: number

}, page: Page) {
  await page.getByTestId('input-comp').nth(0).fill(data.nombre)
  await page.getByTestId('input-comp').nth(1).fill(data.descripcion)
  await page.getByTestId('input-comp').nth(2).fill(data.imagen)
  await page.getByLabel('Precio Base*').fill(data.costo.toString()); 
}
