<template>
  <q-page class="flex flex-center">
    fullName: {{fullName}}
    <img alt="Quasar logo" src="../assets/logo.png">
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: "PageHome",
  computed: {
    fullName() {
      const userProfile = this.$store.getters.userProfile;
      return userProfile ? userProfile.fullName : "";
    }
  }
};
</script>
