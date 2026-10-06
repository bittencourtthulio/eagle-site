# Auditoria factual — Eagle Tecnologia

Consulta ao site oficial em 6 de outubro de 2026. Fontes são declarações comerciais da própria empresa, não verificação independente de resultados. Cópias temporárias do HTML original ficam em `artifacts/source/`, fora do repositório público. Os links oficiais estão registrados abaixo.

## Decisões prioritárias

- Produto principal: **Eagle Gestão**, ERP para pequenas empresas. Público explicitado: varejo, serviços, pequenas fábricas e distribuidoras.
- Dois complementos com identidade própria: **Eagle Analytics** (indicadores no celular) e **Força de Vendas** (equipe comercial externa).
- Atributo útil ao posicionamento: visão integrada da operação, apoiada por implantação acompanhada e suporte humano. Integração é funcionalidade; “visão” pode organizar a promessa.
- Não inventar depoimentos, logotipos de clientes, resultados percentuais ou rankings.
- Não usar quantidade de clientes: página Sobre fala em dezenas; Sistemas diz milhares; uma imagem da revenda afirma 3.000 usuários. São unidades e afirmações inconsistentes.
- Preservar a marca oficial. Azul e laranja já pertencem ao sistema visual existente.

## Produto, funcionamento e prova disponível

### Eagle Gestão

Integra vendas/PDV, estoque, documentos fiscais e financeiro. Site declara mais de 16 anos de experiência, equipe própria de suporte, atualizações e personalização. Funciona instalado localmente; uso online também é possível. FAQ declara média de **60 dias de implantação**, variando com operação e módulos. Não prometer setup instantâneo, ERP inteiramente online por padrão ou suporte 24 horas.

