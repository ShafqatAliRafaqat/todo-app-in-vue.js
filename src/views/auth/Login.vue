<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="indigo" dark flat>
          <v-toolbar-title>Login </v-toolbar-title>
        </v-toolbar>
        <validation-observer ref="form" v-slot="{ invalid }">
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <vee-input v-model="user.email" name="email" rules="required|email" label="Email" />
              <vee-input v-model="user.password" name="password" rules="required|min:8" label="Password" type="password" />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" align="right" color="primary" :disabled="invalid">Login</v-btn>
            </v-card-actions>
          </v-form>
        </validation-observer>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { ValidationObserver } from "vee-validate";
import { mapMutations } from "vuex";

export default {
  components: { ValidationObserver },

  methods: {
    ...mapMutations("auth", ["login"]),
    onSubmit() {
      this.$api
        .post("/login", this.user)
        .then( response =>  {
          this.handleAuth(response.data.data.user);
          this.$router.push({ name: "dashboard" });
        }).catch (err =>   {
            if (err.response) {
              this.validationErrors(err.response.data.message);
            }
            return "Something went wrong!";
          });
    },
    handleAuth(user) {
      this.login(user);
    },

    validationErrors(errors) {
      this.$refs.form.setErrors(errors);
    },
  },
  data: () => ({
    user: {
      email: "",
      password: "",
    },
  }),
};
</script>
