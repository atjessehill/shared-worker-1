import {EventBus} from '@/controller/EventBus'

class Poller {

    private static instance: Poller;
    private count: number = 0;

    private constructor() {
        console.log('poller instance created')
        void this.poll()
    }

    public static getInstance(): Poller {
        if (!Poller.instance) {
            Poller.instance = new Poller()
        }
        return Poller.instance
    }


    private async poll(): Promise<void> {
        setInterval(() => {
            const rand = Math.random()
            EventBus.emit('PollerIncrement', {'event': 'PollerIncrement'})
        }, 1000);
    }


}

export const poller = Poller.getInstance()