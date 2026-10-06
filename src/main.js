const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
let motionPaused = reducedMotion.matches;
const motionButton = $('#motion-toggle');
let savedMotion;
try { savedMotion = localStorage.getItem('eagle-motion'); } catch { /* Storage is optional. */ }
if (savedMotion === 'paused') motionPaused = true;

function setMotion(paused, persist = false) {
  motionPaused = paused || reducedMotion.matches;
  document.body.classList.toggle('motion-paused', motionPaused);
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.firstChild.textContent = motionPaused ? 'Ativar animações ' : 'Pausar animações ';
  if (persist) {
    try { localStorage.setItem('eagle-motion', motionPaused ? 'paused' : 'enabled'); } catch { /* No persistent state required. */ }
  }
  if (motionPaused) resetPerspective();
}
motionButton.addEventListener('click', () => setMotion(!motionPaused, true));
reducedMotion.addEventListener('change', () => {
  let preference;
  try { preference = localStorage.getItem('eagle-motion'); } catch { /* No storage. */ }
  setMotion(reducedMotion.matches || preference === 'paused');
});

// The document is visible without JavaScript. Only enhance after the observer exists.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: .08, rootMargin: '0px 0px -18px 0px' });
  $$('.reveal').forEach(element => observer.observe(element));
  document.documentElement.classList.add('js-motion');
}
$$('svg.icon').forEach(icon => icon.setAttribute('aria-hidden', 'true'));
$('#year').textContent = new Date().getFullYear();

