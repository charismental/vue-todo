import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    showSnackbar: false,
    snackbarText: 'You shouldn\'t see this text',
  },
  mutations: {
    SET_TASKS(state, tasksArr) {
      state.tasks = tasksArr;
    },
    SHOW_SNACKBAR(state, { text, status }) {
      state.snackbarText = text;
      state.showSnackbar = status;
    },
  },
  actions: {
    toggleSnackbar({ commit, state }, text) {
      const snackbarObj = text && text.length ? { status: true, text } : { status: false, text: '' };
      let timeout = 0;
      if (state.showSnackbar && snackbarObj.status) {
        commit('SHOW_SNACKBAR', { status: false, text: '' });
        timeout = 200;
      }
      setTimeout(() => commit('SHOW_SNACKBAR', snackbarObj), timeout);
    },
    toggleDone({ commit, state }, taskId) {
      const tasks = [...state.tasks];
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const task = tasks[taskIndex];
        task.done = !task.done;
        commit('SET_TASKS', tasks);
      }
    },
    deleteTask({ commit, dispatch, state }, taskId) {
      const updatedTasks = [...state.tasks].filter(task => task.id !== taskId);
      commit('SET_TASKS', updatedTasks);
      dispatch('toggleSnackbar', 'Task deleted');
    },
    addNewTask({ commit, dispatch, state }, newTaskTitle) {
      if (!newTaskTitle || !newTaskTitle.length) {
        console.log('Must pass a valid new task title');
        return;
      }
      if (state.tasks.some(task => task.title === newTaskTitle)) {
        console.log('There is already a task with this name');
        return;
      }
      try {
        const newTask = {
          id: Date.now(),
          title: newTaskTitle,
          done: false,
        }
        const tasks = [...state.tasks];
        tasks.push(newTask);
        commit('SET_TASKS', tasks);
        dispatch('toggleSnackbar', 'Task added');
      } catch (err) {
        dispatch('toggleSnackbar', 'Unable to add task');
      }
    }
  },
})
