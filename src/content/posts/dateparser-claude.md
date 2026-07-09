---
title: Criei um dateparser para o meu app com o Claude
date: '2025.11.03'
excerpt: How I used Claude as a pair-programming architect — not runtime AI — to build a Portuguese natural-language date parser in Go for Taskzap.
externalLink: https://www.tabnews.com.br/acfilho/criei-um-dateparser-para-o-meu-app-com-o-claude
source: tabnews
---

Fala pessoal, tudo bem? Não é a primeira vez que venho aqui falar do taskzap, um side project que estou desenvolvendo para manter todas as minhas tarefas e lembretes dentro do WhatsApp.

## O Stack e o Desafio

A API é toda escrita em Go, que é extremamente potente em concorrência e performance, mas tem um ecossistema de pacotes bem menor comparado a JS e Python. E foi aí que me deparei com um problema clássico: Como aceitar qualquer formato de data que o usuário brasileiro escreva e transformar isso em uma Unix timestamp? Strings como:

- "amanhã às 10h da manhã"
- "próxima segunda às 14h"
- "dia 15 do mês que vem"
- "daqui a 10 minutos"

## A Primeira Tentativa (Que Falhou)

Tentei usar pacotes existentes como o when, mas todos tinham a mesma falha crítica: suporte extremamente limitado para português brasileiro. O parser simplesmente não entendia expressões naturais que usamos no dia a dia, falhando constantemente em casos básicos como "hoje às 14h" ou "amanhã às 17h".

## A Gambiarra (Que Também Falhou)

Minha primeira reação foi: "Deixa a IA resolver isso!" Criei um fallback: toda data que o pacote não conseguia converter, eu mandava para a API da OpenAI processar. Problema resolvido, certo? Errado. Como vocês podem imaginar, usar IA em runtime trouxe problemas sérios:

- **Latência alta:** 500-1000ms por chamada (vs <1ms do parser nativo)
- **Custo:** Cada tarefa criada = 1 request = R$$$
- **Inconsistência:** A IA às vezes errava ou interpretava de forma diferente
- **Dependência externa:** Se a API caísse, o app inteiro quebrava

## A Solução Real: IA como Ferramenta de Desenvolvimento

Foi aí que tive o insight: em vez de usar IA em produção, por que não usar IA para **CRIAR** a solução?

Então o que eu fiz, pedi para o Claude criar um dateparser usando vários casos de usuários beta que não funcionaram.

Passei o seguinte prompt inicial:

```
help me create a natural date parser in go. Not using any external package and not using ai.

The use cases are when it receieves a text like "amanha as 10h da manha", and it extract the date only and returns a unix date.

You will ask me questions before outlining the plan and return the code
```

### O Claude Como Arquiteto

Em vez de só cuspir código, o Claude me fez as perguntas certas — aquelas que eu deveria ter pensado antes mas não pensei:

```
Language scope: I see your example is in Portuguese ("amanhã as 10h da manhã"). Should the parser only support Portuguese, or do you want multi-language support?
Date formats to support: Which natural language patterns should it handle? For example:

Relative dates: "hoje", "amanhã", "depois de amanhã", "ontem"
Days of week: "segunda-feira", "próxima terça"
Specific dates: "15 de março", "15/03/2025"
Time expressions: "10h da manhã", "15:30", "meio-dia", "meia-noite"
Combined: "amanhã às 14h", "segunda às 9h"

Reference time: Should the parser use the current system time as the reference point, or should it accept a reference time as input?
Timezone handling: Should it work with a specific timezone, use the system's local timezone, or accept timezone as a parameter?
Output format: You mentioned "unix date" - do you want:

Unix timestamp (seconds since epoch)?
Time in a specific timezone?
UTC time?

Ambiguity handling: How should it handle ambiguous cases? For example:

"segunda" - this week or next week?
"10h" without "manhã/tarde/noite" - AM or PM?
Invalid dates like "32 de janeiro"

Error handling: What should happen when the text doesn't contain a parseable date? Return zero, return an error, or return the current time?
```

E eu dei as seguintes respostas:

```
1 - PTBR only, but make it extensible
2 - all of them
3 - both, if no date is offered, uses system date by default
4 - accepts external, but uses system by default
5 - unix timestamp
6 - You handles 24h cases, no am/pm, if it says "segunda", but the system date is "terca", is next week.
7 - return an error
```

### O Processo Iterativo

O Claude não entregou um código perfeito de primeira. Foi um processo colaborativo:

**Fase 1: MVP**

- Suporte básico: hoje, amanhã, ontem
- Dias da semana
- Formatos DD/MM/YYYY

**Fase 2: Casos Reais** — Levei 23 casos que usuários beta realmente escreveram e que falharam:

```
"comprar pão dia 15"
"próxima segunda às 14h"
"daqui a 10 minutos"
"20/09/25 às 18:30"  // ano com 2 dígitos!
"1º de outubro"      // números ordinais
"sábado de manhã"    // horário implícito
```

**Fase 3: Refinamento** — A cada falha, o Claude:

- Explicava por que falhou
- Propunha uma solução
- Atualizava os testes

Exemplo real: "amanhã às 8h da noite" estava retornando 8h da manhã porque "amanhã" contém a substring "manhã" e o regex estava dando match errado. O Claude identificou o bug, explicou o problema, e corrigiu isolando a porção de tempo do input antes de processar modificadores. Tá que acerta ~96% dos casos, e os edge cases são tratados pela IA.

**Suite de Testes:**

- 21 testes unitários (casos isolados)
- 23 testes de casos reais de usuários
- 95.7% de coverage (22/23 passando — único skip é "próximo feriado" que precisaria calendário)

**Números Finais**

Performance:

- ~96% de acurácia (22/23 casos reais)
- <1ms de latência (vs 800ms da IA)
- Zero custo por requisição
- Zero dependências externas

Edge Cases: Os 4% que ainda falham? Casos extremamente específicos como:

- "no próximo feriado" (precisaria calendário de feriados)
- Datas ambíguas sem contexto suficiente
- Erros de digitação muito graves

Para esses casos raros, aí sim tenho um fallback para IA — mas representa menos de 1% das requisições reais.

## A Lição Mais Importante

O Claude não foi um gerador de código mágico. Foi um parceiro de pair programming que:

- Fez as perguntas certas que me forçaram a pensar melhor
- Propôs arquitetura escalável desde o início
- Ensinou boas práticas (testes desde o dia 1, código documentado)
- Debugou comigo quando testes falharam
- Explicou o "porquê", não só o "como"

**Resultado Business** — Agora o taskzap tem:

- Parser nativo que entende como brasileiros falam
- Latência imperceptível para o usuário
- Custo operacional zero em parsing
- Confiabilidade de 96%+

Quer testar o parser em ação? O taskzap está em beta aberto e totalmente gratuito. Adiciona no WhatsApp e tenta "quebrar" o parser escrevendo datas das formas mais malucas possíveis. Aposto que ele aguenta!

E se você conseguir quebrar? Manda o caso pra mim — vou adicionar nos testes e melhorar o parser. É assim que software de qualidade é construído: iteração constante com feedback real.
