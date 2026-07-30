import { expect, test } from '@playwright/test'

/**
 * Palco de capítulos: a mecânica que sustenta a experiência cinematográfica.
 * O que precisa continuar verdadeiro a cada mudança:
 * deep link funciona, rail navega, e nunca há mais de um vídeo tocando.
 */

test('deep link abre o capítulo correto', async ({ page }) => {
  await page.goto('/#capitulo-elevador')

  const stage = page.locator('#experiencias')
  await expect(stage.locator('nav button[aria-current="true"]')).toContainText('Dois níveis')
  await expect(stage.locator('h3')).toContainText('cidade alta')
})

test('rail navega entre capítulos e marca o ativo', async ({ page }) => {
  await page.goto('/#capitulo-historico')

  const stage = page.locator('#experiencias')
  await expect(stage.locator('nav button[aria-current="true"]')).toContainText(
    'Salvador histórico',
  )

  await stage.getByRole('button', { name: /O veículo/ }).click()

  await expect(stage.locator('nav button[aria-current="true"]')).toContainText('O veículo')
  await expect(stage.locator('h3')).toContainText('carro que leva você')
})

test('apenas um vídeo toca por vez', async ({ page }) => {
  await page.goto('/#capitulo-baia')
  // Dá tempo para o efeito de play/pause assentar após a troca de capítulo.
  await page.waitForTimeout(1200)

  const playingCount = await page
    .locator('#experiencias video')
    .evaluateAll((videos) => videos.filter((v) => !(v as HTMLVideoElement).paused).length)

  expect(playingCount).toBeLessThanOrEqual(1)
})

test('o último capítulo conduz à frota, dando continuidade à página', async ({ page }) => {
  await page.goto('/#capitulo-frota')

  const stage = page.locator('#experiencias')

  // Espera o capítulo virar ativo antes de checar o CTA: o
  // IntersectionObserver só dispara depois da hidratação, então asserir o
  // link direto criava uma corrida (o CTA do capítulo 01 ainda estava no DOM).
  await expect(stage.locator('nav button[aria-current="true"]')).toContainText('O veículo')

  const cta = stage.getByRole('link', { name: /Ver a frota/ })
  await expect(cta).toHaveAttribute('href', '/frota')
})
