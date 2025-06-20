<script setup>
import { onMounted } from 'vue';
import Typewriter from 'typewriter-effect/dist/core';

onMounted(() => {
  new Typewriter('#typewriter-vue', {
    strings: ['Mobile', 'Web'],
    autoStart: true,
    loop: true,
    delay: 75,
    deleteSpeed: 50,
  });
});
</script>

<template>
  <div id="typewriter-vue" class="text-white text-6xl px-3"></div>
</template>
