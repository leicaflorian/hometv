const axios = require('axios');
const SocksProxyAgent = require('socks-proxy-agent');

const proxyList = [
  "52.144.70.194:4145",
  "83.149.165.27:1088",
  "185.16.132.4:5678",
  "46.141.30.158:5678",
  "95.169.92.3:4145",
  "83.149.165.30:1088",
  "185.208.191.110:1088",
  "82.62.100.76:1080",
  "80.94.118.192:4145",
  "93.48.228.247:4153",
  "217.141.179.178:1088",
  "178.250.70.218:1088",
  "5.83.104.170:4153",
  "154.60.200.61:4153",
  "94.141.4.66:5678",
  "93.63.75.62:1080",
  "213.178.223.54:5678",
  "5.83.104.177:4153",
  "185.87.70.171:4153",
  "5.83.104.147:4153",
  "31.3.170.51:1088",
  "185.142.174.46:3629",
  "2.38.199.61:1080",
  "188.95.20.139:5678",
  "62.94.196.19:1088",
  "185.142.173.167:3629",
  "185.13.221.243:4145",
  "195.22.221.210:4145",
  "109.73.180.188:5678",
  "185.8.25.34:4153",
  "109.73.178.197:5678",
  "109.73.191.200:5678",
  "109.73.191.217:8291",
  "94.100.38.54:1088",
  "37.34.74.186:4145",
];

// replace with your proxy's hostname and port
const proxyHost = "106.240.89.60";
const proxyPort = 4145;

const workingList = [];

let counter = proxyList.length;

function makeCall(proxy) {

  // the full socks5 address
  const proxyOptions = `socks4://${proxy}`;

  // create the socksAgent for axios
  const httpsAgent = new SocksProxyAgent(proxyOptions);

  // the baseUrl for the api you are going to hit
  const baseUrl = 'https://google.com';

  // create a new axios instance
  const client = axios.create({ httpsAgent });

  const googlePage = client.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => {
      if (res.data.userId === 1) {
        console.log("working:", proxy);
        workingList.push(proxy);

        checkIsLast();
      }
    })
    .catch(er => {
      //console.error(er.message, proxy);

      checkIsLast();
    });
}

function checkIsLast() {
  counter--;

  if (counter === 0) {
    console.log(workingList);

    return;
  }

}


proxyList.forEach(proxy => {
  makeCall(proxy);
});