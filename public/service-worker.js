// Good start

// Need:
// - documentation: best articles, cookbook
// - JSDoc, as the ServiceWorkerGlobalScope and Lifecycle can be very trikcy (`waitUntil`, `async`, etc.)
// - `self` has been chosen by the community to refer to the ServiceWorkerGlobalScope (instead of `this`)

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