const solutions = {
  sales: {
    tag: 'DO BALCÃO AO RESULTADO', title: 'A venda acontece.<br>A gestão acompanha.',
    description: 'Organize pedidos, acompanhe suas vendas e conecte o atendimento à operação. Mais fluidez para a sua equipe. Mais visibilidade para você.',
    items: ['Vendas e frente de caixa integrados', 'Pedidos organizados em um só lugar', 'Emissão de documentos fiscais']
  },
  stock: {
    tag: 'CADA PRODUTO NO SEU RADAR', title: 'O que tem. O que sai.<br>O que precisa de atenção.',
    description: 'Acompanhe entradas, saídas e custos para entender o movimento dos produtos. Decida as próximas compras com informação à vista.',
    items: ['Controle de entradas e saídas', 'Visibilidade sobre os custos dos produtos', 'Estoque conectado à operação de vendas']
  },
  finance: {
    tag: 'CLAREZA SOBRE O SEU DINHEIRO', title: 'O caixa conta uma história.<br>Enxergue cada capítulo.',
    description: 'Reúna o que entra, o que sai e o que está por vir. Contas organizadas ajudam você a planejar os compromissos e o próximo passo da empresa.',
    items: ['Contas a pagar e a receber', 'Acompanhamento do fluxo de caixa', 'Conciliação bancária']
  },
  tax: {
    tag: 'O FISCAL FAZ PARTE DO FLUXO', title: 'Da venda ao documento.<br>Tudo mais conectado.',
    description: 'Conecte a emissão de documentos fiscais à rotina da empresa. A equipe orienta a configuração dos recursos para a sua operação.',
    items: ['Emissão de NF-e e NFC-e', 'Recursos para CT-e e MDF-e', 'SPED e Sintegra, conforme o módulo contratado']
  }
};
const segments = {
  retail: { number: '01', eyebrow: 'CADA VENDA CONTA', title: 'O balcão flui.<br>Você vê o todo.', description: 'Atenda o cliente, acompanhe o giro dos produtos e mantenha vendas, caixa e estoque na mesma página.', tags: ['Varejo', 'Mercadinhos', 'Autopeças', 'Madeireiras'], form: 'Varejo e comércio' },
  distribution: { number: '02', eyebrow: 'DO PEDIDO À VISÃO DO NEGÓCIO', title: 'Sua equipe na rua.<br>Sua operação conectada.', description: 'Organize pedidos, acompanhe o estoque e dê à equipe externa recursos para vender. O Força de Vendas conecta a rotina comercial ao Eagle Gestão.', tags: ['Distribuidoras', 'Atacados', 'Vendas externas'], form: 'Distribuidora e atacado' },
  service: { number: '03', eyebrow: 'CADA SERVIÇO, MAIS ORGANIZADO', title: 'Mais clareza na oficina.<br>Mais controle na rotina.', description: 'Acompanhe ordens de serviço, produtos utilizados e informações financeiras. Tenha uma visão dos atendimentos e da operação.', tags: ['Oficinas mecânicas', 'Prestadores de serviços'], form: 'Serviços e oficina' },
  industry: { number: '04', eyebrow: 'DA PRODUÇÃO AO RESULTADO', title: 'Produção, estoque e vendas.<br>Na mesma direção.', description: 'Conecte o controle da produção ao estoque e às vendas. Informações reunidas para acompanhar o que a fábrica precisa no dia a dia.', tags: ['Pequenas fábricas', 'Controle de produção'], form: 'Pequena fábrica' }
};
let currentSegment = '';
function animatePanel(panel) {
  if (motionPaused) return;
  panel.classList.remove('panel-transition');
  // Reset the short entrance only after an intentional tab action.
  requestAnimationFrame(() => panel.classList.add('panel-transition'));
}
function setupTabs(tablist, onSelect) {
  const tabs = $$('[role="tab"]', tablist);
  const select = (tab, focus = false) => {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    panel.setAttribute('aria-labelledby', tab.id);
    if (focus) tab.focus();
    onSelect(tab, panel);
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (index + 1) % tabs.length;
      if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); select(tabs[next], true); }
    });
  });
}
setupTabs($('.solution-tabs'), (tab, panel) => {
  const key = tab.dataset.solution;
  const data = solutions[key];
  $('#solution-tag').textContent = data.tag;
  $('#solution-title').innerHTML = data.title;
  $('#solution-description').textContent = data.description;
  $('#solution-list').replaceChildren(...data.items.map(item => { const li = document.createElement('li'); li.textContent = item; return li; }));
  $$('[data-flow-node]').forEach(node => node.classList.toggle('active', node.dataset.flowNode === key));
  animatePanel($('.solution-copy', panel));
});
$('[data-flow-node="sales"]').classList.add('active');
setupTabs($('.segment-options'), (tab, panel) => {
  const data = segments[tab.dataset.segment];
  currentSegment = data.form;
  $('.segment-number', panel).textContent = data.number;
  $('#segment-eyebrow').textContent = data.eyebrow;
  $('#segment-title').innerHTML = data.title;
  $('#segment-description').textContent = data.description;
  $('#segment-tags').replaceChildren(...data.tags.map(text => { const span = document.createElement('span'); span.textContent = text; return span; }));
  animatePanel(panel);
});
const dashData = {
  general: ['Vendas do mês', 'R$ 48.250<span>,00</span>', 'Visibilidade para decidir', 'Pedidos realizados', '128', 'Do pedido ao resultado', 'Sua operação em perspectiva', 'Vendas', 'M0 121C30 121 28 90 60 96S95 127 125 87 160 103 193 68 215 95 250 57 288 75 320 34 358 52 387 26 414 30 440 8', ['60 mil', '40 mil', '20 mil']],
  finance: ['Saldo ilustrativo', 'R$ 24.800<span>,00</span>', 'Entradas e saídas à vista', 'A receber', 'R$ 16.400', 'Próximos compromissos', 'O movimento do seu caixa', 'Caixa', 'M0 105C30 100 34 48 66 62S98 45 132 80 169 72 199 42 233 71 267 58 296 88 326 57 361 78 394 39 418 57 440 28', ['30 mil', '20 mil', '10 mil']],
  stock: ['Produtos cadastrados', '342', 'Cada item sob controle', 'Itens para repor', '12', 'Atenção ao próximo pedido', 'Enxergue o giro dos produtos', 'Saídas', 'M0 110C30 115 35 91 68 96S101 61 132 80 167 72 199 91 232 39 265 54 297 20 330 40 367 15 392 43 417 25 440 33', ['150 un.', '100 un.', '50 un.']]
};
setupTabs($('.dash-tabs'), (tab, panel) => {
  const data = dashData[tab.dataset.dash];
  $('#metric-label-one').textContent = data[0]; $('#metric-one').innerHTML = data[1]; $('#metric-foot-one').textContent = data[2];
  $('#metric-label-two').textContent = data[3]; $('#metric-two').textContent = data[4]; $('#metric-foot-two').textContent = data[5];
  $('#chart-title').textContent = data[6]; $('#chart-key-label').textContent = data[7];
  $('#chart-line').setAttribute('d', data[8]); $('#chart-area').setAttribute('d', `${data[8]}V150H0Z`);
  const endY = tab.dataset.dash === 'general' ? 8 : tab.dataset.dash === 'finance' ? 28 : 33;
  $('.chart-point').setAttribute('cy', String(endY));
  $$('.chart-labels span').forEach((label, i) => label.textContent = data[9][i]);
  $('.chart').setAttribute('aria-label', `Gráfico de ${data[7].toLowerCase()} com valores de demonstração`);
  $('.chart-svg').setAttribute('aria-label', `Exemplo ilustrativo de ${data[7].toLowerCase()}, sem representar resultados reais`);
  animatePanel(panel);
});

