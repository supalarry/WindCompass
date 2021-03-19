<template>
  <section class="windCompass" ref="windCompass">
    <div class="compassDisplay" ref="compassDisplay">
      <h1 class="text-blue-dark-app">{{humanReadableDirection}}</h1>
      <h1 class="text-blue-dark-app heading my-2">{{speed}}</h1>
      <h1 class="text-blue-dark-app">{{humanReadableDate}}</h1>
    </div>
    <img src="../../../../assets/WindApp/WindCompass/arrow.png"
    class="w-8 mx-auto arrow" ref="arrow">
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    arrowAnimationSpeed: {
      type: Number,
      required: true,
    },
  },
  computed: {
    humanReadableDate() {
      let date = new Date(parseInt(this.data[0], 10));
      date = date.toLocaleString('en-GB');
      return date.substring(0, date.length - 3);
    },
    humanReadableDirection() {
      const windDirection = this.data[1]['i_weathers.wind_direction'];
      if (windDirection > 11.25 && windDirection <= 33.75) {
        return 'NNE';
      }
      if (windDirection > 33.75 && windDirection <= 56.25) {
        return 'NE';
      }
      if (windDirection > 56.25 && windDirection <= 78.75) {
        return 'ENE';
      }
      if (windDirection > 78.75 && windDirection <= 101.25) {
        return 'E';
      }
      if (windDirection > 101.25 && windDirection <= 123.75) {
        return 'ESE';
      }
      if (windDirection > 123.75 && windDirection <= 146.25) {
        return 'SE';
      }
      if (windDirection > 146.25 && windDirection <= 168.75) {
        return 'SSE';
      }
      if (windDirection > 168.75 && windDirection <= 191.25) {
        return 'S';
      }
      if (windDirection > 191.25 && windDirection <= 213.75) {
        return 'SSW';
      }
      if (windDirection > 213.75 && windDirection <= 236.25) {
        return 'SW';
      }
      if (windDirection > 236.25 && windDirection <= 258.75) {
        return 'WSW';
      }
      if (windDirection > 258.75 && windDirection <= 281.25) {
        return 'W';
      }
      if (windDirection > 281.25 && windDirection <= 303.75) {
        return 'WNW';
      }
      if (windDirection > 303.75 && windDirection <= 326.25) {
        return 'NW';
      }
      if (windDirection > 326.25 && windDirection <= 348.75) {
        return 'NNW';
      }
      return 'N';
    },
    speed() {
      return `${this.data[1]['i_weathers.wind_speed'].toFixed(0)} km/h`;
    },
  },
  methods: {
    animateArrow() {
      const { windCompass } = this.$refs;
      const { compassDisplay } = this.$refs;
      const transition = `${(this.arrowAnimationSpeed - 200) / 1000}s ease-out`;
      compassDisplay.style.transition = transition;
      windCompass.style.transition = transition;
      let targetDirectionDegrees = this.data[1]['i_weathers.wind_direction'];
      if (360 - targetDirectionDegrees < targetDirectionDegrees) {
        targetDirectionDegrees = -(360 - targetDirectionDegrees);
      }
      windCompass.style.transform = `rotate(${targetDirectionDegrees}deg)`;
      compassDisplay.style.transform = `rotate(${targetDirectionDegrees * -1}deg)`;
    },
  },
  watch: {
    data() {
      this.animateArrow();
    },
  },
  mounted() {
    this.animateArrow();
  },
};
</script>

<style>
.windCompass {
  @apply relative;
  @apply inline-flex;
}
.compassDisplay {
  @apply w-64;
  @apply h-64;
  @apply rounded-full;
  @apply border-4;
  @apply border-gray-300;
  @apply flex;
  @apply flex-col;
  @apply justify-center;
  @apply items-center;
  @apply mx-auto;
  border-style: double;
}
.arrow {
  transform: rotate(90deg) translateX(-50%);
  @apply absolute;
  @apply top-0;
  @apply right-0;
  @apply left-0;
}
</style>
