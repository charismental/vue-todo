<template>
  <v-text-field
    v-model="newTaskTitle"
    clearable
    hide-details
    class="pa-3"
    outlined
    label="Add Task"
    append-icon="mdi-plus"
    @click:append="addTask"
    @keydown.enter="addTask"
  ></v-text-field>
</template>

<script>
export default {
  name: "FieldAddTask",
  data() {
    return {
      newTaskTitle: "",
    };
  },
  methods: {
    addTask() {
      this.$store.dispatch('addNewTask', this.newTaskTitle)
        .then(() => {
          this.newTaskTitle = '';
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
};
</script>
