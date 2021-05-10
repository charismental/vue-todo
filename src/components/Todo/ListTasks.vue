<template>
  <div>
    <v-list v-if="tasks.length" flat class="pt-0">
      <task v-for="task in tasks" :key="task.id" :task="task" />
    </v-list>
    <no-tasks v-else />
  </div>
</template>

<script>
import Task from "./Task.vue";
import NoTasks from "./NoTasks.vue";

export default {
  components: { Task, NoTasks },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
};
</script>
