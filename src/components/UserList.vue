<template>
  <div class="user-list">
    <div
      v-for="username in usernameList"
      :key="username"
      class="user-name"
      :class="{ active: user.userName === username }"
      @click="setActiveUser(username)"
    >
      {{ username }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UsersList',
  props: {
    collection: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'users/user'
    }),
    usernameList() {
      return Object.keys(this.collection)
    }
  },
  methods: {
    setActiveUser(username) {
      this.$store.dispatch('users/setUser', username)
    }
  }
}
</script>

<style lang="scss">
.user-list {
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow-y: auto;
  .user-name {
    padding: 15px 25px;
    margin-bottom: 15px;
    border: 1px solid black;
    cursor: pointer;
    &.active {
      background-color: #DEDEDE;
    }
  }
}
</style>