<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="fas fa-bars"
        />

        <q-toolbar-title>
          Cocolsillo
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list no-border link inset-delimiter>
          <q-list-header>Navigation</q-list-header>
          <q-item to="/" exact>
            <q-item-side icon="fas fa-home" />
            <q-item-main label="Home" />
          </q-item>
          <q-item to="/about">
            <q-item-side icon="fas fa-info-circle" />
            <q-item-main label="About" />
          </q-item>
          <q-item @click.native="logout" class="absolute-bottom">
            <q-item-side icon="fas fa-sign-out-alt" />
            <q-item-main label="Logout" />
          </q-item>
        </q-list>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import fb from "@/firebase-manager";
import { SET_CURRENT_USER, SET_USER_PROFILE } from "@/store/mutation-types";

import { openURL } from "quasar";

export default {
  name: "LayoutDefault",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  methods: {
    openURL,
    logout() {
      const { $router, $store } = this;
      fb.auth
        .signOut()
        .then(function() {
          $store.commit(SET_CURRENT_USER, null);
          $store.commit(SET_USER_PROFILE, null);
          $router.push("/login");
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
