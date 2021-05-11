<template>
  <v-snackbar v-model="activateSnackbar">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="activateSnackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    text() {
      return this.$store.state.snackbarText;
    },
    activateSnackbar: {
      get() {
        return this.$store.state.showSnackbar;
      },
      set(boolean) {
        if (!boolean) {
          this.$store.dispatch("toggleSnackbar");
        }
      },
    },
  },
};
</script>
