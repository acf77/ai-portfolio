---
title: Criei uma Vercel Brasileira
date: '2026.01.18'
excerpt: Why Trapiche exists — deploy in Brazil, pay in BRL with Pix, servers in São Paulo, without dollar blockers, US latency, or data leaving the country.
externalLink: https://www.tabnews.com.br/acfilho/criei-uma-vercel-brasileira
source: tabnews
---

Fala pessoal, sou dev há um bom tempo já, e sempre me questionei sobre a supremacia da Vercel para deploys de projetos. O DX deles é inegável, mas eles têm um blocker muito grande: **PAGAMENTO EM DÓLAR**.

Isso dificulta muito o uso da ferramenta além de projetos pessoais, e às vezes fica muito caro para o dev que quer fazer um portfólio ou um side-project. Além disso, nenhuma empresa quer que seus dados estejam fora do Brasil ou fora do seu controle. Tenho visto essa tendência muito claramente depois da chegada das LLMs. A grande barreira era onde colocar essa infraestrutura. Todas as outras clouds giram no mesmo problema, a AWS. Clouds como Vercel e Netlify dependem demais da AWS, ou seja, quando a AWS falha, eles caem.

Outro grande problema para o dev brasileiro é a latência. Se você quer fazer um projeto no Brasil, para clientes brasileiros, é quase impossível pagar servidores em SP, porque são os mais caros, logo, você acaba tendo que ficar no bom e velho us-east-1, que é o mais barato, mas é nos EUA. Uma roundtrip de 300-500ms de forma desnecessária para quem precisa servir conteúdo aqui no Brasil.

Após a criação da Magalu Cloud e a disponibilização pública de VMs, Buckets e K8s, tive uma ideia: por que não temos uma cloud no Brasil, com servidores no Brasil, com dados no Brasil, pagando em Reais e com PIX?

Daí surgiu a [Trapiche](https://trapiche.cloud), uma cloud BR para devs BRs, com servidores e dados no Brasil. Estamos liberando uma quantidade limitada de acessos para ganharmos feedback e validação da plataforma.

Nessa etapa, deploys estáticos (React e Next.js) com domínios próprios estão de graça. Então, se você quer validar uma ideia, ou apenas subir seu portfólio enquanto testa uma cloud brasileira, aqui é o seu lugar!

É só acessar [trapiche.cloud](https://trapiche.cloud) e testar! Abraços e obrigado a todos!
