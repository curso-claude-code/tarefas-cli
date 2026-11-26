---
name: preparar-pr
description: Prepara a mudança atual para um pull request. Use antes de abrir um PR.
disable-model-invocation: true
allowed-tools: Bash(npm run test:um *) Bash(git diff *)
---

Prepare a mudança atual para um pull request.

1. Veja o que mudou com `git status` e `git diff`.
2. Rode só os testes ligados à mudança: `npm run test:um -- "<nome>"`.
3. Revise o diff: console.log esquecido, código comentado, arquivo que não devia entrar.
4. Sugira uma mensagem de commit em português: uma linha de resumo e, embaixo, o porquê.

Não faça commit nem push. Mostre o que achou e espere.
