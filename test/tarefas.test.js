import { test } from 'node:test';
import assert from 'node:assert/strict';
import { adicionar, concluir, remover, listar } from '../src/tarefas.js';

test('adicionar cria a tarefa com o próximo id', () => {
  const lista = adicionar(adicionar([], 'comprar café'), 'estudar mise');
  assert.deepEqual(lista.map((t) => t.id), [1, 2]);
  assert.equal(lista[1].titulo, 'estudar mise');
  assert.equal(lista[1].feita, false);
});

test('adicionar recusa título vazio', () => {
  assert.throws(() => adicionar([], '   '), /precisa de um título/);
});

test('concluir marca só a tarefa pedida', () => {
  const lista = concluir(adicionar(adicionar([], 'a'), 'b'), 2);
  assert.deepEqual(lista.map((t) => t.feita), [false, true]);
});

test('concluir e remover recusam um id que não existe', () => {
  assert.throws(() => concluir([], 7), /Não existe a tarefa 7/);
  assert.throws(() => remover([], 7), /Não existe a tarefa 7/);
});

test('remover tira a tarefa da lista', () => {
  const lista = remover(adicionar(adicionar([], 'a'), 'b'), 1);
  assert.deepEqual(lista.map((t) => t.titulo), ['b']);
});

test('listar mostra o estado de cada tarefa', () => {
  const lista = concluir(adicionar(adicionar([], 'a'), 'b'), 1);
  assert.equal(listar(lista), '[x] 1  a\n[ ] 2  b');
  assert.equal(listar(lista, { pendentes: true }), '[ ] 2  b');
  assert.equal(listar([]), 'Nenhuma tarefa.');
});

test('adicionar recusa título com mais de 80 caracteres', () => {
  assert.throws(() => adicionar([], 'x'.repeat(81)), /até 80 caracteres/);
});
