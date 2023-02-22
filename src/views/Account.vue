<template>
  <Nav />
  <div class="account-container">
    <div class="account-container-row">
      <div class="image-container">
        <img
          class="profile-img"
          :src="
            avatar_url
              ? avatar_url
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
          "
          alt="Profile picture"
        />
        <template class="edit-profile" v-if="profileEditToggle">
          <input
            type="file"
            accept=".jpg,.png,.gif"
            class="solo-btn"
            @change="uploadAvatar"
          />
        </template>
      </div>
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
        <h3 class="profile-details-heading">Complete Tasks:</h3>
        <h3 class="profile-details">{{ completedCount.length }}</h3>
      </div>
    </div>
    <button
      v-if="profileEditToggle === true"
      class="edit-profil-btn"
      @click="activateEditProfile"
    >
      Discard Changes
    </button>
    <button v-else class="edit-profil-btn" @click="activateEditProfile">
      Edit Profile
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
        <label> </label>
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
import { useTaskStore } from "../stores/task";

const userStore = useUserStore();
const taskStore = useTaskStore();

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
const newWebsite = ref(null);
const newAvatar = ref(null);

onMounted(() => {
  getProfile();
});
//FETCH PROFILE FIELDS
async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  website.value = userStore.profile.website;
  name.value = userStore.profile.name;

  const { data, error } = await supabase.storage
    .from("avatars")
    .download(userStore.profile.image_src);
  avatar_url.value = URL.createObjectURL(data);
}

//FETCH EMAIL

const getEmail = async () => {
  await useUserStore().fetchUser();
  userEmail.value = useUserStore().user.email;
};
getEmail();

//Logic to bring complete task count
// defineProps({ completeCount: string });

const completedCount = ref([]);

const getCompletedCount = async () => {
  await taskStore.fetchTasks();
  completedCount.value = taskStore.completeArr;
};
getCompletedCount();

//Edit profile toggle

const profileEditToggle = ref(false);
const activateEditProfile = () => {
  profileEditToggle.value = !profileEditToggle.value;
};

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
  // console.log("this works??");
  profileEditToggle.value = false;
  getProfile();
};

//AVATAR UPLOAD TO DATABASE

const uploadAvatar = async (e) => {
  const files = e.target.files;

  //loading.value = true;
  if (!files || !files.length === 0) {
    throw new Error("Please select nad image to upload");
  }
  const file = files[0];
  //Batucada.png -> .png
  const fileExt = file.name.split(".").pop();
  const filePath = `${Math.random()}.${fileExt}`;

  let { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  newAvatar.value = filePath;

  // await userStore.uploadAvatar(newAvatar.value);

  const { data, error } = await supabase.storage
    .from("avatars")
    .download(filePath);
  avatar_url.value = URL.createObjectURL(data);
};
</script>

<style scoped>
.account-container {
  min-height: 71vh;
}
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.solo-btn {
  border: none;
  margin: 0;
  padding: 0rem 0 2.5rem 1rem;
  color: var(--colorLightGrey);
  width: 70%;
}
input::file-selector-button {
  /* font-weight: bold; */
  color: var(--colorLightGrey);
  padding: 0.5em;
  border: 2px solid var(--colorLightGrey);
  border-radius: 2.5rem;
  font-family: Montserrat;
  cursor: pointer;
}
input::file-selector-button:hover {
  border: 2px solid var(--colorGreen);
  color: var(--colorGreen);
}
.solo-btn > button {
  border: 2px solid var(--colorLightGrey);
}
/* .masked-input {
  opacity: 0;
  display: none;
  position: relative;
  z-index: 2;
} */
/* .mask-input {
  position: absolute;
  top: -8px;
} */
</style>
