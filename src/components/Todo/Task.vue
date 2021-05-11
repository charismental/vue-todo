<template>
  <div>
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
          <v-btn @click.stop="promptForDelete" icon>
            <v-icon color="primary lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
    <confirmation-prompt
      :taskName="task.title"
      :open="showDialog"
      @delete-task="deleteTask"
      @close-dialog="showDialog = false"
    />
  </div>
</template>

<script>
import ConfirmationPrompt from "./Dialogs/ConfirmationPrompt.vue";

export default {
  name: "Task",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDialog: false,
    };
  },
  components: {
    ConfirmationPrompt,
  },
  methods: {
    promptForDelete() {
      this.showDialog = true;
    },
    deleteTask() {
      this.$store
        .dispatch("deleteTask", this.task.id)
        .then(() => (this.showDialog = false))
        .catch((err) => {
          console.error(err);
        });
    },
    doneTask() {
      this.$store.dispatch("toggleDone", this.task.id);
    },
  },
};
</script>
