<template>
  <div class="sign-container">
    <img src="/checked.png" alt="logo" class="app-logo" />
    <div class="sign-header">
      <h3 class="header-title">Register to TaskPro</h3>
      <p class="header-subtitle">Start organizing your tasks!</p>
    </div>

    <form @submit.prevent="signUp" class="form-sign-in">
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
        <div class="form-input">
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
          <label>
            <input
              :type="confirmPasswordToggle ? 'text' : 'password'"
              class="input-field"
              id="confirmPassword"
              v-model="confirmPassword"
              required
            />
            <span>Confirm Password</span>
            <span @click="showconfirmPassword" class="show-pw"
              ><i
                v-if="confirmPasswordToggle"
                class="fa-solid fa-eye-slash"
              ></i>
              <i v-else class="fa-solid fa-eye"></i
            ></span>
          </label>
        </div>
        <div class="form-input">
          <button class="button" type="submit" @click="confirmModalActivate">
            Sign Up
          </button>
        </div>
        <div class="go-to-other-sign">
          <p>
            Have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-up-link"
            />
          </p>
        </div>
      </div>
    </form>

    <div class="error-text" v-show="errorMsg">{{ errorMsg }}</div>
  </div>
  <template v-if="confirmModalToggle">
    <ConfirmModal @close-confirm-modal="closeModalParent" />
  </template>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import ConfirmModal from "./ConfirmModal.vue";

//confirm email modal
const confirmModalToggle = ref(false);

const confirmModalActivate = () => {
  confirmModalToggle.value = !confirmModalToggle.value;
};
//Close modal from emit
const closeModalParent = (boolValue) => {
  confirmModalToggle.value = boolValue;
};

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

//Show or hide password
const passwordToggle = ref(false);
const showPassword = () => {
  passwordToggle.value = !passwordToggle.value;
};
//Show or hide confirm password
const confirmPasswordToggle = ref(false);
const showconfirmPassword = () => {
  confirmPasswordToggle.value = !confirmPasswordToggle.value;
};

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style></style>
