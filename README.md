# bubble-shop


## Project

This project use `vuex`, `vue-router` and supports Single File Components. Please use Chrome to run the project.

 - Folders:
   - `src`
     - `assets` nothing to say
     - `components` where all components are
     - `layouts` where all layout components are
     - `mixin` where the fetch mixin is
     - `store` where the users store is
  - `public` contains both index.html and the service worker files
- Files:
  - `src/main.js` the app entry point
  - `src/App.vue` the app main component
  - `src/storageApi.js` the JS file that contains all exposed methods to store and get data from localStorage
  - `public/service-worker.js` the service worker
  - `public/index.html` the main html file


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
Then open a browser tab with http://localhost:8080/#/ and another one with http://localhost:8080/#/{USERNAME}.

You must ensure in the Chrome dev tools on "Application" tab, option service worker on the left, that the service worker is "running". If not, please refresh the page and check again.

Once it is running, you may start chatting with the creepy owner.

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
