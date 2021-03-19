<template>
  <section class="menu">
    <h1 class="heading text-blue-dark-app">Get insights</h1>
    <transition name="fade">
      <div v-if="error" class="errorContainer">
        <h1>{{error}}</h1>
      </div>
    </transition>
    <div class="dateContainer">
      <LabelDateInput
        :label="dateInputs.from.label"
        :name="dateInputs.from.name"
        :startValue="dateInputs.from.value"
        @updated="saveDate"
        class="border-b">
      </LabelDateInput>
      <LabelDateInput
        :label="dateInputs.to.label" class="mt-1"
        :name="dateInputs.to.name"
        :startValue="dateInputs.to.value"
        :maxValue="dateInputs.to.maxValue"
        @updated="saveDate">
      </LabelDateInput>
    </div>
    <button
      class="button-blue-light mt-8"
      @click="datesChosen">
      {{submitButtonText}}
    </button>
  </section>
</template>

<script>
import LabelDateInput from '@/components/Shared/LabelDateInput.vue';

export default {
  props: {
    minimumRangeInDays: {
      type: Number,
      required: true,
    },
    maximumRangeInDays: {
      type: Number,
      required: true,
    },
    submitButtonText: {
      type: String,
      default: 'Submit',
    },
  },
  components: {
    LabelDateInput,
  },
  data() {
    return {
      dateInputs: {
        from: {
          label: 'From',
          name: 'from',
          value: this.yesterdaysDate(),
        },
        to: {
          label: 'To',
          name: 'to',
          value: new Date(),
          maxValue: new Date(),
        },
      },
      error: null,
    };
  },
  methods: {
    yesterdaysDate() {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date;
    },
    saveDate(...args) {
      const [name, date] = args;
      this.dateInputs[name].value = date;
      this.syncOtherDateWith(name);
    },
    syncOtherDateWith(updatedDate) {
      const outdated = updatedDate === 'from' ? 'to' : 'from';
      this.dateInputs[outdated].value.setHours(this.dateInputs[updatedDate].value.getHours());
      this.dateInputs[outdated].value.setMinutes(this.dateInputs[updatedDate].value.getMinutes());
      this.dateInputs[outdated].value.setSeconds(this.dateInputs[updatedDate].value.getSeconds());
      this.dateInputs[outdated].value.setMilliseconds(
        this.dateInputs[updatedDate].value.getMilliseconds(),
      );
    },
    datesChosen() {
      if (this.validDateRange()) {
        this.$emit('dates-chosen',
          this.dateInputs.from.value,
          this.dateInputs.to.value);
      }
    },
    validDateRange() {
      this.error = null;
      const millisecondsDiffference = this.dateInputs.to.value - this.dateInputs.from.value;
      if (millisecondsDiffference < 0) {
        this.error = 'From must be before To';
      } else if (millisecondsDiffference < (86400000 * this.minimumRangeInDays)) {
        this.error = `Minimum range is ${this.minimumRangeInDays} 
        ${this.daysPluralOrSingular(this.minimumRangeInDays)}`;
      } else if (millisecondsDiffference > (86400000 * this.maximumRangeInDays)) {
        this.error = `Maximum range is ${this.maximumRangeInDays} 
        ${this.daysPluralOrSingular(this.maximumRangeInDays)}`;
      }
      if (this.error) {
        setTimeout(() => {
          this.error = null;
        }, 4000);
        return false;
      }
      return true;
    },
    daysPluralOrSingular(days) {
      if (days < 2) {
        return 'day';
      }
      return 'days';
    },
  },
  created() {
    this.syncOtherDateWith('from');
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.errorContainer {
  @apply w-64;
  @apply bg-red-500;
  @apply text-white-app;
  @apply rounded-md;
  @apply mx-auto;
  @apply mt-8;
  @apply py-2;
}
.menu {
  @apply relative;
}
.dateContainer {
  @apply w-full;
  @apply max-w-xs;
  @apply shadow;
  @apply mx-auto;
  @apply mt-8;
  @apply rounded-md;
  @apply p-4;
};
</style>
