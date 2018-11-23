# system-server

> Simple system and OS  data (cpu, disk, memory, network) over HTTP
## Install

```bash
npm i -g system-server
```
## Usage
Main use case of system-server would be to access very detailed information on a local machine over HTTP.

`system-server` only has one route `/` below is a empty sample response OR see it action here <a href="http://142.93.1.203:8000/" target="_blank">142.93.1.203</a>

```json
  {
  "_id": "eda46ed7-6da4-4574-af59-4d98b8c56bbe",
  "version": "3.45.9",
  "system": {},
  "bios": {},
  "baseboard": {},
  "os": {},
  "versions": {},
  "cpu": {},
  "graphics": {},
  "net": [],
  "memLayout": [],
  "diskLayout": [],
  "time": {},
  "node": "10.11.0",
  "v8": "6.8.275.32-node.28",
  "cpuCurrentspeed": {},
  "services": {},
  "currentLoad": {},
  "fsSize": [],
  "mem": {},
  "networkConnections": [],
  "networkStats": {},
  "temp": {},
  "fsStats": {},
  "disksIO": {},
  "users": [],
  "battery": {},
  "processes": {},
  "inetLatency": 69.439
}  
```


## Building
To build bundles files run
```javascript
npm run build
```
Files are outputted to `dist/`.

### Related

>[systeminformation](https://www.npmjs.com/package/systeminformation)