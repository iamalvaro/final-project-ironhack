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
  /* position: fixed; */
  /* top: 0; */
  /* left: 0;
  right: 0;
  bottom: 0;
  margin: 1rem -1rem -1rem; */
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #e0e0e0;
}
</style>
