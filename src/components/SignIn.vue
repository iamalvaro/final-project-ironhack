<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="sign-container">
    <img src="/checked.png" alt="logo" class="app-logo" />
    <div class="sign-header">
      <h3 class="header-title">Log In to TaskPro</h3>
      <p class="header-subtitle">Enter your details to access your tasks</p>
    </div>
    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <label>
            <input
              type="email"
              class="input-field"
              id="email"
              v-model="email"
              required
            />
            <span>Email</span>
          </label>
        </div>
        <div class="form-input pwd">
          <label>
            <input
              :type="passwordToggle ? 'text' : 'password'"
              class="input-field"
              id="password"
              v-model="password"
              required
            />
            <span>Password</span>
            <span @click="showPassword" class="show-pw"
              ><i v-if="passwordToggle" class="fa-solid fa-eye-slash"></i>
              <i v-else class="fa-solid fa-eye"></i
            ></span>
          </label>
        </div>
        <div class="form-input">
          <div class="error-text" v-show="errorMsg">{{ errorMsg }}</div>
          <button class="button" type="submit">Sign In</button>
        </div>
      </div>
    </form>
    <div class="go-to-other-sign">
      <p>
        Don't have an account?
        <PersonalRouter
          :route="route"
          :buttonText="buttonText"
          class="sign-up-link"
        />
      </p>
    </div>
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
//Show or hide password
const passwordToggle = ref(false);
const showPassword = () => {
  passwordToggle.value = !passwordToggle.value;
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;500;600&family=Roboto:wght@100;300;400;700&display=swap");
</style>
