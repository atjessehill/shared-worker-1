import random
import time
import asyncio
from client import Client
from session import Session

from sanic import Request, Websocket, Sanic

app = Sanic("ws_example")

@app.after_server_start
async def setup_context(app: Sanic):
    app.ctx.session = Session()


@app.websocket("/feed")
async def feed(request: Request, ws: Websocket):

    async def number_publisher():
        
        return {'price': random.random(), 'time': time.time()}

    while True:
        data = number_publisher()
        await ws.send(data)
        await asyncio.sleep(1)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9999)