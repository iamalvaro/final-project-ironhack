<template>
  <div class="modal">
    <div class="warning-container">
      <div class="warning-text">
        <h2 class="alert-box">Warning</h2>
        <p>Are you sure you want to delete this task?</p>
      </div>
      <div class="warning-button">
        <button class="red-btn" @click="deleteTask">Yes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["closeConfirmModal"]);

let falseValue = ref(false);

const closeConfirmEmail = () => {
  emit("closeConfirmModal", falseValue.value);
};
</script>

<style scoped></style>
