<template>
  <nav>
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
    <div id="navbar-logo">
      <img src="../../public/checked.png" alt="logo" class="app-logo-nav" />
      <h3>TaskPro</h3>
    </div>
    <!-- <router-link to="/"> Home </router-link>

    <router-link to="/">Task Manager</router-link>

    <router-link to="/account">Your Account</router-link> -->
    <DropMenu />
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import DropMenu from "./DropMenu.vue";

const userStore = useUserStore();

//constant to save a variable that will hold the use router method

const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);

// const getUser = computed(() => useUserStore().user);

const username = ref("");

const getUsername = async () => {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
};
// constant that calls user email from the useUSerStore
const userEmail = ref("");
const getEmail = async () => {
  await userStore.fetchUser();
  userEmail.value = userStore.user.email;
};
getEmail();

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try {
    useUserStore().signOut;
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    await supabase.auth.signOut();
    if (error) throw error;
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;500;600&family=Roboto:wght@100;300;400;700&display=swap");
</style>
