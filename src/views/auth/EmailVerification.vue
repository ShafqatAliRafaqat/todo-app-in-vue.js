<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="indigo" dark flat>
          <v-toolbar-title>Email Verification </v-toolbar-title>
        </v-toolbar>
        <validation-observer ref="form" v-slot="{ invalid }">
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
              <vee-input v-model="user.code" name="code" rules="required|min:6|max:6" label="Code" />
              <v-p>Check your Email. <v-b class="bold">Enter 6 Digit Verfication Code</v-b> </v-p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" align="right" color="primary" :disabled="invalid">Verify</v-btn>
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
        .then((response) => {
          this.handleAuth(response.data.data);
          this.$router.push({ name: "dashboard" });
        })
        .catch((error) => {
          this.validationErrors(error.response.data.errors);
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
      code: "",
      user_id: "",
    },
  }),
};
</script>
<style>
.bold{
    font-weight: bold;
}
</style>