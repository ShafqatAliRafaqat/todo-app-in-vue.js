<template>
  <v-app>
    <TheHeader />
    <v-main>
      <router-view />
    </v-main>
    <notifications position="top right" class="mt-5" :closeOnClick="true" />
    <TheFooter/>
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";
export default {
  name: "App",
 components: {
    TheHeader,
    TheFooter
  },
  data: () => ({
    //
  }),
  
};
</script>
