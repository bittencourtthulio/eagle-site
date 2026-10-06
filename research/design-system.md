# Eagle — direção visual e sistema de interface

Revisão de design em 6 de outubro de 2026. Base: `site-audit.md`, `positioning.md`, `copy.md` e estrutura de `index.html`. A marca original foi auditada pelo especialista responsável; a aplicação abaixo é uma proposta de redesign, não um manual oficial existente.

## Ideia que organiza o desenho

**O dono vê a operação e escolhe o próximo movimento.** O site deve tornar concreta a palavra **comando** com uma interface que responde ao usuário. O painel tem perspectiva; os módulos se conectam; a seleção altera o contexto. O texto e os botões permanecem firmes para que a experiência transmita domínio, em vez de esforço para acompanhar a tela.

A direção é um painel de operação com tratamento editorial: títulos grandes, hierarquia clara, instrumentos visuais contidos e alternância de superfícies claras e navy. O contraste entre um hero dramático e o restante legível representa tecnologia sofisticada próxima de quem administra uma pequena empresa.

### Confronto de alternativas

| Alternativa | Vantagem | Limite para Eagle | Decisão |
| --- | --- | --- | --- |
| Hero com fotografia de empresário | Identificação imediata | Foto genérica enfraquece a ideia de produto; não existe foto confirmada da equipe | Não liderar com banco de imagem ou pessoa fictícia |
| Águia 3D voando em tela cheia | Impacto rápido ligado ao nome | Literal, decorativo, pouco explica ERP e aumenta custo visual | Preservar águia na marca e usar amplitude/perspectiva como metáfora |
| Radar, mira e HUD tático | Expressa comando | Pode sugerir vigilância, guerra e complexidade | Usar apenas grades/orbitais discretos; evitar alvo, alerta vermelho e texto de missão |
| Dashboard genérico com estatísticas de crescimento | Comunica categoria | Pode parecer screenshot real ou promessa de resultado | Painel HTML interativo com legenda de demonstração visível |
| Operação conectada sob controle do cursor | Reforça o benefício e os módulos existentes | Precisa de alternativa para toque/teclado | Rota adotada |

## Tokens de referência

Azul `#133A91` e laranja `#FFA608` foram encontrados no CSS oficial. Os demais são extensões propostas para hierarquia e contraste.

| Token semântico | Valor | Aplicação |
| --- | --- | --- |
| `brand-blue` | `#133A91` | Identidade, realces e links em superfícies claras |
| `brand-orange` | `#FFA608` | Ação primária e pontos focais |
| `navy` | `#081B33` | Hero, footer, painéis escuros |
| `ink` | `#152C46` | Texto em áreas claras |
| `text-muted-light` | `#586575` | Texto secundário em branco ou mist |
| `text-muted-dark` | `#91A7C3` | Texto secundário no navy |
| `mist` | `#F4F7FB` | Superfície de descanso |
| `white` | `#FFFFFF` | Texto no navy e superfícies principais |
| `border-light` | `#CBD5E1` | Separadores claros sem depender deles para indicar seleção |

Contrastes calculados por luminância sRGB relativa: navy sobre laranja **8,82:1**; branco sobre azul institucional **10,29:1**; cinza azulado `#91A7C3` sobre navy **7,01:1**; secundário `#586575` sobre branco **5,94:1**; sobre mist **5,53:1**. Branco sobre laranja tem apenas **1,96:1**: botões laranja devem usar texto navy.

Esses valores são referências de cor sólida. Transparências, blur e sobreposições precisam ser inspecionados no contexto final; a tabela não declara conformidade de toda a página.

### Tipografia

- **Manrope** para títulos e números: desenho geométrico de gestão contemporânea, com peso 750–800 e tracking contido nos títulos grandes.
- **DM Sans** para texto e controles: peso 400–600, sem competir com os títulos.
- Desktop: H1 dominante em aproximadamente 88–112 px conforme espaço real; subtítulos de seção em 42–56 px. Mobile: H1 em 54–64 px e títulos de seção em 32–38 px.
- Conteúdo corrido entre 16 e 18 px, line-height entre 1,5 e 1,7. Legendas do mockup podem ser menores, mas a identificação de demonstração deve permanecer legível.
- O foco está na palavra “comando”; o ponto laranja fecha a promessa. Não fragmentar letras individualmente nem aplicar glitch na frase principal.

### Espaço, forma e densidade

Grade baseada em 8 px, com espaçamentos de 16/24/32/48/64/96 px. Container máximo de aproximadamente 1280 px; margens laterais fluidas. Borda de 12–20 px nos painéis; forma mais firme nos botões. Poucos cards grandes têm maior poder explicativo que muitos cards pequenos equivalentes.

