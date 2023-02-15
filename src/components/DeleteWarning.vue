<template>
  <div class="modal">
    <div class="warning-container">
      <div class="warning-text">
        <h2 class="alert-box">Warning</h2>
        <p>Are you sure you want to delete this task?</p>
      </div>
      <div class="warning-button">
        <button class="red-btn" @click="deleteTask">Yes</button>
        <button class="green-btn" @click="closeModalDeleteTask">No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { boolean } from "webidl-conversions";
import { useTaskStore } from "../stores/task";

// to access task store
const taskStore = useTaskStore();

//Function to delete task from modal
const deleteTask = () => {
  emit("emitDeleteTask", "emitCloseModal");
};

let falseValue = ref(false);

const closeModalDeleteTask = () => {
  emit("emitCloseModal", falseValue.value);
};

const emit = defineEmits(["emitDeleteTask"]);
</script>

<style scoped></style>
