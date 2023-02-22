<template>
  <h1>Create a Task</h1>
  <div v-if="showErrorMessage">
    <p class="error-text">{{ errorMessage }}</p>
  </div>
  <div class="create-task">
    <div class="input-field">
      <label>
        <input type="text" v-model="name" required />
        <span>Title</span>
      </label>
    </div>
    <div class="input-field">
      <label>
        <textarea cols="30" rows="5" v-model="description" required></textarea>
        <span>Details</span>
      </label>
    </div>
    <div class="deadline-activation">
      <p>Do you wish to add a deadline?</p>
      <input @click="showDeadline" class="deadline-checkbox" type="checkbox" />
    </div>
    <template v-if="deadlineToggle">
      <input class="deadline-date" type="date" min="{{ date }}" />
    </template>
    <button @click="addTask" class="create-button">Add Task</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

//Emit to refresh getTasks when new tasks are added
const emit = defineEmits(["refreshTasks"]);

// Arrow function para crear tareas.
const addTask = () => {
  if (name.value.length === 0 || description.value.length === 0) {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.
    showErrorMessage.value = true;
    errorMessage.value = "The task title or details are empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.
    taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";
    emits("refreshTasks");
  }
};

//Toggle deadline date selector
const deadlineToggle = ref(false);
const showDeadline = () => {
  deadlineToggle.value = !deadlineToggle.value;
};

//Date to determine minumum date possible in date picker input
const date = new Date();
console.log(date);
</script>

<style></style>
