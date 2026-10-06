import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium, expect } from '@playwright/test';

// Run against a local Vite server: npm run dev, then npm test.
// WhatsApp opening is intercepted before any contact can leave this browser.
const baseURL = process.env.SITE_URL || 'http://localhost:5173';
const output = new URL('../artifacts/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
const runtimeErrors = [];
const failedLocalResources = [];
async function check(name, fn) {
  try {
    await fn();
    results.push({ name, status: 'passed' });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({ name, status: 'failed', error: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}
async function visit(context) {
  const page = await context.newPage();
  page.on('pageerror', error => runtimeErrors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith(baseURL) && response.status() >= 400) {
      failedLocalResources.push(`${response.status()} ${response.url()}`);
    }
  });
  await page.addInitScript(() => {
    window.__testOpenCalls = [];
    window.open = (...args) => {
      window.__testOpenCalls.push(args);
      return null;
    };
  });
  await page.route('https://wa.me/**', route => route.abort());
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return page;
}
async function revealPage(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 650) {
    await page.evaluate(value => window.scrollTo({ top: value, behavior: 'instant' }), y);
    await page.waitForTimeout(75);
  }
  await page.waitForTimeout(850);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(300);
}
async function assertTab(page, id, panel) {
  await expect(page.locator(id)).toBeFocused();
  await expect(page.locator(id)).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator(id)).toHaveAttribute('tabindex', '0');
  await expect(page.locator(panel)).toHaveAttribute('aria-labelledby', id.slice(1));
}
async function assertNoHorizontalOverflow(page) {
  const layout = await page.evaluate(() => ({
    viewport: window.innerWidth,
    body: document.body.scrollWidth,
    document: document.documentElement.scrollWidth,
  }));
  assert.ok(layout.body <= layout.viewport + 1 && layout.document <= layout.viewport + 1,
    `Horizontal overflow: ${JSON.stringify(layout)}`);
}

