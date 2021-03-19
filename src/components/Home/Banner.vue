<template>
  <section class="banner text-white-app">
    <div class="logoContainer">
      <img src="../../assets/Home/compass.svg" class="w-10">
    </div>
    <h1 class="heading z-10">{{heading}}</h1>
    <p class="description z-10">{{description}}</p>
    <div class="slanted-overlay"></div>
  </section>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.banner {
  @apply bg-white-app;
  @apply flex;
  @apply flex-col;
  @apply items-center;
  @apply justify-center;
  @apply h-1/2;
  @apply relative;
  @apply text-center;
  @apply px-4;
}

.slanted-overlay {
  @apply absolute;
  @apply w-full;
  @apply h-full;
  background: rgb(89,202,243);
  background: linear-gradient(0deg, rgba(89,202,243,1) 0%, rgba(114,166,250,1) 100%);
  @apply top-0;
  @apply left-0;
  transform-origin: bottom right;
  transform: skewY(2.5deg);
}

.logoContainer {
  @apply z-10;
  @apply mx-auto;
  @apply absolute;
  @apply top-0;
  @apply bg-white-app;
  @apply px-4;
  @apply py-2;
  @apply rounded-b-md;
}
</style>
