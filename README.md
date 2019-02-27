Overall, it is a good prototype of what could be the final result, as on the surface it is functionaly of working product.

Nevertheless I'll said that the completion is at 50% of the objectives/aims. What it is done productwise, is however lacking technicalwise.

Yet even if diminished in complexity, the developed business is convoluted. Completing the remaining 50% would lead to a refactoring.

--------------------------------------------

- Respect of rules: 2.5 / 5
- Functionality: 3.0 / 5
- Code quality: 3.0 / 7
- Code restriction: 1.25 / 2
- Code conduct: 0.5 / 1

--------------------------------------------

* overall async resolving data has not been handled properly to render a fluid UX/UI

* developer mistakes: async handling, falsy or lack of JSDocs, lack of explanation/comments, component signature, etc. => a full set could have been finalised within 2 or 3 hours

* `<the-message-list>` is more of a `<message-list>` than a layout component

* <MessageHandlerContainer> is too monolithic:
** mixing "client" and "admin" business leads to unwanted intrincated design
** event message business, resolving data business, store business are too intertwined
** selected patterns seems unappropriate

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
