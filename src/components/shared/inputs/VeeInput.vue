<template>
  <ValidationProvider :vid="name" :name="name" :rules="rules" v-slot="{ errors }">
    <v-text-field :label="label" :name="label" :prepend-icon="prependIcon" :append-icon="appendIcon" :type="type" v-model="modelValue" :messages="errors.join('. ')" class="pa-0"> </v-text-field>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";

export default {
  components: { ValidationProvider },
  props: {
    value: {
      required: true,
    },
    name: {
      required: false,
    },
    rules: {
      type: [String, Object],
    },
    label: String,
    prependIcon: String,
    appendIcon: String,
    type: {
      type: String,
      default: "text",
    },
  },
  data: () => ({
    modelValue: "",
  }),
  watch: {
    value(val) {
      this.modelValue = val;
      this.$emit("input", val);
    },
    modelValue(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style>
.v-messages__message {
  color: red;
}
</style>
