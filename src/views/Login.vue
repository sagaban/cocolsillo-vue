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
import fb from "@/firebase-manager";

export default {
  methods: {
    googleLogin() {
      fb.signInGoogleWithRedirect();
    }
  }
};
</script>

<style>
</style>
