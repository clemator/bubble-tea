<template>
  <div>
    <TheMessageList
      v-if="user.messages"
      :messages="user.messages"
      :currentUser="currentUserName"
    ></TheMessageList>
    <TheMessageForm
      :callback="postNewMessage"
    ></TheMessageForm>
  </div>
</template>

<script>
import { fetchMixin } from '../mixin/fetch'
import { mapGetters } from 'vuex'
import TheMessageList from './TheMessageList.vue'
import TheMessageForm from './TheMessageForm.vue'

export default {
  name: 'MessageHandlerContainer',
  components: {
    TheMessageList,
    TheMessageForm
  },
  mixins: [fetchMixin],
  data() {
    return {
      selectedUser: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'users/user'
    }),
    currentUserName() {
      return this.$route.params.user || this.selectedUser
    }
  },
  methods: {
    refreshCurrentUser() {
      const isCurrentUserNew = typeof this.getUser(this.currentUserName) === 'undefined'
      const isUserShopOwner = this.currentUserName === ''

      if (isCurrentUserNew && ! isUserShopOwner)
        this.postUser(this.currentUserName)
      else if (! isUserShopOwner)
        this.$store.dispatch('users/setUser', this.currentUserName)
    },
    postNewMessage(message) {
      var newMessage = {
        from   : this.currentUserName || 'shop-owner',
        content: message
      }

      this.$store.dispatch('users/postMessage', newMessage)
    }
  },
  created() {
    try {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', (event) => {
          console.log(event.data)
        })
      }

      this.hydrateStore()
        .then(this.refreshCurrentUser)
    }
    catch(e) {
      console.error(e)
    }
  },
  watch: {
    '$route.params.user': function() {
      this.refreshCurrentUser()
    }
  },
}
</script>