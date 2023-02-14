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
        <p>{{ userEmail.split("@")[0] }}</p>
      </div>
      <div class="dropdown-items">
        <router-link to="/"> Home </router-link>
        <router-link to="/account">Your Account</router-link>
        <button @click="signOut">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { ref } from "vue";

const userStore = useUserStore();
const redirect = useRouter();

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

.dropdown {
  position: relative;
  display: inline-block;
  /* float: right; */

  right: 0;
  margin: 0.7rem 0 0 0;
}
/* Dropdown Button- Main body div */
.drop-btn {
  background-color: #0aa06e;
  color: var(--colorBrokenWhite);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 3rem;
}
.btn-content {
  display: flex;
  gap: 2rem;
  justify-content: space-around;
  align-items: center;
}
.nav-profile-img {
  width: 3rem;
  border-radius: 50%;
}
.drop-btn > p {
  font-size: 1rem;
}
.drop-btn:hover {
  border-radius: 2rem 2rem 0 0;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-items {
  display: none;
  position: absolute;
  background-color: var(--colorBrokenWhite);
  min-width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
  border-radius: 0 0 2rem 2rem;
}
/* Links inside the dropdown */
.dropdown-items a {
  color: var(--colorDarkGrey);
  padding: 1rem 1rem;
  text-decoration: none;
  display: block;
  text-align: left;
}
.dropdown-items button {
  width: 100%;
  padding: 0.7rem 0;
  border-radius: 0 0 2rem 2rem;
  border-color: var(--colorRed);
  color: var(--colorRed);
  cursor: pointer;
}
.dropdown-items button:hover {
  background-color: var(--colorRed);
  color: var(--colorBrokenWhite);
}
/* Change color of dropdown links on hover */
.dropdown-items a:hover {
  background-color: #ddd;
}
/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-items {
  display: block;
}
/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-items {
  display: block;
}
</style>
