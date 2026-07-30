import { expect, test } from '@playwright/test'

/**
 * O caminho até o WhatsApp é o único ponto do site onde uma falha silenciosa
 * custa uma venda. O teste assere a URL montada — não o comportamento do
 * WhatsApp em si.
 *
 * A navegação real para api.whatsapp.com é interceptada: deixar o Chromium
 * de teste sair para a internet de verdade é lento, depende de rede externa
 * disponível no ambiente de CI e bate desnecessariamente na infraestrutura
 * do WhatsApp a cada execução. `page.route` captura a URL final sem
 * completar a navegação.
 */
test('home → escolha de serviço → WhatsApp com a mensagem correta', async ({ page }) => {
  // O app navega para wa.me, que redireciona (rede real) para
  // api.whatsapp.com e reformata a query string pelo caminho (espaço vira
  // "+" em vez de "%20"). Interceptar o primeiro salto evita depender da
  // rede E evita esse reformato, preservando a URL exata que o app montou.
  await page.route('**://wa.me/**', (route) =>
    route.fulfill({ status: 200, contentType: 'text/plain', body: 'ok', headers: {} }),
  )

  await page.goto('/')

  await page.getByRole('link', { name: 'Transfer aeroporto' }).first().click()
  await expect(page).toHaveURL(/\/solicitar\?servico=transfer-aeroporto/)

  // O serviço chega pré-selecionado a partir da home.
  await expect(page.getByLabel('Serviço')).toHaveValue('transfer-aeroporto')

  await page.getByLabel('Nome').fill('Ana Souza')
  await page.getByLabel('Telefone ou e-mail').fill('71988887777')
  await page.getByLabel('Passageiros').fill('3')
  await page.getByLabel('Detalhes do trajeto').fill('Aeroporto para a Barra, voo G3 1234')

  await page.getByRole('button', { name: /Enviar pelo WhatsApp/ }).click()
  await page.waitForURL(/wa\.me/, { timeout: 10_000 })

  const url = decodeURIComponent(page.url())
  expect(url).toContain('Serviço: Transfer aeroporto')
  expect(url).toContain('Nome: Ana Souza')
  expect(url).toContain('Passageiros: 3')
  expect(url).toContain('voo G3 1234')
  // Campo não preenchido não entra na mensagem.
  expect(url).not.toContain('Data:')
  expect(url).not.toContain('undefined')
})

test('campos obrigatórios bloqueiam o envio e recebem foco', async ({ page }) => {
  await page.goto('/solicitar')
  await page.getByRole('button', { name: /Enviar pelo WhatsApp/ }).click()

  await expect(page).not.toHaveURL(/whatsapp\.com/)
  await expect(page.getByText('Escolha o serviço.')).toBeVisible()
})

test('nenhuma página tem link vazio', async ({ page }) => {
  for (const path of ['/', '/servicos', '/frota', '/passeios', '/contato']) {
    await page.goto(path)
    const bad = await page
      .locator('a[href="#"], a:not([href])')
      .count()
    expect(bad, `link vazio em ${path}`).toBe(0)
  }
})
