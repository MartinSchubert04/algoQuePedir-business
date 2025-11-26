import { expect, test, type Page } from '@playwright/test'

test.describe('Flujo de locales', () => {

  let adminName = 'admin_test'
  let localId: number

  test('crear, editar y guardar un local', async ({ page, request }) => {
    // Limpiar local anterior si existe (por si queda alguno con el mismo admin)
    const old = await request.get(`http://localhost:9000/local?user=${adminName}`)
    if (old.ok()) {
      const json = await old.json()
      if (json?.id) {
        await request.delete(`http://localhost:9000/local/${json.id}`)
      }
    }

    // Comenzamos desde la página de local
    await page.goto(`/local`)

    // Creamos un nuevo local
    await completarFormularioLocal({
      nombre: 'La Parrilla de Martín',
      imgURL: 'https://example.com/parrilla.jpg',
      calle: 'Av. Mitre',
      altura: 1234,
      latitud: -34.61,
      longitud: -58.38,
      porcentajeComision: 10,
      porcentajeAutor: 15,
      medios: ['efectivo', 'qr']
    }, page)

    // Escuchar al backend cuando se guarda (POST)
    const [response] = await Promise.all([
      page.waitForResponse(res =>
        res.url().includes('/local') && res.request().method() === 'POST'
      ),
      page.getByRole('button', { name: 'Guardar' }).click()
    ])
    const json = await response.json()
    localId = json.id
    expect(localId).toBeTruthy()

    // Verificar que se guardó correctamente en la UI
    await expect(page.getByTestId('nombreId')).toHaveValue('La Parrilla de Martín')
    await expect(page.getByTestId('calleId')).toHaveValue('Av. Mitre')
    await expect(page.getByTestId('comisionAutor')).toHaveValue('15')

    // Editamos el local
    await page.getByTestId('nombreId').fill('La Parrilla Actualizada')
    await page.getByTestId('calleId').fill('Av. Santa Fe')
    await page.getByTestId('comisionAutor').fill('20')

    // Escuchar PUT
    const [putResponse] = await Promise.all([
      page.waitForResponse(res =>
        res.url().includes('/local') && res.request().method() === 'PUT'
      ),
      page.getByRole('button', { name: 'Guardar' }).click()
    ])
    const updated = await putResponse.json()

    expect(updated.nombreLocal).toBe('La Parrilla Actualizada')
    expect(updated.porcentajeAutor).toBe(20)

    // Verificamos la actualización en la UI
    await expect(page.getByTestId('nombreId')).toHaveValue('La Parrilla Actualizada')
    await expect(page.getByTestId('calleId')).toHaveValue('Av. Santa Fe')
    await expect(page.getByTestId('comisionAutor')).toHaveValue('20')

    // ✅ Limpieza (opcional)
    await request.delete(`http://localhost:9000/local/${localId}`)
  })
})

async function completarFormularioLocal(data: {
  nombre: string,
  imgURL: string,
  calle: string,
  altura: number,
  latitud: number,
  longitud: number,
  porcentajeComision: number,
  porcentajeAutor: number,
  medios: string[]
}, page: Page) {
  await page.getByTestId('nombreId').fill(data.nombre)
  await page.getByLabel('URL de la imagen').fill(data.imgURL)
  await page.getByTestId('calleId').fill(data.calle)
  await page.getByLabel('Altura*').fill(data.altura.toString())
  await page.getByLabel('Latitud*').fill(data.latitud.toString())
  await page.getByLabel('Longitud*').fill(data.longitud.toString())
  await page.getByLabel('% de comisión con la app *').fill(data.porcentajeComision.toString())
  await page.getByTestId('comisionAutor').fill(data.porcentajeAutor.toString())

  for (const medio of data.medios) {
    await page.getByTestId(`checkbox-${medio}`).check()
  }
}
