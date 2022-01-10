# FreshCydia

Find all the popular and new tweaks and themes you need to spice up your Iphone with FreshCydia! FreshCydia is a tweak that gives your Cydia Homepage a refreshing and modern look.

# Compatibility 

FreshCydia works for all Ios versions!

# Running
## Running the API

Clone this repository
```
git clone https://github.com/DaanDH12/FreshCydia.git
```
Enter the API directory
```
cd FreshCydia/API
```

Install dependencies
```
npm install
```

Run the API
```
npm run api
```

The API will be available on <http://127.0.0.1:8080/parcility>.
<br>
You can specify the port in the `api.js` file, under `const port`.

## Developing/Testing
### Running a local server
I'm using Live Server in VSCode.

Install Live Server from the VSCode Marketplace

<video src='live-server.mp4' width=180></video>

Open the Command Palette
```
CTRL + SHIFT + P
```

Run Live Server
```
Live Server: Open with Live Server
```

### Configure your IP
Get your local IP
```
Windows:
ipconfig

Linux:
ip addr
```

Open /assets/index.js, and change `var api` to your IP address
```
var api = "http://your.ip.here:8080/parcility"
```

You should now be able to access the frontend website on your local devices, via your local IP.

# Credits 

@t0mi292 - Tweak Creator <br>
@DaanDH13 - Site Creator <br>
@BluDood - Site Creator <br>


