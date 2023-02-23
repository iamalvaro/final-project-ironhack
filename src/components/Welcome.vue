<template>
  <div class="welcome-container">
    <h2>Create your first Task</h2>
    <div class="welcome-img">
      <img src="../../public/notepad.png" alt="" />
    </div>
    <p>
      Increase your productivity by staying on top of your tasks with TaskPro
    </p>
  </div>
</template>

<script setup>
// const title = ref("");
// const subheading = ref("");
</script>

<style scoped>
.welcome-container {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.welcome-container > h2 {
  font-size: 2rem;
}
.welcome-container > p {
  font-size: 1.4rem;
  text-align: center;
  width: 30rem;
}
.welcome-img > img {
  width: 13rem;
  margin: 1rem 0 0 4rem;
}
</style>
