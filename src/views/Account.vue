<template>
  <Nav />
  <div class="account-container">
    <div class="account-container-row">
      <img
        class="profile-img"
        :src="
          avatar_url
            ? avatar_url
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
        "
        alt="Profile picture"
      />
      <div class="account-details">
        <h3 class="profile-details-heading">Username:</h3>
        <h3 class="profile-details">
          {{ username ? username.split("@")[0] : username }}
        </h3>
        <h3 class="profile-details-heading">Name:</h3>
        <h3 class="profile-details">
          {{ name }}
        </h3>
        <h3 class="profile-details-heading">Email:</h3>
        <h3 class="profile-details">{{ userEmail }}</h3>
        <h3 class="profile-details-heading">Website:</h3>
        <h3 class="profile-details">{{ website }}</h3>
      </div>
    </div>
    <button class="edit-profil-btn" @click="activateEditProfile">
      {{ editProfileButton }}
    </button>
    <template class="edit-profile" v-if="profileEditToggle">
      <div class="edit-profile-form">
        <label>
          <input v-model="newUsername" type="text" required />
          <span>Username</span>
        </label>
        <label>
          <input v-model="newName" type="text" required />
          <span>Name</span>
        </label>
        <label>
          <input v-model="newWebsite" type="text" required />
          <span>Website</span>
        </label>
        <!-- <img :src="avatar_url" alt="upload image" /> -->
        <label>
          <input v-model="newAvatar" type="image" required />
          <span>Avatar</span>
        </label>
        <button @click="submitProfileChanges">Submit Changes</button>
      </div>
    </template>
  </div>

  <TaskFooter />
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import { useRouter } from "vue-router";
import TaskFooter from "../components/TaskFooter.vue";

const userStore = useUserStore();

const redirect = useRouter();

// const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const userEmail = ref("");
const name = ref(null);

//VALUES FROM INPUTS
const newUsername = ref(null);
const newName = ref(null);

// const newEmail = ref(null);
const newWebsite = ref(null);
const newAvatar = ref(null);

onMounted(() => {
  getProfile();
});
//FETCH PROFILE FIELDS
async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  avatar_url.value = userStore.profile.avatar_url;
  website.value = userStore.profile.website;
  name.value = userStore.profile.name;
}

//FETCH EMAIL

const getEmail = async () => {
  await useUserStore().fetchUser();
  userEmail.value = useUserStore().user.email;
};
getEmail();

//Edit profile toggle

const profileEditToggle = ref(false);
const activateEditProfile = () => {
  profileEditToggle.value = !profileEditToggle.value;
};

//Edit profile button content
const editProfileButton = ref(
  profileEditToggle === true ? "Discard Edit" : "Edit Profile"
);
// const editProfileButton = () => {
//   if (profileEditToggle === true) {
//     return "Discard Edit";
//   } else {
//     return "Edit Profile";
//   }
// };

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

const submitProfileChanges = async () => {
  await userStore.editProfile(
    newUsername.value,
    newName.value,
    newWebsite.value,
    newAvatar.value
  );
  console.log("this works??");
  profileEditToggle.value = false;
};
</script>

<style></style>
