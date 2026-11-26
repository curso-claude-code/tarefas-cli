import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { carregar, salvar } from '../src/repositorio.js';

test('carregar devolve lista vazia quando o arquivo não existe', async () => {
  const pasta = await mkdtemp(join(tmpdir(), 'tarefas-'));
  try {
    assert.deepEqual(await carregar(join(pasta, 'nada.json')), []);
  } finally {
    await rm(pasta, { recursive: true });
  }
});

test('salvar e carregar devolvem a mesma lista', async () => {
  const pasta = await mkdtemp(join(tmpdir(), 'tarefas-'));
  const arquivo = join(pasta, 'tarefas.json');
  const lista = [{ id: 1, titulo: 'teste', feita: false }];
  try {
    await salvar(lista, arquivo);
    assert.deepEqual(await carregar(arquivo), lista);
  } finally {
    await rm(pasta, { recursive: true });
  }
});
