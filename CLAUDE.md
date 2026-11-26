# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# tarefas-cli

Lista de tarefas no terminal, em Node.js puro (ESM, Node >= 24 via `mise.toml`), **sem dependências**. É o projeto-guia do curso "Claude Code no Windows (WSL2)". Código, mensagens e testes são em português.

## Comandos

```bash
mise install                     # instala o Node pedido pelo mise.toml
npm test                         # roda todos os testes (node --test)
npm run test:um -- "<nome>"      # roda só os testes cujo nome casa com o padrão
node bin/tarefas.js add "título" # usa a CLI direto
node bin/tarefas.js list [--pendentes] | done <id> | rm <id>
```

Não há build nem lint configurados.

## Arquitetura

Três camadas, cada uma num arquivo:

- `src/tarefas.js` — regras puras: cada função recebe uma lista e devolve uma lista **nova** (imutável), sem tocar em arquivo. Erros de regra (título vazio, id inexistente) são `throw new Error(...)` com mensagem para o usuário.
- `src/repositorio.js` — persistência em JSON. Caminho padrão `~/.tarefas.json`, sobrescrito pela variável `TAREFAS_ARQUIVO`. Arquivo inexistente vira lista vazia.
- `bin/tarefas.js` — CLI: carrega, aplica a regra, salva. Todo erro é capturado num único `try/catch`, impresso como `Erro: <mensagem>` com exit code 1.

Uma tarefa é `{ id, titulo, feita }`; o próximo id é o maior existente + 1.

## Testes

Usam `node:test` + `node:assert/strict`, em `test/*.test.js`. Testes do repositório gravam numa pasta temporária (`mkdtemp`) e passam o caminho explicitamente — nunca tocam em `~/.tarefas.json`. Ao rodar a CLI manualmente, prefira `TAREFAS_ARQUIVO=/tmp/...` para não mexer nas tarefas reais do usuário.
- Teste direcionado primeiro: npm run test:um -- "<nome>". npm test só no fim.
