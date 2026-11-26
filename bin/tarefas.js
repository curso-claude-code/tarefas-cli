#!/usr/bin/env node
import { adicionar, concluir, remover, listar } from '../src/tarefas.js';
import { carregar, salvar } from '../src/repositorio.js';

const AJUDA = `Uso: tarefas <comando>

  add "título"   cria uma tarefa
  list [--pendentes]
  done <id>      marca como feita
  rm <id>        apaga`;

const [comando, ...args] = process.argv.slice(2);

try {
  const tarefas = await carregar();
  switch (comando) {
    case 'add':
      await salvar(adicionar(tarefas, args.join(' ')));
      console.log('Tarefa criada.');
      break;
    case 'list':
      console.log(listar(tarefas, { pendentes: args.includes('--pendentes') }));
      break;
    case 'done':
      await salvar(concluir(tarefas, Number(args[0])));
      console.log('Tarefa concluída.');
      break;
    case 'rm':
      await salvar(remover(tarefas, Number(args[0])));
      console.log('Tarefa apagada.');
      break;
    default:
      console.log(AJUDA);
  }
} catch (erro) {
  console.error(`Erro: ${erro.message}`);
  process.exitCode = 1;
}
