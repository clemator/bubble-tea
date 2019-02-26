import storageApi from '../storageApi'

/**
 *  Fetch Mixin
 * 
 *  Don't know if fetch is a good word but why not
 *
 *    - This mixin handles the get/post business for users and messages
 * 
 * 
 * Overall it's ok soso
 * I think that method such as hydrateStore should have been done outside 
 * E.g in a file / module named Hydrate.js where all the hydration could be handle there
 * 
 * Futhermore you could have broken down the mixin a bit.
 * E.g create a post mixin where it's responsability will be to just post something
 */
export const fetchMixin = {
  methods: {
    /**
     *  Hydrate store
     *    - Fetch users data and hydrate the store
     *
     *  @return {Promise}
     */
    hydrateStore() {
      return storageApi.get()
        .then((data) => {
          this.$store.dispatch('users/setUsers', data || {})
        })
        .catch(console.error)
    },
    /**
     *  Get users from store
     *
     *  @return {array}
     */
    getUsers() {
      return this.$store.getters['users/users']
    },
    /**
     *  Get user by name
     *
     *  @param {string} userName
     *  @return <object> if match found <undefined> otherwise
     */
    getUser(userName) {
      return this.$store.getters['users/userByName'](userName)
    },
    /**
     *  Post a new user
     *
     *  @param {string} userName
     *  @return {Promise}
     */
    postUser(userName) {
      /**
       * dispatch return a Promise.
       * I think you should have chain them together which will make the code cleaner
       * Futhermore if an error happened it could be catch :)
       */
      this.$store.dispatch('users/addNewUser', userName)
      this.$store.dispatch('users/setSelectedUser', userName)
      return storageApi.set(this.$store.getters['users/users'])
        .catch(console.error)
    },
    /**
     *  Post a message
     *
     *  @param {object} message
     *  @return {Promise}
     */
    postMessage(message) {
      /**
       * Same maybe promisify the dispatch
       */
      this.$store.dispatch('users/postMessage', message)
      return storageApi.set(this.$store.getters['users/users'])
        .catch(console.error)
    }
  }
}