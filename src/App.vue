<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <notifications position="top right" class="mt-5" :closeOnClick="true" />
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
  
};
</script>
