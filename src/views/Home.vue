<template>
  <div class="home overflow-x-hidden">
    <Banner
      :heading="Banner.heading"
      :description="Banner.description">
    </Banner>
    <WindApp></WindApp>
  </div>
</template>

<script>
import Banner from '@/components/Home/Banner.vue';
import WindApp from '@/components/Home/WindApp.vue';

export default {
  name: 'Home',
  components: {
    Banner,
    WindApp,
  },
  data() {
    return {
      Banner: {
        heading: 'Wind compass',
        description: 'Wind speed & direction presented interactively',
      },
    };
  },
};
</script>

<style>
.home {
  @apply h-full;
}
</style>
