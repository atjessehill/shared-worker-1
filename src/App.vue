<script setup>
  import { RouterLink, RouterView } from 'vue-router' 
  import {poller} from '@/controller/Poller.ts'

  const worker = new SharedWorker('src/scripts/worker.js', {type: "module"})

  worker.port.onmessage = handleNewMessage


  function handleNewMessage(event) {


  }

</script>

<template>
  <RouterView/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
