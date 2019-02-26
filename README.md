# Marc's review

Overral the project is okay. Some components has been seperated into container / dumb components which is a good thing. Futhermore the project is not too complex which is a good point. However there are several things that you could have done in order to make it much more extensible. Indeed as of today it'd be hard to add new feature regarding these 2 components: 

- storage (should have been done like a seperate library)
- service worker handler

Be careful to not have too many monolithic components such as the fetch.js mixin, MessageHandler which is really monolitich and which syntax wise is not really what it's doing. Futhermore be careful with the rules the storage api rules has not been respected from A to B which is a shame as it could have been a good piece of reusable & extensible & independants component of your project. The same can be said for the service worker but I guess the time's constraint was a factor

Regarding the layout components I'm guessing that it's coming from the cookbook. Why nor.

### Rating

- Respect of rules: 3 / 5
- Functionality: 5 / 5
- Code quality: 3 / 7
- Code restriction: 1.75 / 2
- Code conduct: 0.5 / 1

#### Total: 13.25 / 20 not bad, keep it up !

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
