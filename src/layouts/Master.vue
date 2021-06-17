<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title class="cursor-pointer" @click="$router.push({ name: 'home' })">TODO CRM</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <notifications position="top right" class="mt-5" :closeOnClick="true" />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Master",
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  methods: {
    ...mapActions("auth", ["logout"]),
  },
  mounted() {
    // localStorage.clear()
    // @ts-ignore
    console.log('this.authUser', this.authUser);
  },
   computed:{
    ...mapGetters({
      authUser: "auth/user"
    })
  }
};
</script>
