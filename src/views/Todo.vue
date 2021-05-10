<template>
  <div class="home">
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
    <v-list v-if="tasks.length" flat class="pt-0">
      <div v-for="task in tasks" :key="task.id">
        <v-list-item @click="doneTask(task.id)">
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">{{
                task.title
              }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click.stop="deleteTask(task.id)" icon>
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
    <div class="dead-center" v-else>
      <v-icon size="100" color="primary">mdi-check</v-icon>
      <div class="text-h5 primary--text">No tasks</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      newTaskTitle: "",
      tasks: [
        {
          id: 1,
          title: "Wake up",
          done: false,
        },
        {
          id: 2,
          title: "Brush teeth",
          done: false,
        },
        {
          id: 3,
          title: "Drink Coffee",
          done: false,
        },
      ],
    };
  },
  methods: {
    addTask() {
      if (this.newTaskTitle && this.newTaskTitle.length) {
        if (this.tasks.some((task) => task.title === this.newTaskTitle)) {
          console.log(
            "Hey, you already have a task called ",
            this.newTaskTitle,
            ", ding-dong"
          );
          return;
        }
        const arrOfIDs = this.tasks.map((task) => task.id);
        const highestNumber = Math.max(...arrOfIDs);
        const newTaskObj = {
          id: highestNumber + 1,
          title: this.newTaskTitle,
          done: false,
        };
        this.tasks.push(newTaskObj);
        this.newTaskTitle = "";
      } else {
        console.log("you need to enter a new task title first...dork");
      }
    },
    deleteTask(id) {
      let tasks = [...this.tasks];
      tasks = tasks.filter((task) => task.id !== id);
      this.tasks = tasks;
    },
    doneTask(id) {
      const [task] = this.tasks.filter((task) => task.id === id);
      if (task) {
        task.done = !task.done;
      }
    },
  },
};
</script>

<style lang="scss">
  .dead-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: .5;
  }
</style>