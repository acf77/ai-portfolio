---
title: '[Pitch] Criei um gateway de LLMs focado no Brasil'
date: '2026.05.12'
excerpt: OpenAI-compatible gateway in Go with BRL prepaid billing via PIX. Route Kimi, DeepSeek, Qwen, and GLM — plan with frontier models, execute with open-source at a fraction of the cost.
externalLink: https://www.tabnews.com.br/acfilho/pitch-criei-um-gateway-de-llms-focado-no-brasil
source: tabnews
---

Trabalho com LLMs há alguns anos e, em algum momento, comecei a reparar num padrão: a maioria dos desenvolvedores brasileiros que conheço experimenta os modelos, mas poucos colocam em produção. Não é falta de interesse técnico. É atrito econômico — e uma percepção equivocada sobre o que você precisa de fato.

---

## Os melhores modelos são caros. Os open-source já são bons o suficiente.

GPT-5.5 e Claude Opus 4.7 são impressionantes. Mas para a maioria das tarefas, modelos como Kimi K2.6, DeepSeek V4 e Qwen entregam resultado equivalente a uma fração do custo.

Isso muda o cálculo completamente. Não é mais "preciso do melhor modelo disponível". É "qual modelo é bom o suficiente para essa tarefa específica, pelo menor custo?"

A resposta, na maioria dos casos, é um modelo open-source.

---

## O padrão que estou usando: planejar com edge models, executar com OSS

Uma arquitetura que tem funcionado bem na prática: usar modelos frontier (Opus 4.7, GPT-5.5) para orquestração, planejamento e raciocínio complexo, e delegar a execução das tarefas repetitivas e bem definidas para modelos open-source via gateway.

Você paga o custo alto só onde ele se justifica. O resto roda barato, rápido e em escala.

Isso é especialmente relevante para quem está construindo agentes: o modelo de planejamento define o que fazer, os modelos de execução fazem.

---

## O problema econômico concreto

Os melhores modelos cobram em dólar. Com o câmbio atual, um uso moderado de LLMs em produção já representa uma fatia relevante do orçamento pessoal ou da startup.

Esse ciclo é real: você experimenta, acha incrível, tenta colocar no produto, vê a conta em dólar e recua.

---

## A solução: um gateway OpenAI-compatible em Go

A decisão de usar Go foi pragmática. O gateway precisa ser rápido, stateless e lidar bem com streaming de tokens, e Go entrega isso com baixa complexidade operacional.

O objetivo era que qualquer ferramenta que já faz chamadas para `api.openai.com` funcionasse sem mudança de código, só trocando a base URL e a chave.

Isso significa implementar os mesmos contratos:

```
POST /v1/chat/completions
POST /v1/completions
GET  /v1/models
```

Com suporte a `stream: true` via SSE. A maior parte dos provedores open-source já expõe uma API parecida, então o trabalho foi normalizar as diferenças nos campos de resposta e fazer o roteamento por modelo.

### Roteamento de modelos

Cada modelo tem um provider mapeado internamente. Quando chega uma request com `model: "kimi-k2.6"`, o gateway resolve qual endpoint chamar, injeta a chave do provider, e repassa. O cliente não precisa saber de nada disso.

```go
type ModelRoute struct {
    Provider   string
    Endpoint   string
    ModelAlias string
}
```

### Billing pré-pago em Reais

Não quis lidar com crédito pós-pago porque adiciona fricção de cobrança e risco de inadimplência. O modelo é simples: o usuário faz uma recarga (via PIX com AbacatePay ou cartão com Stripe), o saldo é armazenado, cada request debita com base nos tokens consumidos.

O contador de tokens usa a contagem retornada pelo provider no campo `usage` da resposta. Não recontamos localmente, o que evita discrepâncias.

---

## Infraestrutura: Magalu Cloud — e o sonho de longo prazo

O gateway roda na Magalu Cloud, infraestrutura brasileira. Para clientes com requisitos de residência de dados, ter o dado trafegando dentro do Brasil é requisito, não diferencial.

Mas tem uma limitação honesta aqui: a inferência em si ainda não roda no Brasil. Não existe hoje um provider com GPUs em solo brasileiro em escala viável para isso. Os tokens ainda são processados fora, o gateway é a camada de acesso e billing, não o compute.

O sonho de longo prazo é fechar esse ciclo: inferência rodando em GPUs brasileiras, billing em BRL, nota fiscal com CNPJ, dados que nunca saem do país. Esse é o produto completo de soberania de IA que faz sentido para o mercado regulado. Ainda não chegamos lá, mas é o norte.

---

## Estado atual

Seis modelos em produção: Kimi K2.6, DeepSeek V4 (Flash e Pro), Qwen 3.5, GLM 5.1 e MiMo V2.5 Pro. Funciona com Cursor, Claude Code, Windsurf, Kilo Code e qualquer cliente HTTP.

Recarga a partir de R$ 1,00, sem mensalidade.

---

## O que ainda quero resolver

- Fallback automático entre providers quando um estiver com latência alta
- Estimativa de custo antes da chamada (dry-run)
- Suporte a CNPJ para emissão de nota fiscal
- Inferência em solo brasileiro, quando os providers de GPU chegarem aqui (ou tiver dinheiro o suficiente kkkk)

Se você usa esse padrão de planejar com frontier e executar com OSS, ou tem opinião sobre o modelo de billing pré-pago para esse tipo de produto, quero ouvir.
