<template>
  <v-app>
    <TheHeader />
    <v-main>
      <router-view />
    </v-main>
    <notifications />
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
