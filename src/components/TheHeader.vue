<template>
    <v-app-bar app color="indigo" dark>
      <div class="d-flex align-center">
       TODO APP
      </div>

      <v-spacer></v-spacer>

      <v-btn text @click="goToLogin()" v-if="!isLoggedIn">
        <span class="mr-2">Login</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn text @click="goToLogin()" v-if="!isLoggedIn">
        <span class="mr-2">Register</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn text @click="logout" v-if="isLoggedIn">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
export default {
 
  data: () => ({
    //
  }),
   methods:{
    // logout(){
        ...mapActions("auth", ["logout"]),
    // },
    goToLogin(){
      this.$router.push('/login'); 
    },
    goToRegister(){
      this.$router.push('/register'); 
    }
  },
  computed:{
    ...mapGetters({
      authUser: "auth/user",
       isLoggedIn: "auth/isLoggedIn"
    })
  },
  mounted(){
    console.log("this.authUser", this.isLoggedIn  );
  }
};
</script>