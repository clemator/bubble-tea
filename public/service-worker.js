this.addEventListener('install', (event) => {
  this.skipWaiting()
});

this.addEventListener('activate', (event) => {
  this.skipWaiting()
});

this.addEventListener('message', function(event){
  this.syncTabState(event.data, event.source.id)
});

this.addEventListener('fetch', (event) => {

})

this.syncTabState = function(data, clientId){
  clients.matchAll().then(clients => {
    clients.forEach(client => {
      if (client.id !== clientId)
        client.postMessage(data)
    })
  })
}