<template>
  <main class="w-screen h-full pb-10 bg-gray-100 text-gray-900">
    <header
      class="flex items-center pt-5 pb-5 bg-gray-200 justify-center text-center flex-col"
    >
      <div class="flex justify-center items-center mb-3">
        <img
          class="max-w-[60px] -rotate-12"
          src="./assets/pinia-logo.svg"
          alt="pinia logo"
        />
        <h1 class="text-3xl ml-4 text-gray-500 rotate-2">Pinia tasks</h1>
        <h2 class="text-sm text-gray-500 ml-3">{{ taskStore.name }}</h2>
      </div>

      <TaskForm />
    </header>

    <!-- loading -->
    <div
      v-if="taskStore.isLoading"
      class="flex justify-center items-center h-full"
    >
      <div
        class="loader ease-linear rounded-full border-4 border-t-4 border-gray-400 h-12 w-12 mb-4"
      ></div>
    </div>

    <nav class="w-full flex justify-center mt-3">
      <ul class="flex bg-gray-200 rounded-xl">
        <li
          v-for="(tab, index) in tabs"
          :key="tab"
          class="px-4 py-2 cursor-pointer"
          :class="{
            'bg-gray-300': tab === currentTab,
            'rounded-l-xl': index === 0,
            'rounded-r-xl': index === tabs.length - 1,
          }"
          @click="switchTabs(tab)"
        >
          {{ tab }}
        </li>
      </ul>
    </nav>
    <div class="max-w-2xl my-5 mx-auto">
      <template v-if="currentTab === 'All'">
        <h3>You have {{ taskStore.totalCount }} task left to do</h3>
        <div v-for="(task, index) in taskStore.tasks" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </template>
      <template v-if="currentTab === 'Favorites'">
        <h3>You have {{ taskStore.favoritesCount }} favorites task to do</h3>
        <div v-for="(task, index) in taskStore.favorites" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </template>
    </div>
  </main>
</template>
<script lang="ts">
import { ref } from "vue";
import TaskDetails from "./components/TaskDetails.vue";
import { useTaskStore } from "./store/Task.store";
import TaskForm from "./components/TaskForm.vue";

export default {
  name: "App",

  setup() {
    const taskStore = useTaskStore();
    const currentTab = ref("All");
    const tabs = ref(["All", "Favorites"]);

    taskStore.fetchTasks();

    function switchTabs(tab: string) {
      currentTab.value = tab;
    }

    return { taskStore, currentTab, tabs, switchTabs };
  },

  components: { TaskDetails, TaskForm },
};
</script>
