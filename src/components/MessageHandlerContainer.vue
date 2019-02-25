<template>
  <div
    class="message-handler-container"
  >
    <slot
      :users="users"
    ></slot>

    <div
      class="message-container"
    >
      <TheMessageList
        :messages="user.messages"
        :currentUser="currentUserName"
      ></TheMessageList>

      <TheMessageForm
        :callback="postNewMessage"
        :status="(! isCurrentUserSelected) ? 'disabled' : 'default'"
      ></TheMessageForm>
    </div>

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
    // Map the store current user and users collection
    ...mapState('users', ['user', 'users']),
    // Return the route username param if any, 'shop-owner' otherwise
    currentUserName() {
      return this.$route.params.user || 'shop-owner'
    },
    // Is a current user selected in store
    isCurrentUserSelected() {
      return this.user.userName
    }
  },
  methods: {
    /**
     *  Refresh the current user
     *    - If user is new, register it to local storage
     *    - If user is already registered in local storage, update store
     *    - If user is shop owner, do nothing
     */
    refreshCurrentUser() {
      const isCurrentUserNew = typeof this.getUser(this.currentUserName) === 'undefined'
      const isUserShopOwner = this.currentUserName === 'shop-owner'

      if (isCurrentUserNew && ! isUserShopOwner) {
        this.registerNewUser()
      }
      else if (! isUserShopOwner)
        this.$store.dispatch('users/setUser', this.currentUserName)
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
     *  Refresh the store by hydration
     *
     *  @return {Promise}
     */
    async refreshStore() {
      await this.hydrateStore()
      this.refreshCurrentUser()
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
  max-width: 500px;
  width: 100%;
  display: flex;
  align-items: stretch;
  .message-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    margin-left: 20px;
  }
}
</style>