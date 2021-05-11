<template>
  <v-dialog v-model="showDialog" max-width="480">
    <v-card>
      <v-card-title class="text-h6">
        Are you sure you want to delete {{ taskName }}?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="showDialog = false"> Cancel </v-btn>
        <v-btn color="red" text @click="deleteTask"> Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    taskName: {
      type: String,
    },
  },
  methods: {
    deleteTask() {
      this.$emit("delete-task");
    },
  },
  computed: {
    showDialog: {
      get() {
        return this.open;
      },
      set() {
        this.$emit("close-dialog");
      },
    },
  },
};
</script>
