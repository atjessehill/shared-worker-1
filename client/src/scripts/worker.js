import {prices} from '@/controller/Prices.ts'
import {EventBus} from '@/controller/EventBus'

let browserInstances = [];

EventBus.on('NewPrice', (event) => {
    browserInstances.map(instance => {
        instance.postMessage(event)
    })
})


onconnect = function(e) {
    
    const port = e.ports[0];

    browserInstances.push(port);


    // port.postMessage(prices.loadHistoricPrices)
    port.onmessage = function(event) {

        const {data} = event
        const resp = prices.loadHistoricPrices
        port.postMessage({...resp, responseId: data.requestId})
        // if(event)

        // iterates over registered browser instances and sends the message
        // browserInstances.map(instance => {
        //     instance.postMessage(data)
        // })
    }

}
