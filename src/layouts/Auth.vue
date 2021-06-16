<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title><v-btn label="Register" text @click="goToHome()">TODO APP</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn label="Register" text @click="goToLogin()">Login </v-btn>
      <v-btn label="Register" text @click="goToRegister()">Register </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height fill-width" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "Master",
  methods:{
    goToHome(){
      this.$router.push('/'); 
    },
    goToLogin(){
      this.$router.push('/login'); 
    },
    goToRegister(){
      this.$router.push('/register'); 
    }
  },
  components: {},
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  computed:{
    ...mapGetters({
      authUser: "auth/mapGetters"
    })
  }
};
</script>
