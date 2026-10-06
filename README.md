# Eagle Tecnologia — Seu negócio. Sob seu comando.

Redesign institucional em português, baseado em pesquisa do site oficial em 6 de outubro de 2026. Implementação estática com HTML semântico, CSS e JavaScript nativo, construída com Vite.

[Visualizar a versão de revisão](https://eagle-nova-visao.thuliobittencourt.chatgpt.site) — acesso privado ao proprietário no Sites. O código deste repositório é público e pode ser executado localmente.

## Executar

```sh
npm install
npm run dev
```

O servidor local usa a porta 5173. Para produção:

```sh
npm run build
npm run preview
```

A saída independente está em `dist/`. A configuração de hospedagem privada do Sites está em `.openai/hosting.json`.

## Experiência

- Hero com composição de painel, órbitas e perspectiva controlada pelo mouse.
- Abas acessíveis para visualizar exemplos de gestão e explorar os módulos reais.
- Segmentos interativos, aplicativos, implantação e FAQ.
- Formulário que prepara um texto no WhatsApp comercial oficial; o visitante revisa e envia. Nenhum lead é armazenado e nenhum envio é simulado.
- Responsividade, navegação por teclado, diálogo com foco contido e restaurado, movimento reduzido e pausa persistida localmente.
- Metadados e assets oficiais locais. Fontes Manrope e DM Sans carregadas do Google Fonts.

Os valores e o painel do hero são **ilustrativos**, não constituem telas reais nem resultados de clientes. A seção Eagle Analytics usa imagem oficial do produto. O redesign não modifica o software Eagle Gestão.

## Estratégia e fontes

Cinco agentes especializados participaram de pesquisa, confronto e validação. O posicionamento **COMANDO** é uma hipótese estratégica, sustentada pelas capacidades públicas de integração, indicadores móveis e equipe própria. Não foi validado por pesquisa de percepção de clientes.

- [Auditoria de produtos, identidade, contatos e fontes](research/site-audit.md)
- [Al Ries: 10 concorrentes, descarte de 20 candidatos e matriz ICE](research/positioning.md)
- [Arquitetura de mensagens e copy](research/copy.md)
- [Design system e linguagem de movimento](research/design-system.md)
- [Revisão de qualidade](research/quality.md)

A lente de Jürgen Klaric foi usada como heurística de segurança, identificação emocional e prova racional. O modelo de cérebro trino não é apresentado como explicação científica estabelecida.

## Verificação

Com o servidor ativo:

```sh
npm test
```

A suíte Playwright verifica responsividade, teclado, tabs, FAQ, foco do diálogo, WhatsApp interceptado sem envio, parallax, pausa, movimento reduzido, integridade de assets e erros de execução. Screenshots e resultados ficam em `artifacts/` (não versionados). Caso necessário, instale o navegador com `npx playwright install chromium`.

## Limites e continuidade

Os links de módulos complementares, história, conteúdos, política e revenda apontam aos destinos oficiais existentes. A publicação de revisão é privada e separada do domínio oficial. Prazos e disponibilidade comercial devem continuar sendo confirmados pela equipe da Eagle; não foram inventados preços, depoimentos ou métricas de clientes.
