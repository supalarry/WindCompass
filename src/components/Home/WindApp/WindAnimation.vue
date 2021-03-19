<template>
  <section>
    <WindCompass
      :data="currentDataShown"
      :arrowAnimationSpeed="sleepTime.current">
    </WindCompass>
    <LabelButtons
      :label="speedButtons.label"
      :buttons="speedButtons.buttons"
      :startValue="speedButtons.startValue"
      @button-clicked="changeSpeed"
      class="max-w-xs mx-auto mt-8">
    </LabelButtons>
    <div v-if="entryIndex !== entryCount" class="max-w-xs mx-auto h-10">
      <button
        class="button-blue-light w-1/2 mt-4 h-full"
        @click="pauseOrResume">{{controlButtonText}}</button>
    </div>
    <div v-else class="flex max-w-xs mx-auto h-10">
      <button
      class="button-blue-light mt-4 h-full flex-1 mr-1"
      @click="repeatAnimation">Replay</button>
      <button
      class="button-blue-light mt-4 h-full flex-1 ml-1"
      @click="pickNewDate">New date</button>
    </div>
  </section>
</template>

<script>
import WindCompass from '@/components/Home/WindApp/WindAnimation/WindCompass.vue';
import LabelButtons from '@/components/Shared/LabelButtons.vue';

export default {
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
  components: {
    WindCompass,
    LabelButtons,
  },
  data() {
    return {
      windData: Object.entries(this.stats),
      entryCount: 0,
      entryIndex: 0,
      currentDataShown: null,
      sleepTime: {
        current: 1000,
        slow: 3000,
        medium: 1000,
        fast: 500,
      },
      speedButtons: {
        label: 'Speed',
        buttons: [
          { name: 'slow', text: '▶' },
          { name: 'medium', text: '▶▶' },
          { name: 'fast', text: '▶▶▶' },
        ],
        startValue: 'medium',
      },
      pauseAnimation: false,
    };
  },
  methods: {
    async animateWindData() {
      while (this.entryIndex < this.entryCount) {
        /* eslint-disable no-await-in-loop */
        await this.sleep(this.sleepTime.current);
        /* eslint-enable no-await-in-loop */
        if (this.pauseAnimation) {
          return;
        }
        if (this.windData[this.entryIndex]) {
          this.currentDataShown = this.windData[this.entryIndex];
        }
        this.entryIndex += 1;
      }
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    changeSpeed(...args) {
      const [speed] = args;
      this.sleepTime.current = this.sleepTime[speed];
    },
    pauseOrResume() {
      this.pauseAnimation = !this.pauseAnimation;
      if (!this.pauseAnimation) {
        this.animateWindData();
      }
    },
    repeatAnimation() {
      this.entryIndex = 0;
      this.animateWindData();
    },
    pickNewDate() {
      this.$emit('pick-new-date');
    },
  },
  computed: {
    controlButtonText() {
      return this.pauseAnimation ? 'Resume' : 'Pause';
    },
  },
  created() {
    this.entryCount = this.windData.length;
    this.currentDataShown = this.windData[this.entryIndex];
    this.entryIndex += 1;
  },
  mounted() {
    this.animateWindData();
  },
};
</script>