try {
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await visit(desktopContext);

  await check('Desktop: semantics, honest product preview, official destinations and anchors', async () => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('comando');
    await expect(page.locator('.dashboard-caption')).toContainText('ILUSTRATIVA');
    await expect(page.locator('a[href="tel:+553330381657"]')).toHaveCount(1);
    await expect(page.locator('a[href="mailto:gestao@eagletecnologia.com"]')).toHaveCount(1);
    const expectedLinks = {
      salesforce: 'https://eagletecnologia.com/sistema-de-gestao/sistema-de-forca-de-venda/',
      recurrence: 'https://eagletecnologia.com/sistema-de-gestao/modulo-recorrencia/',
      loyalty: 'https://eagletecnologia.com/sistema-de-gestao/modulo-fidelidade/',
      about: 'https://eagletecnologia.com/sobre-a-eagle-tecnologia/',
    };
    for (const [key, href] of Object.entries(expectedLinks)) {
      await expect(page.locator(`[data-official-link="${key}"]`)).toHaveAttribute('href', href);
    }
    const invalidAnchors = await page.locator('a[href^="#"]').evaluateAll(anchors =>
      anchors.map(anchor => anchor.getAttribute('href')).filter(href => !document.getElementById(href.slice(1)))
    );
    assert.deepEqual(invalidAnchors, []);
    const duplicateIds = await page.locator('[id]').evaluateAll(nodes => {
      const ids = nodes.map(node => node.id);
      return ids.filter((id, index) => ids.indexOf(id) !== index);
    });
    assert.deepEqual(duplicateIds, []);
    const missingImages = await page.locator('img').evaluateAll(images => images.filter(img => !img.hasAttribute('alt')).map(img => img.src));
    assert.deepEqual(missingImages, []);
    await assertNoHorizontalOverflow(page);
  });

  await check('Dashboard: keyboard tabs, focus order and live content', async () => {
    const originalMetric = await page.locator('#metric-label-one').textContent();
    await page.locator('#dash-tab-general').focus();
    await page.keyboard.press('ArrowRight');
    await assertTab(page, '#dash-tab-finance', '#dash-panel');
    assert.notEqual(await page.locator('#metric-label-one').textContent(), originalMetric);
    await page.keyboard.press('End');
    await assertTab(page, '#dash-tab-stock', '#dash-panel');
    await page.keyboard.press('Home');
    await assertTab(page, '#dash-tab-general', '#dash-panel');
    await page.keyboard.press('Tab');
    await expect(page.locator('#dash-panel')).toBeFocused();
  });

  await check('Solutions: arrows select connected content; Home/End are supported', async () => {
    const initial = await page.locator('#solution-title').textContent();
    await page.locator('#solution-tab-sales').focus();
    await page.keyboard.press('ArrowRight');
    await assertTab(page, '#solution-tab-stock', '#solution-panel');
    assert.notEqual(await page.locator('#solution-title').textContent(), initial);
    await expect(page.locator('#solution-list')).toContainText(/estoque|inventário/i);
    await page.keyboard.press('End');
    await assertTab(page, '#solution-tab-tax', '#solution-panel');
    await page.keyboard.press('Home');
    await assertTab(page, '#solution-tab-sales', '#solution-panel');
  });

  await check('Segments: vertical keyboard interaction updates title and tags', async () => {
    const original = await page.locator('#segment-title').textContent();
    await page.locator('#segment-tab-retail').focus();
    await page.keyboard.press('ArrowDown');
    await assertTab(page, '#segment-tab-distribution', '#segment-panel');
    assert.notEqual(await page.locator('#segment-title').textContent(), original);
    await page.keyboard.press('End');
    await assertTab(page, '#segment-tab-industry', '#segment-panel');
    await page.keyboard.press('Home');
    await assertTab(page, '#segment-tab-retail', '#segment-panel');
  });

  await check('FAQ: native keyboard expansion preserves implementation conditions', async () => {
    const detail = page.locator('.faq-list details').filter({ has: page.getByText('Como funciona a implantação?', { exact: true }) });
    const summary = detail.locator('summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(detail).toHaveAttribute('open', '');
    await expect(detail.locator('p')).toBeVisible();
    await expect(detail.locator('p')).toContainText('60 dias');
    await page.keyboard.press('Enter');
    await expect(detail).not.toHaveAttribute('open');
  });

  await check('Dialog: accessible label, focus trap, Escape and opener restoration', async () => {
    const opener = page.locator('.hero [data-demo]');
    await opener.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-labelledby', 'demo-title');
    for (let index = 0; index < 10; index++) {
      await page.keyboard.press('Tab');
      assert.ok(await page.evaluate(() => document.querySelector('#demo-dialog').contains(document.activeElement)), 'Focus escaped the modal');
    }
    await page.locator('.dialog-close').focus();
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('#demo-form button[type="submit"]')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(opener).toBeFocused();
    await opener.click();
    await page.getByRole('button', { name: 'Fechar formulário' }).click();
    await expect(dialog).not.toBeVisible();
    await expect(opener).toBeFocused();
  });

  await check('Contact: validates required fields and prepares WhatsApp without sending', async () => {
    await page.locator('.hero [data-demo]').click();
    const form = page.locator('#demo-form');
    const submit = form.getByRole('button', { name: /Continuar no WhatsApp/ });
    await submit.click();
    assert.equal(await page.evaluate(() => window.__testOpenCalls.length), 0);
    await form.locator('[name="name"]').fill('   ');
    await form.locator('[name="company"]').fill('   ');
    await form.locator('[name="segment"]').selectOption({ label: 'Varejo e comércio' });
    await submit.click();
    assert.equal(await page.evaluate(() => window.__testOpenCalls.length), 0, 'Whitespace-only identity fields should not open WhatsApp');
    await form.locator('[name="name"]').fill('Teste de Qualidade');
    await form.locator('[name="company"]').fill('Empresa Exemplo');
    await form.locator('[name="segment"]').selectOption({ label: 'Varejo e comércio' });
    await form.locator('[name="message"]').fill('Organizar vendas & estoque. Ação de teste, não enviar.');
    await submit.click();
    const calls = await page.evaluate(() => window.__testOpenCalls);
    assert.equal(calls.length, 1);
    const target = new URL(calls[0][0]);
    assert.equal(target.origin, 'https://wa.me');
    assert.equal(target.pathname, '/553330381657');
    const text = target.searchParams.get('text');
    for (const part of ['Teste de Qualidade', 'Empresa Exemplo', 'Varejo e comércio', 'vendas & estoque']) assert.ok(text.includes(part), `Missing form value: ${part}`);
    await expect(page.locator('#whatsapp-fallback')).toHaveAttribute('href', target.href);
    await expect(page.locator('.form-fallback')).toBeVisible();
    await page.locator('.dialog-close').focus();
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('#whatsapp-fallback')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('.dialog-close')).toBeFocused();
    await page.screenshot({ path: new URL('contact-desktop.png', output).pathname });
    await page.keyboard.press('Escape');
  });

  await check('Motion controls: pause state, pointer response and stable paused frame', async () => {
    await page.locator('.command-stage').scrollIntoViewIfNeeded();
    const stage = await page.locator('.command-stage').boundingBox();
    const target = page.locator('.stage-parallax');
    await page.mouse.move(stage.x + stage.width * .2, stage.y + stage.height * .3);
    await page.waitForTimeout(800);
    const left = await target.evaluate(node => getComputedStyle(node).transform);
    await page.mouse.move(stage.x + stage.width * .8, stage.y + stage.height * .7);
    await page.waitForTimeout(800);
    const right = await target.evaluate(node => getComputedStyle(node).transform);
    assert.notEqual(left, right, 'Scene does not respond to desktop pointer movement');
    await page.locator('#motion-toggle').click();
    await expect(page.locator('#motion-toggle')).toHaveAttribute('aria-pressed', 'true');
    const animationStates = await page.locator('.orbit, .floating-chip').evaluateAll(nodes =>
      nodes.flatMap(node => node.getAnimations().filter(animation => animation.playState === 'running').map(animation => animation.effect?.getTiming().duration))
    );
    assert.ok(animationStates.every(duration => Number(duration) <= 1), `Continuous animations still running: ${animationStates}`);
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const pausedBefore = await target.evaluate(node => getComputedStyle(node).transform);
    await page.mouse.move(stage.x + stage.width * .4, stage.y + stage.height * .4);
    await page.waitForTimeout(800);
    const pausedAfter = await target.evaluate(node => getComputedStyle(node).transform);
    assert.equal(pausedAfter, pausedBefore, 'Scene keeps tilting after the user paused animation');
    await page.locator('#motion-toggle').click();
    await expect(page.locator('#motion-toggle')).toHaveAttribute('aria-pressed', 'false');
  });

  await check('Desktop screenshot: page fully revealed, no broken imagery', async () => {
    await revealPage(page);
    const brokenImages = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || !image.naturalWidth).map(image => image.src));
    assert.deepEqual(brokenImages, []);
    await page.screenshot({ path: new URL('desktop-1440.png', output).pathname, fullPage: true });
    await page.screenshot({ path: new URL('hero-desktop-1440.png', output).pathname });
  });

  await check('Responsive edge widths: 320, 768 and 1024 px remain inside viewport', async () => {
    for (const width of [320, 768, 1024]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.waitForTimeout(150);
      await assertNoHorizontalOverflow(page);
      await expect(page.locator('h1')).toBeVisible();
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
  });

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobile = await visit(mobileContext);
  await check('Mobile 390: menu expands, navigation closes it and page has no overflow', async () => {
    await assertNoHorizontalOverflow(mobile);
    const toggle = mobile.locator('.menu-toggle');
    await expect(toggle).toBeVisible();
    const tabSizes = await mobile.locator('.dash-tabs button').evaluateAll(buttons => buttons.map(button => button.getBoundingClientRect().height));
    assert.ok(tabSizes.every(height => height >= 44), `Mobile dashboard touch targets are too short: ${tabSizes}`);
    await expect(mobile.locator('#mobile-nav')).not.toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(mobile.locator('#mobile-nav')).toBeVisible();
    await mobile.locator('#mobile-nav a[href="#segmentos"]').click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(mobile.locator('#mobile-nav')).not.toBeVisible();
    await expect(mobile.locator('#segmentos')).toBeInViewport();
    await mobile.locator('#segment-tab-service').click();
    await expect(mobile.locator('#segment-tab-service')).toHaveAttribute('aria-selected', 'true');
    await assertNoHorizontalOverflow(mobile);
  });

  await check('Mobile 390: dialog remains within viewport and closes', async () => {
    await mobile.locator('.hero [data-demo]').click();
    const box = await mobile.locator('#demo-dialog').boundingBox();
    assert.ok(box && box.x >= 0 && box.x + box.width <= 391, `Dialog overflow: ${JSON.stringify(box)}`);
    await mobile.screenshot({ path: new URL('contact-mobile-390.png', output).pathname });
    await mobile.getByRole('button', { name: 'Fechar formulário' }).click();
    await expect(mobile.getByRole('dialog')).not.toBeVisible();
  });

  await check('Mobile screenshots: full page and hero', async () => {
    await revealPage(mobile);
    await mobile.screenshot({ path: new URL('mobile-390.png', output).pathname, fullPage: true });
    await mobile.screenshot({ path: new URL('hero-mobile-390.png', output).pathname });
  });

  const reducedContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const reduced = await visit(reducedContext);
  await check('Reduced motion: preferences are respected and mouse does not tilt the scene', async () => {
    assert.ok(await reduced.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches));
    const target = reduced.locator('.stage-parallax');
    const before = await target.evaluate(node => getComputedStyle(node).transform);
    await reduced.mouse.move(1000, 280);
    await reduced.mouse.move(1300, 520);
    await reduced.waitForTimeout(500);
    const after = await target.evaluate(node => getComputedStyle(node).transform);
    assert.equal(after, before, 'Scene responds to pointer despite reduced motion');
    const continuous = await reduced.evaluate(() => document.getAnimations().filter(animation => {
      const timing = animation.effect?.getComputedTiming();
      return animation.playState === 'running' && timing?.iterations === Infinity && Number(timing.duration) > 1;
    }).length);
    assert.equal(continuous, 0, 'Continuous animation is active despite reduced motion');
    await expect(reduced.locator('h1')).toBeVisible();
    await reduced.screenshot({ path: new URL('reduced-motion-desktop.png', output).pathname });
  });

  await check('Browser runtime: no application exceptions or failed local resources', async () => {
    assert.deepEqual(runtimeErrors, []);
    assert.deepEqual(failedLocalResources, []);
  });
} finally {
  await browser.close();
  await writeFile(new URL('test-results.json', output), JSON.stringify({ baseURL, checkedAt: new Date().toISOString(), results }, null, 2));
}

const failed = results.filter(result => result.status === 'failed');
console.log(`\n${results.length - failed.length}/${results.length} checks passed. Artifacts: ${output.pathname}`);
if (failed.length) process.exitCode = 1;
