const proxies = [
  { host: "91.214.60.194", port: 80 },
  { host: "151.80.64.100", port: 8080 },
  { host: "62.110.134.181", port: 80 },
  { host: "151.80.64.101", port: 8080 },
]

export function getRandomProxy() {
  const index = Math.floor(Math.random() * proxies.length);

  return proxies[index];
}
