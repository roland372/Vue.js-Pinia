<template>
  <main>
    <!--? header -->
    <header>
      <!-- we don't need to write taskStore.name, because we destructured it using hook storeToRefs -->
      <h1>{{ name }}</h1>
    </header>

    <!--? new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!--? filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </nav>

    <!--? loading  -->
    <div class="loading" v-if="taskStore.isLoading">Loading tasks...</div>

    <!--? task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks">
        <!-- pass task as props -->
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} faves left to do</p>
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!-- reset store to it's original state -->
    <button @click="taskStore.$reset">Reset store</button>

  </main>
</template>

<script>
import { useTaskStore } from './stores/TaskStore'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

export default {
  // register components
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore() // returns task store
    // console.log(taskStore.tasks);

    // hook that allows us to destructure all getters and state (except actions) from store and put them in refs
    // const { tasks, isLoading, favs, totalCount, favCount, name } = storeToRefs(taskStore)
    const { name } = storeToRefs(taskStore)

    // fetch tasks
    taskStore.getTasks()

    const filter = ref('all')

    // return { taskStore, filter, tasks, isLoading, favs, totalCount, favCount, name }
    return { taskStore, filter, name }
  }
}
</script>
