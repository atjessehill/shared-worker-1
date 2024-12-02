<script setup>
import {ref, onBeforeMount} from 'vue';
import {AgCharts} from 'ag-charts-vue3';
import {EventBus} from '@/controller/EventBus'
import { workerRequest } from '@/utils';

const options = ref({
         // Data: Data to be displayed in the chart
        data: [ ],
        // Series: Defines which chart type and data to use
        series: [{ type: 'line', xKey: 'time', yKey: 'price' }],
        axes: [
          {
            type: "number",
            position: "bottom",
            label: {
              rotation: 45,
              autoRotate: true,
              formatter: function(params) {
                var date = new Date(params.value * 1000);
                return date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString()
              }
            },
          },
          {
            type: "number",
            position: "left",
            label: {},
          },
        ]
        
})

EventBus.on('NewPrice', (event) => {
    options.value.data.push(event)
    options.value = {...options.value}
})

onBeforeMount(() => {
    console.log('before mount')
    workerRequest('loadPrices')
  .then((result) => {
    options.value.data = result.prices
    options.value = {...options.value}
})
  .catch((error) => console.error(error));
})


</script>
<template>
<h1>Line Chart</h1>
<AgCharts :options="options" style="width: 800px; height: 400px; display: block"></AgCharts>
</template>