O hero pode ultrapassar uma dobra quando necessário, mas a promessa e o CTA precisam aparecer primeiro. No mobile, painel e chips reorganizam-se abaixo da mensagem, sem transformar o dashboard em imagem indecifrável ou provocar rolagem horizontal. Não reduzir o corpo do texto para caber em uma composição de desktop.

## Motion com função

| Elemento | Comportamento | Parâmetro recomendado | Motivo |
| --- | --- | --- | --- |
| Entrada do hero | Opacidade + deslocamento vertical curto | 600–900 ms; stagger 70–100 ms | Apresentar promessa, CTA e contexto em ordem |
| H1 e CTA | Permanecem estáveis após entrada | Sem magnetismo ou perseguição do cursor | Leitura e ação previsíveis |
| Painel principal | Perspectiva acompanha cursor | Tilt máximo 5°; deslocamento até 14 px | Usuário muda o ponto de vista sobre a operação |
| Chips do painel | Camadas com pequena diferença de profundidade | Até 1,4× a amplitude do painel | Explicar proximidade entre módulos |
| Luz do hero | Centro acompanha cursor suavemente | Baixa opacidade, sem cobrir texto | Sensação de exploração |
| Diagrama de conexão | Nó escolhido e suas ligações ganham destaque | 200–350 ms; conexão legível sem animação | Explicitar integração e causa/efeito |
| Tabs e estados de seleção | Cor + borda + conteúdo | 150–250 ms | Mudança de contexto inteligível |
| Seções | Entrada única ao aparecer | 500–700 ms; translate <= 24 px | Ritmo sem reaparecer a cada rolagem |
| Orbitais decorativos | Movimento lento e discreto | 25–45 s; poucos elementos | Profundidade periférica |

Evitar cursor personalizado que substitui o nativo, scroll hijacking, parallax do texto, conteúdo necessário revelado apenas em hover e ações que dependam de acertar um alvo em movimento.

### Contrato técnico de movimento

1. Pointer effects somente em `pointer: fine` e `hover: hover`; usar `requestAnimationFrame` para agrupar atualizações. O toque explora os mesmos módulos por botões.
2. Preferir `transform` e `opacity`; não animar dimensões de layout por frame. Calcular coordenadas relativas ao visual e aplicar limite.
3. Resetar perspectiva no `pointerleave`. Não manter um loop JavaScript quando o valor já chegou ao destino ou o visual está fora da viewport.
4. `prefers-reduced-motion: reduce` elimina movimento contínuo e parallax. A informação, os estados e os controles continuam visíveis.
5. “Pausar animações” deve interromper tanto keyframes CSS quanto atualizações JavaScript. Persistir preferência local é útil; não é necessário coletar dados pessoais.
6. No estado pausado/reduzido, conectar áreas com linhas estáticas. A promessa de integração deve continuar evidente.

## Acessibilidade e confiança

- Todo item selecionável é um botão; os grupos de tabs usam `aria-selected`, roving tabindex e navegação de teclado coerente com sua orientação.
- Foco visível com contraste, incluindo sobre botões laranja. Alvos de toque com pelo menos 44 px de dimensão útil.
- Dialog de demonstração mantém foco, fecha com Escape e devolve o foco ao disparador. O envio abre mensagem revisável no WhatsApp; não simula uma conversão concluída.
- A legenda “Visualização ilustrativa” e “Dados de demonstração” acompanha os gráficos inventados. A imagem real do Analytics permanece identificada como interface do aplicativo.
- Ícones decorativos e linhas não acrescentam ruído ao leitor de tela. Cor não é a única indicação de módulo selecionado.
- Contatos diretos continuam acessíveis sem abrir modal. URLs oficiais corretas devem existir no HTML, mesmo quando houver JavaScript que organiza os destinos.

## Decisões de revisão com a equipe

A proposta foi confrontada com o documento de posicionamento: “comando” precisa ter uma tradução ativa, mas humana. A prova de atendimento fica próxima do hero para equilibrar o painel sofisticado. O texto real do produto e os segmentos ajudam um pequeno empresário a reconhecer sua rotina.

O responsável por qualidade confirmou revisão independente de navegação por teclado, dialog, fluxo WhatsApp, overflow em 390 px, preferência de movimento reduzido e pausa manual. A inspeção estética deve usar screenshots desktop/mobile e observar particularmente: H1 sem corte, alinhamento de marca, chips sem colisão, legenda do painel legível e CTA acima do excesso decorativo.

Skill de interface consultada: `/Users/thuliobittencourt/.agents/skills/frontend-design/SKILL.md`. A entrada HyperFrames foi consultada para delimitar o formato: a entrega solicitada é um site interativo, não um filme ou composição de vídeo; a implementação permanece em HTML/CSS/JavaScript.
