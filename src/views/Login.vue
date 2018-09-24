<template>
  <div class="fixed-center">
    <q-btn 
      align="center"
      icon="fab fa-google"
      label="Log in with google"
      @click="googleLogin"
    />
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { $router } = this;
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(() => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // const token = result.credential.accessToken;
          // The signed-in user info.
          // const user = result.user;
          $router.push("/");
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  }
};
</script>

<style>
</style>
