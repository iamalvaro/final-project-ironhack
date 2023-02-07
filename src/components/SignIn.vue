<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="sign-container">
    <img src="../../public/completed-task.png" alt="logo" class="app-logo" />
    <div class="sign-header">
      <h3 class="header-title">Log In to TaskAdmin Xtreme</h3>
      <p class="header-subtitle">Enter your details to access your tasks</p>
    </div>
    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-input">
          <input
            type="password"
            class="input-field"
            placeholder="Enter your password"
            id="password"
            v-model="password"
            required
          />
        </div>
        <div class="form-input">
          <button class="button" type="submit">Sign In</button>
        </div>
      </div>
    </form>
    <div class="go-to-other-sign">
      <p>
        Dont have an account?
        <PersonalRouter
          :route="route"
          :buttonText="buttonText"
          class="sign-up-link"
        />
      </p>
    </div>
    <div v-show="errorMsg">{{ errorMsg }}</div>
  </div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";
const errorMsg = ref("");
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = error.message;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;500;600&family=Roboto:wght@100;300;400;700&display=swap");
</style>
