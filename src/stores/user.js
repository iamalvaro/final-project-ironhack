import { defineStore } from "pinia";
import { supabase } from "../supabase";

// Esta tienda utiliza el Options API
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null,
    // avatarPath: null
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      if(user) {
        this.user = user;
        const { data: profile } = await supabase
        .from('profiles')
        .select()
        .match({ user_id: this.user.id })

        if (profile) { this.profile = profile[0];
          const {data, error} = await supabase.storage
          .from("avatars")
          .download(this.profile.image_src);
          if (data) this.avatarPath = URL.createObjectURL(data);          
        }
        // console.log('user in store: ', this.user);
        // console.log('profile in store: ', this.profile);
      }
      return user;
    },

    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);

        const { data: profile } = await supabase.from('profiles').insert([
          {
            user_id: this.user.id,
            username: email
          }
        ])
      }
    },

    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      },
      {
        shouldCreateUser: false,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        const { data: profile } = await supabase
        .from('profiles')
        .select()
        .match({ user_id: this.user.id })

        if (profile) this.profile = profile[0];
        console.log('profile in store: ', profile);
      }
    },

    async editProfile(newUsername, newName, newWebsite, newAvatar) {
      if (newUsername === null){
        newUsername = this.profile.username;
      }
      if (newName === null){
        newName = this.profile.name;
      }
      if (newWebsite === null){
        newWebsite = this.profile.website;
      }
      const {data: profile, error} = await supabase
      .from('profiles')
      .update({
        username: newUsername,
        name: newName,       
        website: newWebsite,
        image_src: newAvatar,
      })
      .match({user_id: this.user.id})
    },

    // async uploadAvatar(newAvatar){
    //   const {data, error} = await supabase
    //   .from('profiles')
    //   .update({
    //     image_src: newAvatar,
    //   })
    // },

    async signOut(){
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
