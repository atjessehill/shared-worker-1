import {EventBus} from '@/controller/EventBus'

class Prices {

    private static instance: Prices;
    private time: number = 0;
    private _prices: any[] = []
    private _ticker: string = 'APPL'

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


    get prices(){
        return this._prices
    }

    get loadHistoricPrices(){
        return {'event': 'historicPrices', 'ticker': this._ticker, 'prices': this._prices}
    }

    public async poll(): Promise<void> {
    
        setInterval(() => {
            const price = {'time': this.time, 'price': Math.random()}
            this._prices.push(price)
            const event = {...price, 'event': 'NewPrice', 'ticker': 'APPL'}
            EventBus.emit('NewPrice', event)
            this.time++
        }, 1000);
    }


}

export const prices = Prices.getInstance()