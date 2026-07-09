---
title: Usando o ChatGPT para escrever testes usando React Testing Library
date: '2023.01.06'
excerpt: Using ChatGPT to generate React Testing Library cases for a progress bar component — faster test writing, consistent assertions, and less fear of the testing stack.
externalLink: https://www.tabnews.com.br/acfilho/usando-o-chatgpt-para-escrever-testes-usando-react-testing-library
source: tabnews
---

Recentemente, encarei o desafio de testar meus componentes de UI usando o bit.dev e React Testing Library. O meu mentor, obviamente, foi o ChatGPT. Usar o ChatGPT para criar testes usando a React Testing Library pode ser uma ferramenta muito útil para os desenvolvedores. Com o ChatGPT, os desenvolvedores podem rápido e facilmente gerar casos de teste que podem ser usados para validar a funcionalidade de seus componentes React.

Um dos principais benefícios do uso do ChatGPT é que ele permite que os desenvolvedores se concentrem na escrita dos testes em si, em vez de se preocuparem com os detalhes de implementação subjacentes. Isto significa que os desenvolvedores podem escrever testes mais focados na funcionalidade que estão tentando validar, ao invés de se preocuparem com os detalhes específicos de implementação dos componentes que estão testando.

Outra vantagem de usar o ChatGPT é que ele pode ajudar a garantir que os testes sejam consistentes e confiáveis. Como o ChatGPT gera casos de teste baseados em um conjunto de parâmetros pré-determinados, ele pode ajudar a reduzir o risco de erro humano e garantir que os testes sejam confiáveis e repetíveis.

Aqui alguns exemplos que me foram apresentados pelo ChatGPT e que utilizei ipsi litteris:

```javascript
import React from 'react';
import { render } from '@testing-library/react';
import { ProgressBar } from './progress-bar';

it('should have correct progress width', () => {
  const { getByTestId } = render(<ProgressBar progress={50}></ProgressBar>);

  const progress = getByTestId('progress-div');

  expect(progress).toHaveStyle('width: 50%');
});

it('should have correct progress width when progress is lower than 10%', () => {
  const { getByTestId } = render(<ProgressBar progress={1}></ProgressBar>);

  const progress = getByTestId('progress-div');

  expect(progress).toHaveStyle('width: 10%');
});
```

Em suma, criei um Card que possui uma barra de progresso no topo, e queria testar se o valor que passava como prop estava realmente sendo recebido e atualizando o tamanho da barra.

Maravilhas da IA na vida do desenvolvedor.

O que vocês acharam? Acham que é válido? Usariam no dia a dia?
