<template>
  <div class="footer">
    <p>Copyright ⓒ {{ year }}</p>
  </div>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background-color: #303030;
  display: flex;
  width: 100%;
  margin: 3rem -1rem -1rem;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #e0e0e0;
}
</style>
