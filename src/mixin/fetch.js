import storageApi from '../storageApi'

/**
 *  Fetch Mixin
 *
 *    - This mixin handles the get/post business for users and messages
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
          return this.$store.dispatch('users/setUsers', data || {})
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
      // make a promise chain/all here
      this.$store.dispatch('users/addNewUser', userName)
      this.$store.dispatch('users/setSelectedUser', userName)
      return storageApi.set(this.$store.getters['users/users'])
        // error should be handled by the consumer
        .catch(console.error)
    },
    /**
     *  Post a message
     *
     *  @param {object} message
     *  @return {Promise}
     */
    postMessage(message) {
      this.$store.dispatch('users/postMessage', message)
      return storageApi.set(this.$store.getters['users/users'])
        // error should be handled by the consumer
        .catch(console.error)
    }
  }
}