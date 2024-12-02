import {EventBus} from '@/controller/EventBus'

class Prices {

    private static instance: Prices;
    private time: number = 0;
    private _prices: any[] = []
    private _ticker: string = 'APPL'
    private _feedConn: WebSocket

    // private constructor ensures `new Prices` can't be called from outside of the class.
    private constructor() {
        this._feedConn = new WebSocket("ws://localhost:9999/feed")
        this._feedConn.onmessage = (event) => void this.consumePrice(event)
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

    private async consumePrice(event: any): Promise<void> {
        const data = JSON.parse(event.data)
        this._prices.push(data)
        EventBus.emit('NewPrice', {...data, 'event': 'NewPrice'})
    }

    public async poll(): Promise<void> {
        // random number generator
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