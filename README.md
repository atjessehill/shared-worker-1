# Shared Worker Demo

Shared workers are a background worker that is accessible to multiple tabs or windows within the same browser that share the same protocol, host, and port.

One possible use case for shared workers is to synchronize data between browser tabs. This repo demonstrates how a shared worker maintains a websocket connection with a server and broadcasts events to all connected browser tabs. The result is that each tab can be synchronized in real time with the same data.
![Description of GIF](example.gif)

## Usage 

Server Set Up

```
cd server
python -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt
```

Client Set Up:
```
cd client
npm i
npm run dev
```