# Eagle — revisão factual, acessibilidade e qualidade

Revisão em 6 de outubro de 2026. Este relatório compara a implementação com `site-audit.md`, `positioning.md` e `copy.md`; a auditoria funcional não verifica o ERP proprietário.

## Conteúdo e destinos

- A ideia dominante de **comando** está presente no hero, na integração visual e na chamada final. Não há alegação de liderança ou exclusividade.
- Os recursos descritos — vendas, estoque, financeiro, fiscal, Analytics e Força de Vendas — correspondem à documentação pública registrada na pesquisa.
- A interface conceitual deixa explícitos “visualização ilustrativa” e “dados de demonstração”. Não atribui números simulados a clientes.
- A imagem de Analytics é o asset oficial e é identificada como interface do aplicativo, evitando confundir a composição ilustrativa com uma captura real do ERP.
- O FAQ conserva as condições relevantes: instalação local, possibilidade online, implantação de aproximadamente 60 dias e atendimento de segunda a sexta, das 8h às 18h.
- Telefone, WhatsApp, email, endereço e portal da revenda correspondem aos contatos pesquisados. Portal da revenda não foi renomeado para área do cliente.
- A geração de mensagem explica que o visitante ainda deverá revisar e enviar no WhatsApp. Não existe promessa de envio a CRM ou confirmação fictícia de agendamento.
- A linguagem emocional funciona como roteiro criativo; a página não anuncia cérebro trino como evidência científica nem promete conversão garantida.

### Correções comunicadas durante a implementação

1. Corrigir URLs estáticas de Força de Vendas, Recorrência e Fidelidade para incluir `/sistema-de-gestao/`.
2. Corrigir a página institucional para `/sobre-a-eagle-tecnologia/`.
3. Garantir `tabindex="0"` no painel ilustrativo sem outro controle focalizável; manter setas, Home e End em todas as interfaces de tabs.
4. Tratar os ícones decorativos como ocultos para leitores de tela, evitando ruído nos nomes dos controles.

## Discussão entre especialistas

A revisão visual e a revisão de qualidade concordaram que a interação com mouse deve reforçar perspectiva e domínio da operação, preservando leitura e compreensão no toque. Movimento não deve ser condição para acessar conteúdo. Acessibilidade foi incorporada à experiência: preferência por movimento reduzido, controle de pausa, navegação por teclado e diálogo nativo com restauração de foco.

## Verificação reproduzível

Executar o servidor com `npm run dev` e, em outro terminal, `npm test`. O endereço padrão é `http://localhost:5173`; `SITE_URL` permite um destino local alternativo.

O arquivo `tests/site-check.mjs` cobre semântica, destinos, âncoras, ausência de IDs duplicados, overflow em 320, 390, 768, 1024 e 1440 px, tabs por teclado, segmentos, FAQ, diálogo e foco, validação do formulário, mensagem de WhatsApp interceptada sem envio, menu móvel, imagens, erros de runtime, pausa e preferência por movimento reduzido.

Artefatos são gravados em `artifacts/`, incluindo relatório JSON, capturas completas de desktop/mobile, heroes, diálogo e preferência por movimento reduzido. As capturas complementam os testes de comportamento e precisam ser inspecionadas visualmente.

## Resultado final

**15 de 15 verificações aprovadas** em Chromium/Playwright, na rodada final de 6 de outubro de 2026 às 18h50 (horário local). `artifacts/test-results.json` registra cada resultado. As capturas foram produzidas após as últimas alterações de HTML e CSS.

- Sem overflow horizontal nas cinco larguras verificadas.
- Interação real do mouse modifica a perspectiva; pausar as animações ou ativar movimento reduzido mantém a cena estável.
- Setas, Home, End e Tab funcionam nos painéis; o diálogo mantém foco também em Shift+Tab e inclui o link de fallback quando ele aparece.
- O formulário rejeita campos vazios ou preenchidos apenas com espaços. A mensagem preserva acentos e caracteres especiais. A abertura do WhatsApp foi interceptada: nenhuma mensagem foi enviada.
- Tabs do painel mobile possuem pelo menos 44 px de altura.
- URLs oficiais corrigidas; nenhum ID duplicado, imagem quebrada, recurso local em erro ou exceção de JavaScript foi observado.
- Capturas completas e diálogos foram inspecionados pelo especialista visual; o hero mobile final foi reinspecionado após o ajuste tipográfico. Não foram encontrados cortes estruturais.

Uma rodada intermediária teve timeout na captura de movimento reduzido, depois de as verificações funcionais passarem. A captura e toda a rodada final concluíram normalmente, sem alteração funcional exigida por esse episódio.

## Limites

Não foi feito envio de mensagem a terceiros, contratação, acesso ao ERP, medição real de conversão nem pesquisa de associação mental com consumidores. Aprovação funcional da página não comprova desempenho comercial da hipótese de posicionamento.
