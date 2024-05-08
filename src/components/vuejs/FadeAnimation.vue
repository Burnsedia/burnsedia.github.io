<template>
  <div>
    <div v-motion-fade>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useMotionFade } from '@vueuse/motion';

export default defineComponent({
  setup() {
    const { fade } = useMotionFade();

    return {
      fade,
    };
  },
});
</script>
