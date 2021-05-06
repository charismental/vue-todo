<template>
  <div class="home">
    <v-list flat class="pt-0">
      <div v-for="task in tasks" :key="task.id">
        <v-list-item @click="doneTask(task.id)">
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title :class="{ 'text-decoration-line-through' : task.done }">{{ task.title }}</v-list-item-title>
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
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: 'Wake up',
          done: false,
        },        {
          id: 2,
          title: 'Brush teeth',
          done: false,
        },        {
          id: 3,
          title: 'Drink Coffee',
          done: false,
        }
      ]
    }
  },
  methods: {
    deleteTask(id) {
      let tasks = [...this.tasks]
      tasks = tasks.filter(task => task.id !== id);
      this.tasks = tasks;
    },
    doneTask(id) {
      const [task] = this.tasks.filter(task => task.id === id);
      if (task) {
        task.done = !task.done;
      }
    },
  },
};
</script>
