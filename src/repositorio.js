import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { homedir } from 'node:os';
import { join } from 'node:path';

// Onde as tarefas ficam guardadas. Dá para trocar com a variável TAREFAS_ARQUIVO.
export function caminhoPadrao() {
  return process.env.TAREFAS_ARQUIVO ?? join(homedir(), '.tarefas.json');
}

export async function carregar(caminho = caminhoPadrao()) {
  try {
    return JSON.parse(await readFile(caminho, 'utf8'));
  } catch (erro) {
    if (erro.code === 'ENOENT') return [];
    throw erro;
  }
}

export async function salvar(tarefas, caminho = caminhoPadrao()) {
  await mkdir(dirname(caminho), { recursive: true });
  await writeFile(caminho, JSON.stringify(tarefas, null, 2) + '\n');
}