Fonte: [Home e FAQ oficial](https://eagletecnologia.com/).

### Arquitetura modular

O ERP permite contratar módulos conforme a operação e expandir. Integra WhatsApp para envio de documentos comerciais e comunicação. Há referência a conta digital integrada. A página geral descreve Recorrência como cobrança automática, mas a página especializada descreve lembretes de recompra; usar a descrição especializada e não assumir assinatura/billing SaaS.

Fonte: [Sistemas](https://eagletecnologia.com/sistema-de-gestao/).

### Recursos por módulo

| Módulo | Recursos publicamente descritos | Fonte |
| --- | --- | --- |
| Estoque | Entradas, saídas, inventário, curva ABC e nível mínimo | [Estoque](https://eagletecnologia.com/sistema-de-gestao/sistema-de-estoque/) |
| Financeiro | Contas a pagar/receber, cheques, comissões, conciliação, boletos, fluxo de caixa e DRE gerencial | [Financeiro](https://eagletecnologia.com/sistema-de-gestao/sistema-de-gestao-financeira/) |
| Fiscal | NF-e, NFC-e, CT-e, MDF-e, Sintegra, Sped e Painel do Contador | [Fiscal](https://eagletecnologia.com/sistema-de-gestao/sistema-fiscal/) |
| Vendas | PDV, orçamentos, pré-venda, faturamento; projeção de margem e entrega futura | [Vendas](https://eagletecnologia.com/sistema-de-gestao/sistema-de-vendas/) |
| Recorrência | Datas periódicas ligadas a itens/serviços, próximo contato calculado na venda, filtros e lembretes por WhatsApp | [Recorrência](https://eagletecnologia.com/sistema-de-gestao/modulo-recorrencia/) |
| Fidelidade | Regras de pontos, resgate, atualização via PDV, ajustes manuais e mensagens sobre saldo/benefícios | [Fidelidade](https://eagletecnologia.com/sistema-de-gestao/modulo-fidelidade/) |

### Eagle Analytics

Aplicativo Android/iOS conectado ao ERP. Mostra vendas, financeiro e estoque; inclui inadimplência, produtos mais vendidos, ticket médio, horários de pico, contas a pagar/receber e clientes principais. Esta é a evidência mais direta para uma narrativa visual de “enxergar a empresa”. Página menciona e-commerce, marketplaces e B2B, sem detalhar condições técnicas/contratuais de cada integração.

Fonte: [Sistema de Indicadores](https://eagletecnologia.com/sistema-de-gestao/sistema-de-indicadores/).

### Força de Vendas

Aplicativo Android/iOS integrado ao ERP. Permite pedidos sem internet, sincronizados quando a conexão retorna. Consulta estoque/ficha financeira e registra visitas. Recursos: rotas, metas, painel do gerente, comissões, saldo flex e cálculo de IPI/ICMS-ST. Não generalizar a capacidade offline deste app para todos os módulos.

Fonte: [Força de Vendas](https://eagletecnologia.com/sistema-de-gestao/sistema-de-forca-de-venda/).

### Empresa e distribuição

Sobre declara tecnologia própria, atendimento humano, rede de revendedores e presença em mais de 13 estados. A proximidade regional é apresentada como vantagem dessa rede. A página não fornece estudos de caso mensuráveis nem identificação de clientes que autorize criar testemunhos. Não foi localizada foto de equipe/escritório entre as imagens do Sobre: são marca e montagens de produto/revenda.

Fonte: [Sobre a Eagle](https://eagletecnologia.com/sobre-a-eagle-tecnologia/).

## Contatos e destinos preserváveis

Dados extraídos de [Contato oficial](https://eagletecnologia.com/contato/) e HTML da home. Email é ofuscado pelo Cloudflare no HTML, decodificado diretamente do atributo `data-cfemail`.

| Canal | Destino |
| --- | --- |
| Comercial / WhatsApp | `(33) 3038-1657` / `https://wa.me/553330381657` |
| Telefone clicável | `tel:+553330381657` |
| Email | `gestao@eagletecnologia.com` / `mailto:gestao@eagletecnologia.com` |
| Endereço | R. Wantuil Caldeira, 190 — Expansão, Guanhães — MG |
| Horário | Segunda a sexta, 8h às 18h |
| Instagram | `https://www.instagram.com/eagletecnologia/` |
| Facebook | `https://www.facebook.com/EagleTecnologia` |
| LinkedIn | `https://www.linkedin.com/company/eagle-tecnologia` |
| YouTube | `https://www.youtube.com/channel/UClGZb43yBQpiPN4bv2GLVeA` |
| Revenda | `https://revendadesoftware.com.br/` |
| Portal da Revenda | `https://portal.revendadesoftware.com.br/` |
| Indique e Ganhe | `https://conteudo.eagletecnologia.com/promocao-indique-e-ganhe` |
| Política de privacidade | `https://eagletecnologia.com/politica-de-privacidade/` |

O portal encontrado é explicitamente **da revenda**; não renomear como “Área do cliente”. O principal CTA original abre WhatsApp com pedido de demonstração gratuita. O formulário original usa nome, telefone, email e mensagem; uma nova implementação sem backend deve encaminhar de modo honesto para WhatsApp, sem simular envio a um CRM.

## Segmentos e navegação

URLs reais no menu oficial:

- [Autopeças](https://eagletecnologia.com/segmentos/auto-pecas/)
- [Distribuidora](https://eagletecnologia.com/segmentos/distribuidora/)
- [Madeireira](https://eagletecnologia.com/segmentos/madeireira/)
- [Mercadinho](https://eagletecnologia.com/segmentos/mercadinho/)
- [Oficina mecânica](https://eagletecnologia.com/segmentos/oficina-mecanica/)
- [Pequenas fábricas](https://eagletecnologia.com/segmentos/pequenas-fabricas/)
- [Varejo](https://eagletecnologia.com/segmentos/varejo/)

Problema encontrado: o “Saiba mais” de Serviços na home aponta para `/segmentos/madereira/` (grafia diferente e categoria errada). Evitar carregar esse erro para o redesign; usar serviços como categoria editorial ou direcionar para oficina mecânica com rótulo correto.

## Identidade visual observada

Extração do CSS presente no HTML oficial, não paleta inventada:

| Papel | Valores recorrentes |
| --- | --- |
| Laranja da marca | `#FFA608`, `#FFA300`, `#FFB531` |
| Azul institucional | `#425D99`, `#133A91`, `#486AA8` |
| Texto escuro | `#263240`, preto |
| Superfícies | branco, `#F1F1F1`, `#FAFAFA` |
| Famílias atuais | Nunito, Open Sans e Montserrat; Roboto em bases Elementor |

Marca usa emblema circular com cabeça de águia e wordmark EAGLE. Laranja é a âncora visual mais distintiva. O site atual usa blocos claros, azuis, ícones e montagens de dispositivos com telas. Fontes demais e alternâncias pouco hierárquicas diluem o sistema. Direção recomendada: consolidar tipografia em uma família para conteúdo e uma para títulos, manter laranja para ação, aprofundar o azul para confiança e dar protagonismo à visualização da operação.

## Assets oficiais baixados

Todos preservados sem edição em `public/assets/`. Origem comum: `https://eagletecnologia.com/wp-content/uploads/2026/02/`.

| Arquivo local | Arquivo de origem | Uso/observação |
| --- | --- | --- |
| `eagle-logo-official.webp` | `imgi_1_logoprincipal.webp` | Logo laranja, 250 × 83 |
| `eagle-logo-footer-official.webp` | `imgi_1_logoprincipal-e1762884284953.webp` | Variante rodapé, 224 × 83 |
| `eagle-logo-white-official.webp` | `logo-eagle-branco.webp` | Marca para fundo escuro; conferir escala antes do uso |
| `eagle-erp-official.webp` | `imgi_2_sistema-de-gestao-erp.webp` | Composição oficial ERP |
| `eagle-resources-official.webp` | `imgi_3_recursos-do-sistema-de-gestao.webp` | Recursos / dispositivos |
| `eagle-analytics-official.webp` | `imgi_4_eagle-analytics.webp` | Mobile Analytics |
| `eagle-sales-app-official.webp` | `imgi_5_forca-de-vendas.webp` | App Força de Vendas |
| `eagle-company-official.webp` | `sistema-gestao-erp.webp` | Apesar do nome local, é montagem ERP/hardware, não equipe |
| `eagle-reseller-official.webp` | `slideshow-revenda.webp` | Pessoa e claims gráficos; não apresentar como foto da equipe nem como case de cliente |

Se o redesign usar interface criada em HTML/CSS, identificar dados e telas como demonstração visual; não apresentá-los como captura fiel do software em produção. As telas reais foram baixadas para dar acesso a evidência direta do produto.
