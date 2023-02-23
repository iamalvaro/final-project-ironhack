<template>
  <div class="dropdown">
    <div class="drop-btn">
      <div class="btn-content">
        <img
          class="nav-profile-img"
          :src="
            avatar_url
              ? avatar_url
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
          "
          alt="Profile picture"
        />
        <p class="nav-account-name">
          <!-- {{ username ? username : username.split("@")[0] }} -->
          {{
            username.length > 12 ? username.substring(0, 12) + "..." : username
          }}
        </p>
      </div>
      <div class="dropdown-items">
        <router-link to="/"> Home </router-link>
        <router-link to="/account">Your Account</router-link>
        <a @click.prevent="() => completedTasks('completed')">
          Completed Tasks
        </a>
        <button @click="signOut">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { ref } from "vue";

const userStore = useUserStore();
const redirect = useRouter();

//Fetch Avatar image
const avatar_url = ref(null);

async function getAvatar() {
  await userStore.fetchUser();
  const { data, error } = await supabase.storage
    .from("avatars")
    .download(userStore.profile.image_src);
  avatar_url.value = URL.createObjectURL(data);
}
getAvatar();

//Link to completed tasks view

const emit = defineEmits(["viewCompleted"]);

const completedTasks = (viewValue) => {
  emit("viewCompleted", viewValue);
};

// constant to save a variable that will get the user from store with a computed function imported from vue
const username = ref("");

const getUsername = async () => {
  await userStore.fetchUser();
  return (username.value = userStore.profile.username);
};
getUsername();
// constant that calls user email from the useUSerStore
const userEmail = ref("");
const getEmail = async () => {
  await userStore.fetchUser();
  userEmail.value = userStore.user.email;
};
getEmail();

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.

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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;500;600&family=Roboto:wght@100;300;400;700&display=swap");
</style>
