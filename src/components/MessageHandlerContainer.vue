<template>
  <div
    class="message-handler-container"
  >
    <TheMessageList
      :messages="selectedUserMessages"
      :currentUser="currentUserName"
    ></TheMessageList>

    <TheMessageForm
      :callback="postNewMessage"
      :status="isUserSelected ? 'default' : 'disabled'"
    ></TheMessageForm>
  </div>
</template>

<script>
import { fetchMixin } from '../mixin/fetch'
import { mapState } from 'vuex'
import TheMessageList from './TheMessageList.vue'
import TheMessageForm from './TheMessageForm.vue'

export default {
  name: 'MessageHandlerContainer',
  components: {
    TheMessageList,
    TheMessageForm
  },
  mixins: [fetchMixin],
  computed: {
    // Map the store selected user and users collection data
    ...mapState('users', ['selectedUser', 'users']),
    // Return the route username param if any, 'shop-owner' otherwise
    currentUserName() {
      return this.$route.params.user || 'shop-owner'
    },
    // Return the selected user messages, if any selected, empty array otherwhise
    selectedUserMessages() {
      if (this.selectedUser)
        return this.users[this.selectedUser].messages
      return []
    },
    // Return whether there is a selected user in store
    isUserSelected() {
      return this.selectedUser !== ''
    }
  },
  methods: {
    /**
     *  Refresh the current user data
     *    - If user is new, register it to local storage
     *    - If user is already registered in local storage, set him as selected user
     *    - If user is shop owner, do nothing
     */
    refreshCurrentUserData() {
      const isCurrentUserNew = typeof this.getUser(this.currentUserName) === 'undefined'
      const isUserShopOwner = this.currentUserName === 'shop-owner'

      if (isCurrentUserNew && ! isUserShopOwner) {
        this.registerNewUser()
      }
      else if (! isUserShopOwner) {
        this.$store.dispatch('users/setSelectedUser', this.currentUserName)
      }
    },
    /**
     *  Register a new user
     *
     *  @return {Promise}
     */
    registerNewUser() {
      return this.postUser(this.currentUserName)
        .then(this.notifyServiceWorker)
    },
    /**
     *  Post a new message to current user message thread
     *    - Notify service worker when done
     *
     *  @param {String} message
     *  @return {Promise}
     */
    postNewMessage(message) {
      const newMessage = {
        sender : this.currentUserName || 'shop-owner',
        content: message,
        sendAt : Date.now()
      }

      return this.postMessage(newMessage)
        .then(this.notifyServiceWorker)
        .then(this.hydrateStore)
    },
    /**
     *  Notify service worker of an update (new user or new message)
     */
    notifyServiceWorker() {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({message: 'refresh'})
      }
    },
    /**
     *  Refresh the store by hydration and refresh the current user data
     */
    async refreshStore() {
      await this.hydrateStore()
      this.refreshCurrentUserData()
    }
  },
  /**
   *  Created cycle hook
   *    - Register the service worker
   *    - Add an event listener when it's ready
   *    - Refresh store
   */
  created() {
    const self = this
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => navigator.serviceWorker.ready)
        .then(() => {
          navigator.serviceWorker.addEventListener('message', () => {
            self.hydrateStore()
          })
        })
        .catch(e => { console.error(e.toString()) })
    }

    this.refreshStore()
  }
}
</script>

<style lang="scss">
.message-handler-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  margin-left: 20px;
}
</style>