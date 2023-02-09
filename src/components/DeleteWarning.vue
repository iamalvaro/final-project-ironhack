<template>
  <div class="modal">
    <div class="warning-container">
      <div class="warning-text">
        <h2 class="alert-box">Warning</h2>
        <p>Are you sure you want to delete this task?</p>
      </div>
      <div class="warning-button">
        <button @click="deleteTask">Yes</button>
        <button @click="deleteTask.value = false">No</button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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

.warning-button {
  display: flex;
  gap: 2rem;
}
.warning-button > * {
  /* padding: 0.5rem 2rem; */
  width: 4.5rem;
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
