import storageApi from '../storageApi'

/**
 *  Fetch Mixin
 *
 *    - This mixin handles the fetch/post business for both users and messages
 */
export const fetchMixin = {
  methods: {
    /**
     *  Hydrate users
     *    - Fetch users data and hydrate the user store
     *
     *  @return {Promise}
     */
    hydrateUsers() {
      return storageApi.get()
        .then({ users } => {
          this.$store.dispatch('users/setUsers', users)
        })
        .catch(console.error);
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
     *  @return <string> if match found <undefined> otherwise
     */
    getUser(userName = '') {
      return this.$store.getters['users/users'].find(userName)
    },
    /**
     *  Post a User
     *
     *  @param {string} userName
     *  @return {Promise}
     */
    postUser(userName) {
      return storageApi.set(userName)
    },
    /**
     *  Hydrate messages
     *    - Fetch messages data and hydrate the message store
     *
     *  @return {Promise}
     */
    hydrateMessages() {
      return storageApi.get()
        .then({ messages } => {
          this.$store.dispatch('messages/setMessages', messages)
        })
        .catch(console.error);
    },
    /**
     *  Get messages from store
     *
     *  @return {array}
     */
    getMessages() {
      return this.$store.getters['messages/messages']
    }
  }
}