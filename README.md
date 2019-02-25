# bubble-shop


## Project

This project use `vuex`, `vue-router` and supports Single File Components.

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

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
