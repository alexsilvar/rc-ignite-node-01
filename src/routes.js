import { buildRoutePath } from "./utils/build-route-path.js";
import Task from './model/task.js';
import { Database } from './database.js';

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const task = new Task();
      const { title, description } = req.body;
      if (!title) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title is required' }),
        );
      }
      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'description is required' })
        );
      }
      task.title = title;
      task.description = description;

      database.insert('tasks', task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      return res.end(JSON.stringify(database.select('tasks', { title: search, description: search })));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title || !description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title and description are required' })
        );
      }

      try {
        database.update('tasks', id, {
          title,
          description,
          updated_at: new Date()
        });
        return res.writeHead(204).end();
      } catch {
        return res.writeHead(404).end();
      }

    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id });

      if (!task) {
        return res.writeHead(404).end();
      }

      database.delete('tasks', id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id });

      if (!task) {
        return res.writeHead(404).end();
      }

      const isTaskCompleted = !!task.completed_at;
      const completed_at = isTaskCompleted ? null : new Date();

      database.update('tasks', id, { completed_at });

      return res.writeHead(204).end();
    },
  },
];
