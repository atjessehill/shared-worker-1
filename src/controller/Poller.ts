import {EventBus} from '@/controller/EventBus'

class Poller {

    private static instance: Poller;
    private count: number = 0;
    // private constructor ensures `new Poller` can't be called from outside of the class.
    private constructor() {
        console.log('poller instance created')
        void this.poll
    }

    public static getInstance(): Poller {
        if (!Poller.instance) {
            Poller.instance = new Poller()
        }
        return Poller.instance
    }


    public async poll(): Promise<void> {
    
        setInterval(() => {
            this.count++;
            EventBus.emit('PollerIncrement', {'event': 'PollerIncrement'})
        }, 1000);
    }


}

export const poller = Poller.getInstance()