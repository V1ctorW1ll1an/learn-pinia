<template>
  <div
    class="py-2 px-5 bg-white mt-5 rounded shadow flex justify-between items-center"
  >
    <h3 class="inline-block text-right">{{ task.title }}</h3>
    <div class="inline-block text-right">
      <Icon
        @click="removeTask"
        class="text-gray-400 cursor-pointer"
        icon="delete"
      />
      <Icon
        @click="toggleFavorite"
        class="text-gray-400 cursor-pointer"
        :class="{ 'text-red-500': task.isFavorite }"
        icon="favorite"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ITask, useTaskStore } from "../store/Task.store";
import Icon from "./Icon.vue";

export default {
  name: "TaskDetails",
  props: {
    task: {
      type: Object as () => ITask,
      required: true,
    },
  },
  setup(props) {
    const taskStore = useTaskStore();

    async function removeTask() {
      await taskStore.removeTask(props.task);
      await taskStore.fetchTasks();
    }

    async function toggleFavorite() {
      await taskStore.toggleFavorite(props.task);
      await taskStore.fetchTasks();
    }

    return { taskStore, removeTask, toggleFavorite };
  },
  components: { Icon },
};
</script>
