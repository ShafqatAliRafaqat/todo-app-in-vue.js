<template>
  <ValidationProvider :vid="name" :name="name" :rules="rules" v-slot="{ errors }">
    <v-select :items="items" :messages="errors.join('. ')" label="Standard"></v-select>
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
      required: true,
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
    items: ["Foo", "Bar", "Fizz", "Buzz"],
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
