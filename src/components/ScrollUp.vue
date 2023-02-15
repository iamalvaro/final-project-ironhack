<template>
  <div @click="scrollToTop" class="scroll-up">
    <i class="fa-solid fa-arrow-up"></i>
  </div>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// const app = new Vue({
//   el: "#app",
//   data() {
//     return {
//       scTimer: 0,
//       scY: 0,
//     };
//   },
//   mounted() {
//     window.addEventListener("scroll", this.handleScroll);
//   },
//   methods: {
//     handleScroll: function () {
//       if (this.scTimer) return;
//       this.scTimer = setTimeout(() => {
//         this.scY = window.scrollY;
//         clearTimeout(this.scTimer);
//         this.scTimer = 0;
//       }, 100);
//     },
//     toTop: function () {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     },
//   },
// });
</script>

<style scoped>
.scroll-up {
  width: 2.5rem;
  height: 2.5rem;
  bottom: 5rem;
  right: 1.5rem;
  position: fixed;
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* align-content: center; */
  color: var(--colorLightGrey);
  background-color: var(--colorBrokenWhite);
  border-radius: 50%;
  padding: 0.5rem;
  /* text-shadow: 1px 3px grey; */
  cursor: pointer;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}
.scroll-up:hover {
  color: var(--colorDarkGrey);
  font-size: 2.6rem;
}
</style>
