import {EventBus} from '@/controller/EventBus'

class Prices {

    private static instance: Prices;
    // private constructor ensures `new Prices` can't be called from outside of the class.
    private constructor() {
        void this.poll()
    }

    public static getInstance(): Prices {
        if (!Prices.instance) {
            Prices.instance = new Prices()
        }
        return Prices.instance
    }


    public async poll(): Promise<void> {
    
        setInterval(() => {
            const price = Math.random()
            EventBus.emit('NewPrice', {'ticker': 'APPL', 'price': price})
        }, 1000);
    }


}

export const prices = Prices.getInstance()