const hero = $('.hero');
const stage = $('.command-stage');
let pointerFrame = 0;
let pointerX = 0;
let pointerY = 0;
function resetPerspective() {
  if (pointerFrame) cancelAnimationFrame(pointerFrame);
  pointerFrame = 0;
  stage.style.removeProperty('--stage-rx'); stage.style.removeProperty('--stage-ry');
  hero.style.removeProperty('--glow-x'); hero.style.removeProperty('--glow-y');
  $('.mobile-visual').style.removeProperty('--mobile-x'); $('.mobile-visual').style.removeProperty('--mobile-y');
}
hero.addEventListener('pointermove', event => {
  if (motionPaused || !finePointer.matches || document.hidden) return;
  const bounds = hero.getBoundingClientRect();
  pointerX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
  pointerY = (event.clientY - bounds.top) / bounds.height * 2 - 1;
  if (pointerFrame) return;
  pointerFrame = requestAnimationFrame(() => {
    stage.style.setProperty('--stage-rx', `${-pointerY * 4}deg`);
    stage.style.setProperty('--stage-ry', `${pointerX * 5}deg`);
    hero.style.setProperty('--glow-x', `${pointerX * 12}px`);
    hero.style.setProperty('--glow-y', `${pointerY * 12}px`);
    pointerFrame = 0;
  });
}, { passive: true });
hero.addEventListener('pointerleave', resetPerspective);
const mobileVisual = $('.mobile-visual');
mobileVisual.addEventListener('pointermove', event => {
  if (motionPaused || !finePointer.matches) return;
  const bounds = mobileVisual.getBoundingClientRect();
  mobileVisual.style.setProperty('--mobile-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 14}px`);
  mobileVisual.style.setProperty('--mobile-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 10}px`);
}, { passive: true });
mobileVisual.addEventListener('pointerleave', () => { mobileVisual.style.removeProperty('--mobile-x'); mobileVisual.style.removeProperty('--mobile-y'); });
document.addEventListener('visibilitychange', () => {
  document.documentElement.classList.toggle('page-inactive', document.hidden);
  if (document.hidden) resetPerspective();
});
setMotion(motionPaused);

const menuToggle = $('.menu-toggle');
const mobileMenu = $('#mobile-nav');
function closeMenu() { mobileMenu.hidden = true; menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Abrir menu'); }
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  mobileMenu.hidden = !open;
});
$$('a', mobileMenu).forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileMenu.hidden) { closeMenu(); menuToggle.focus(); } });
matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const dialog = $('#demo-dialog');
const form = $('#demo-form');
let dialogTrigger;
$$('[data-demo]').forEach(button => button.addEventListener('click', () => {
  dialogTrigger = button;
  closeMenu();
  if (button.closest('#segmentos')) form.elements.segment.value = currentSegment || segments.retail.form;
  $('.form-fallback').hidden = true;
  dialog.showModal();
  document.body.classList.add('dialog-open');
  form.elements.name.focus({ preventScroll: true });
}));
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const items = $$('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]', dialog).filter(element => element.getClientRects().length > 0);
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); dialogTrigger?.focus({ preventScroll: true }); });
[form.elements.name, form.elements.company].forEach(field => field.addEventListener('input', () => field.setCustomValidity('')));
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const name = String(values.get('name') || '').trim();
  const company = String(values.get('company') || '').trim();
  if (!name || !company) { const field = name ? form.elements.company : form.elements.name; field.setCustomValidity('Preencha este campo com um nome válido.'); field.reportValidity(); return; }
  const segment = String(values.get('segment') || '');
  const message = String(values.get('message') || '').trim();
  const text = `Olá, equipe Eagle! Quero conhecer o Eagle Gestão.\n\nNome: ${name}\nEmpresa: ${company}\nSegmento: ${segment}${message ? `\nMinha prioridade: ${message}` : ''}\n\nGostaria de agendar uma demonstração gratuita.`;
  const url = `https://wa.me/553330381657?text=${encodeURIComponent(text)}`;
  $('#whatsapp-fallback').href = url;
  $('.form-fallback').hidden = false;
  window.open(url, '_blank', 'noopener,noreferrer');
});
