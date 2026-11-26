// Regras da lista de tarefas, sem tocar em arquivo: recebem uma lista e devolvem outra.

export function adicionar(tarefas, titulo) {
  const texto = String(titulo ?? '').trim();
  if (!texto) throw new Error('A tarefa precisa de um título.');
  const id = tarefas.reduce((maior, t) => Math.max(maior, t.id), 0) + 1;
  return [...tarefas, { id, titulo: texto, feita: false }];
}

export function concluir(tarefas, id) {
  localizar(tarefas, id);
  return tarefas.map((t) => (t.id === id ? { ...t, feita: true } : t));
}

export function remover(tarefas, id) {
  localizar(tarefas, id);
  return tarefas.filter((t) => t.id !== id);
}

export function listar(tarefas, { pendentes = false } = {}) {
  const lista = pendentes ? tarefas.filter((t) => !t.feita) : tarefas;
  if (lista.length === 0) return 'Nenhuma tarefa.';
  return lista.map((t) => `${t.feita ? '[x]' : '[ ]'} ${t.id}  ${t.titulo}`).join('\n');
}

function localizar(tarefas, id) {
  if (!tarefas.some((t) => t.id === id)) throw new Error(`Não existe a tarefa ${id}.`);
}
