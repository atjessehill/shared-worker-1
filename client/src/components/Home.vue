<script setup>
import {useRoute} from 'vue-router';

const route = useRoute()
// const path = process.env.BASE_URL
// console.log(path)

function openInNewWindow(path) {
  const baseUrl = window.location.origin;

  // Resolve the full URL using the base URL and the given path
  const chart1 = `${baseUrl}/chart1`;
  const chart2 = `${baseUrl}/chart2`;
  const width = 800;
  const height = 600;

  // Open the URL in a new window
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;

  window.open(chart1, '_blank', 'width=800,height=600');
  window.open(chart2, '_blank', `width=800,height=300,left=${left},top=${top}`);
}

</script>

<template>
  <h1>Shared Worker Demo</h1>
  <p style="font-size: 1.25rem">This demo uses shared workers to synchronize data across multiple browser tabs. <br/>
    The shared worker executes a js class in the background which maintains a websocket connection with the server. When receiving new events, the shared worker sends the event to all open tabs.  
    <br/> 
    See this for yourself by opening <span><RouterLink to="/chart1" target="_blank">chart 1</RouterLink> </span> and <span><RouterLink to="/chart2" target="_blank">chart 2</RouterLink></span> and watch them synchronize
  </p>
  <img src="/diagram.png"/>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
