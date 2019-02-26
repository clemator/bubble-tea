// /!\ Add JSDoc to the service worker
this.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
});

this.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
});

this.addEventListener('message', (event) => {
  this.syncTabState(event.data, event.source.id)
});

this.addEventListener('fetch', (event) => {

})

this.syncTabState = function(data, clientId) {
  clients.matchAll().then(clients => {
    clients.forEach(client => {
      if (client.id !== clientId)
        client.postMessage(data)
    })
  })
}