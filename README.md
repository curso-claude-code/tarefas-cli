# tarefas-cli

Lista de tarefas no terminal, em Node.js, sem dependências. É o projeto-guia do curso
"Claude Code no Windows (WSL2)".

```bash
mise install      # instala o Node da versão que o mise.toml pede
npm ci            # instala as dependências (este projeto não tem nenhuma)
npm test          # roda os testes
node bin/tarefas.js add "primeira tarefa"
node bin/tarefas.js list
```
