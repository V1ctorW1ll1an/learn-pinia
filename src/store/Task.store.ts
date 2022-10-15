import { defineStore } from "pinia";

export interface ITask {
  id: string;
  title: string;
  isFavorite: boolean;
}

export interface ITaskStore {
  tasks: ITask[];
  name: string;
  isLoading: boolean;
}

export const useTaskStore = defineStore("taskStore", {
  state: () =>
    ({
      tasks: [],
      name: "Victor Willian - 2022",
      isLoading: false,
    } as ITaskStore),
  getters: {
    favorites(): ITask[] {
      return this.tasks.filter((task: ITask) => task.isFavorite);
    },
    favoritesCount(): number {
      return this.favorites.length;
    },
    totalCount(): number {
      return this.tasks.length;
    },
  },
  actions: {
    async toggleFavorite(task: ITask) {
      this.tasks.find((t) => t.id === task.id)!.isFavorite = !task.isFavorite;

      const response = await fetch("http://localhost:3000/tasks/" + task.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavorite: task.isFavorite }),
      });

      if (!response.ok) {
        console.log(response);
      }
    },
    async addTask(task: ITask) {
      this.tasks.push(task);

      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        console.log(response);
      }
    },
    async removeTask(task: ITask) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);

      const response = await fetch("http://localhost:3000/tasks/" + task.id, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.log(response);
      }
    },
    async fetchTasks() {
      this.isLoading = true;
      const response = await fetch("http://localhost:3000/tasks");
      const tasks = await response.json();
      this.tasks = tasks;
      this.isLoading = false;
    },
  },
});
