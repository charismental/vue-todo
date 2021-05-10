<template>
  <div class="home">
    <field-add-task />
    <list-tasks />
  </div>
</template>

<script>
import FieldAddTask from "../components/Todo/FieldAddTask.vue";
import ListTasks from "../components/Todo/ListTasks.vue";

export default {
  name: "Todo",
  components: {
    FieldAddTask,
    ListTasks,
  },
};
</script>

