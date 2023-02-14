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

<style scoped>
.modal {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.598);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
}
.alert-box {
  margin: 2rem 0 1.5rem 0;
}
.warning-button {
  display: flex;
  gap: 2rem;
  margin: 1rem 0 0 0;
}
.warning-button > * {
  width: 4.5rem;
}
.red-btn {
  padding: 1rem;
  border: 2px solid var(--colorRed);
  color: var(--colorRed);
}
.red-btn:hover {
  background-color: var(--colorRed);
  color: var(--colorBrokenWhite);
}
.green-btn {
  border: 2px solid var(--colorGreen);
  color: var(--colorGreen);
}
.green-btn:hover {
  background-color: var(--colorGreen);
  color: var(--colorBrokenWhite);
}

.warning-container {
  display: flex;
  border-radius: 1rem;
  flex-direction: column;
  align-items: center;
  background-color: var(--colorBrokenWhite);
  width: 50%;
  height: 30vh;
  padding: 1.5rem;
  margin: 1rem auto;
}
</style>
