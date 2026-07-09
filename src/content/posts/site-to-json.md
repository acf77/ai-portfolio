---
title: 'Pitch: site-to-json — transformando sites em JSON para alimentar IAs'
date: '2026.04.08'
excerpt: A free tool that extracts a site's design system into structured JSON — colors, typography, spacing, components — so coding agents stay visually consistent.
externalLink: https://www.tabnews.com.br/acfilho/sito-to-json-transformando-sites-em-json-para-alimentar-ias
source: tabnews
---

Trabalhar com geração de interfaces usando Large Language Models ainda apresenta alguns desafios recorrentes, especialmente quando o objetivo é manter consistência visual. Os dois problemas mais comuns são:

- Dificuldade de padronizar o estilo em múltiplas telas e componentes
- Resultados que frequentemente apresentam aquela aparência genérica típica de conteúdo gerado por IA

A abordagem mais eficaz continua sendo basear-se em designs reais de produtos bem executados (Linear, Vercel, Stripe, Notion, Arc Browser, Supabase, entre outros). Porém, depender de imagens ou de descrições textuais longas e repetitivas não é uma solução escalável. A maioria dos agentes não aceita imagens facilmente, e prompts descritivos extensos se tornam difíceis de manter consistentes ao longo do projeto.

## A melhor solução: estruturar o design como dados

LLMs performam muito melhor quando recebem informações estruturadas em vez de descrições vagas ou referências visuais.

A forma mais eficiente é converter o design de referência em um formato claro — idealmente um JSON — que descreva de forma lógica:

- Paleta de cores com nomes semânticos
- Sistema tipográfico completo (famílias, pesos, tamanhos, line-heights)
- Escalas de espaçamento e grid system
- Definição de componentes reutilizáveis (botões, cards, inputs, headers, etc.)
- Hierarquia visual e fluxo da página
- Regras globais de estilo (border-radius, sombras, efeitos, etc.)

Com essa estrutura, o agente consegue seguir fielmente a lógica do design escolhido, reduzindo inconsistências e iterações desnecessárias.

## Ferramenta: [site-to-json.trapiche.cloud](https://site-to-json.trapiche.cloud)

Para facilitar esse fluxo, criei o [site-to-json.trapiche.cloud](https://site-to-json.trapiche.cloud) — uma ferramenta simples e gratuita.

Como funciona:

1. Informe a URL de qualquer site público que você queira usar como referência.
2. A ferramenta analisa a página e gera um arquivo JSON organizado contendo todo o design system extraído.
3. Copie esse JSON e injete diretamente no contexto do seu agente de IA (Cursor, Claude Code, Lovable, etc.).

A partir desse ponto, o modelo trabalha com uma referência concreta e estruturada, em vez de depender apenas de descrições subjetivas.

## O que o JSON geralmente contém

- Cores primárias, secundárias, neutras e semânticas (success, danger, warning, etc.)
- Tipografia completa com escala modular
- Tokens de espaçamento (4px, 8px, 16px, 24px, etc.)
- Definições de componentes com suas variantes
- Regras de layout e responsividade
- Estilo global da interface

## Fluxo recomendado

1. Escolha um site com o visual que deseja replicar
2. Gere o JSON usando a ferramenta
3. Adicione o JSON ao system prompt ou ao arquivo de contexto do agente
4. Solicite novas telas, componentes ou refinamentos mantendo o mesmo padrão

Essa abordagem reduz significativamente o tempo gasto em ajustes e melhora bastante a consistência do código gerado (seja Tailwind, Shadcn/UI, React, Next.js, Flutter ou qualquer outra stack).

A ferramenta está disponível gratuitamente em [site-to-json.trapiche.cloud](https://site-to-json.trapiche.cloud). Não requer cadastro e usa a sua própria chave. Se você trabalha gerando interfaces com IA, vale testar com alguns sites de referência que você gosta.

Qualquer feedback sobre a ferramenta ou sugestões de melhorias é muito bem-vindo.
