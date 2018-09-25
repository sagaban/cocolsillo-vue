<template>
  <q-page>

    <q-list highlight>
      <q-list-header>Month expenses</q-list-header>

      <q-item v-for="transaction in transactions" :key="transaction.id">
        <q-item-side left inverted color="secondary" icon="fas fa-plus" />
        <q-item-main :label="transaction.category.id" sublabel="Descripción"/>
        <q-item-side right>
          <q-item-tile stamp>{{transaction.date | format }}</q-item-tile><br>
          <q-item-tile class="text-red text-bold">{{transaction.amount}}</q-item-tile>
        </q-item-side>
      </q-item>
     
    </q-list>


    <q-btn
      round
      color="primary"
      size="lg"
      @click="addTransaction"
      class="fixed"
      icon="fas fa-plus"
      style="right: 18px; bottom: 18px"
    />
    
  </q-page>
</template>

<style>
</style>

<script>
import format from "date-fns/format";

export default {
  name: "PageHome",
  beforeCreate() {
    if (this.userProfile) {
      this.$store.dispatch("fetchMonthTransactions", new Date());
    }
  },
  computed: {
    fullName() {
      const userProfile = this.$store.getters.userProfile;
      return userProfile ? userProfile.fullName : "";
    },
    transactions() {
      // TODO: fetch categories. It's a referecen now
      return this.$store.getters.transactions;
    },
    userProfile() {
      return this.$store.getters.userProfile;
    }
  },
  watch: {
    userProfile(newProfile, oldProfile) {
      if (newProfile && !oldProfile) {
        this.$store.dispatch("fetchMonthTransactions", new Date());
      }
    }
  },
  methods: {
    addTransaction() {
      this.$q.notify("addTransaction");
    }
  },
  filters: {
    format(value) {
      //TODO: serialize this
      const formatted = format(new Date(value.seconds * 1000), "D-M-YYYY");
      console.log(`formatted: ${formatted}`);
      return formatted;
    }
  }
};
</script>
