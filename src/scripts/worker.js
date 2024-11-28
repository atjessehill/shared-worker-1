import {poller} from '@/controller/Poller.ts'
import {EventBus} from '@/controller/EventBus'

let browserInstances = [];

EventBus.on('PollerIncrement', () => {
    console.log('check incremented poller', poller.count)
    browserInstances.map(instance => {
        instance.postMessage(poller.count)
    })

})

onconnect = function(e) {
    
    const port = e.ports[0];

    browserInstances.push(port);

    port.onmessage = function({data}) {
        console.log(data)
        browserInstances.map(instance => {
            instance.postMessage(data)
        })
    }

}
