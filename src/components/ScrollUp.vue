<template>
  <div @click="scrollToTop" ref="scrollUp" class="scroll-up">
    <i class="fa-solid fa-arrow-up"></i>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeMount } from "vue";

const scrollUp = ref();

const showOnScroll = () => {
  if (window.scrollY > 400) {
    scrollUp.value.classList.add("show-btn");
  } else {
    scrollUp.value.classList.remove("show-btn");
  }
};

onMounted(() => {
  window.addEventListener("scroll", showOnScroll);
});
onBeforeMount(() => {
  window.removeEventListener("scroll", showOnScroll);
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style scoped>
.scroll-up {
  width: 2.5rem;
  height: 2.5rem;
  bottom: 5rem;
  right: 1rem;
  position: fixed;
  font-size: 2.5rem;
  color: var(--colorLightGrey);
  background-color: var(--colorBrokenWhite);
  border-radius: 50%;
  padding: 0.5rem;
  display: none;
  cursor: pointer;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  opacity: 0.9;
}
.scroll-up:hover {
  color: var(--colorDarkGrey);
  font-size: 2.6rem;
  opacity: 1;
}

.show-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
