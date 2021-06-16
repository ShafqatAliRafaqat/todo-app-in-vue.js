<template>
  <ValidationProvider :vid="name" :name="name" :rules="rules" v-slot="{ errors }">
    <v-datetime-picker :label="label" :name="label" :prepend-icon="prependIcon" :append-icon="appendIcon" :datetime="modelValue" @input="updateDatetime" :messages="errors.join('. ')" class="pa-0" />
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from "vee-validate/dist/vee-validate.full";

export default {
  components: { ValidationProvider },
  props: {
    value: {
      required: true,
      type: [Date, String],
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
    timeProps: {
      useSeconds: true,
      ampmInTitle: true,
      format: "24hr",
    },
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
  methods: {
    updateDatetime(date) {
      this.modelValue = date;
    },
  },
  mounted() {
    if (this.value) {
      this.modelValue = this.value;
    }
  },
};
</script>

<style>
.v-messages__message {
  color: red;
}
</style>
