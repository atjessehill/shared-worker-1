import {EventBus} from '@/controller/EventBus.ts'

const worker = new SharedWorker('src/scripts/worker.js', {type: "module"});
worker.port.start(); // Start the port for communication

function handleNewMessage(event) {
    EventBus.emit(event.data.event, event.data)
}

worker.port.onmessage = handleNewMessage

export function workerRequest(action: string, payload: Object) {
    return new Promise((resolve, reject) => {
        const requestId = Date.now().toString()

        const handleMessage = (event) => {
            console.log(event)
            const data = event.data;
            if (data.responseId === requestId) {
                worker.port.removeEventListener('message', handleMessage);
                resolve(data)
            } 
        };

        worker.port.addEventListener('message', handleMessage);

        // Send the request
        worker.port.postMessage({ requestId, action, payload });
    })
}