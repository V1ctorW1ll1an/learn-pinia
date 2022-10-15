<template>
  <form
    class="flex justify-center items-center w-full max-w-2xl"
    @submit.prevent="handleSubmit()"
  >
    <label for="title" class="flex-1">
      <input
        type="text"
        id="title"
        placeholder="I need to..."
        v-model="newTask"
        class="border border-gray-300 rounded-md p-2 w-full"
      />
    </label>

    <button
      type="submit"
      class="bg-yellow-400 text-white rounded-md px-4 py-2 ml-2"
    >
      Add Task
    </button>
  </form>
</template>

<script lang="ts">
import { ref } from "vue";
import { ITask, useTaskStore } from "../store/Task.store";

export default {
  name: "TaskForm",
  setup() {
    const taskStore = useTaskStore();
    const newTask = ref<string>("");

    async function handleSubmit() {
      if (newTask.value.trim() === "") return;
      await taskStore.addTask({
        id: Math.random().toString(36).substring(2, 9),
        title: newTask.value,
        isFavorite: false,
      });
      newTask.value = "";
      await taskStore.fetchTasks();
    }

    return { newTask, handleSubmit };
  },
};
</script>
