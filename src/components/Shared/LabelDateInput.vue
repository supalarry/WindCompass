<template>
  <div class="labelDateInput">
    <label class="dateLabel" :for="`${name}-${label}`">{{label}}</label>
    <input
      class="dateInput"
      :id="`${name}-${label}`"
      type="date"
      v-model="value"
      :min="this.dateToInputValue(this.minValue)"
      :max="this.dateToInputValue(this.maxValue)"
      @blur="updated">
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    startValue: {
      type: Date,
      required: true,
    },
    maxValue: {
      type: Date,
    },
    minValue: {
      type: Date,
    },
  },
  data() {
    return {
      value: this.dateToInputValue(this.startValue),
    };
  },
  methods: {
    dateToInputValue(date) {
      if (!date) {
        return '';
      }
      const year = date.getFullYear();
      let month = (date.getMonth() + 1).toString();
      if (month.length === 1) {
        month = `0${month}`;
      }
      let day = date.getDate().toString();
      if (day.length === 1) {
        day = `0${day}`;
      }
      return `${year}-${month}-${day}`;
    },
    inputValueToDate() {
      const input = this.value.split('-');
      const [year, month, day] = input;
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return new Date(year, month - 1, day, hours, minutes, seconds);
    },
    updated() {
      this.$emit('updated', this.name, this.inputValueToDate());
    },
  },
};
</script>

<style>
.dateInput {
  @apply rounded-r-md;
  @apply w-full;
  @apply px-2;
  @apply text-blue-dark-app;
}
.labelDateInput {
  @apply flex;
  @apply justify-center;
  @apply max-w-xs;
  @apply mx-auto;
}
.dateLabel {
  @apply font-bold;
  @apply w-16;
  @apply py-2;
  @apply px-4;
  @apply rounded-l-md;
  @apply cursor-pointer;
};
</style>
