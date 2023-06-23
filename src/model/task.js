import { randomUUID } from 'node:crypto';

export default class Task {
  id; // - Identificador único de cada task
  title; //- Título da task
  description; // - Descrição detalhada da task
  completed_at; // - Data de quando a task foi concluída. O valor inicial deve ser `null`
  created_at; // - Data de quando a task foi criada.
  updated_at; // - Deve ser sempre alterado para a data de quando a task foi atualizada.
  constructor(task) {
    if (task) {
      return task;
    } else {
      return {
        id: randomUUID(),
        title: "",
        description: "",
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };
    }
  }
}
