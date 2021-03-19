<template>
  <main class="windApp">
    <DateMenu
      v-if="!dataMenu.datesChosen && !fetchingData"
      :minimumRangeInDays="dataMenu.minimumRangeInDays"
      :maximumRangeInDays="dataMenu.maximumRangeInDays"
      @dates-chosen="startAnimation"
      submitButtonText="Start animation">
    </DateMenu>
    <div v-else-if="dataMenu.datesChosen && fetchingData">
      <img src="../../assets/WindApp/loading.svg" class="w-16 mx-auto">
    </div>
    <WindAnimation v-else
      :stats="windCompassStats"
      @pick-new-date="dataMenu.datesChosen = false"
    ></WindAnimation>
  </main>
</template>

<script>
import DateMenu from '@/components/Home/WindApp/DateMenu.vue';
import WindAnimation from '@/components/Home/WindApp/WindAnimation.vue';

export default {
  components: {
    DateMenu,
    WindAnimation,
  },
  data() {
    return {
      dataMenu: {
        datesChosen: false,
        minimumRangeInDays: 1,
        maximumRangeInDays: 7,
      },
      fetchingData: false,
      windCompassId: 'i-a09e7854-83b5-11e9-bb41-7dd1da20f665',
      windCompassStats: null,
    };
  },
  methods: {
    async startAnimation(...args) {
      const [startDate, endDate] = args;
      this.dataMenu.datesChosen = true;
      this.fetchingData = true;
      const stats = await this.fetchStats(startDate, endDate);
      this.windCompassStats = stats.data;
      this.fetchingData = false;
    },
    async fetchStats(_startDate, _endDate) {
      const startDate = this.dateToUtcString(_startDate);
      const endDate = this.dateToUtcString(_endDate);
      const statsUrl = this.getStatsUrl(
        this.windCompassId,
        startDate,
        endDate,
      );
      const stats = await this.$http30MHz.get(statsUrl);
      return stats;
    },
    dateToUtcString(date) {
      return `${date.toISOString().split('.')[0]}Z`;
    },
    getStatsUrl(checkId, startDate, endDate) {
      let statsUrl = process.env.VUE_APP_30MHZ_API_STATS_ENDPOINT;
      statsUrl = statsUrl.replace('{checkId}', checkId);
      statsUrl = statsUrl.replace('{startDate}', startDate);
      statsUrl = statsUrl.replace('{endDate}', endDate);
      return statsUrl;
    },
  },
};
</script>

<style>
.windApp {
  @apply text-center;
  @apply py-16;
  @apply px-4;
}
</style>
