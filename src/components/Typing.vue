<script setup>
import { onMounted, ref } from 'vue'
import Typewriter from 'typewriterjs'

const el = ref(null)

onMounted(() => {
  if (!el.value) return; // ✅ safety check

  new Typewriter(el.value, {
    strings: ['Mobile', 'Web', 'AI', 'More'],
    autoStart: true,
    loop: true,
    delay: 75,
    deleteSpeed: 50,
  });
});
</script>

<template>
  <div ref="el" class="text-white text-6xl px-3"></div>
</template>
