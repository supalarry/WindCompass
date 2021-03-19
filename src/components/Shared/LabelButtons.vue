<template>
  <section class="labelButtons">
    <span class="labelButton border-r text-blue-dark-app">{{label}}</span>
    <span
      v-for="(button, index) in buttons"
      :key="index"
      :class="{
        'border-l': index !== 0,
        'text-blue-dark-app': button.name === currentChoice,
      }"
      class="labelButton cursor-pointer"
      @click="buttonClicked(button.name)">{{button.text}}</span>
  </section>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    buttons: {
      type: Array,
      required: true,
    },
    startValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      count: this.buttons.length,
      currentChoice: this.startValue,
    };
  },
  methods: {
    buttonClicked(name) {
      this.currentChoice = name;
      this.$emit('button-clicked', name);
    },
  },
};
</script>

<style>
.labelButtons {
  @apply rounded-md;
  @apply border;
  @apply flex;
  @apply justify-around;
  @apply items-center;
  @apply h-10;
}
.labelButton {
  flex-basis: 0;
  flex-grow: 1;
  @apply py-2;
  @apply text-gray-300;
  @apply h-10;
}
</style>
