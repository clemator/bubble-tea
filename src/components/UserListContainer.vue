<template>
  <div class="user-list">
    <div
      v-for="username in usernameList"
      :key="username"
      class="user-name"
      :class="{ active: selectedUser === username }"
      @click="setActiveUser(username)"
    >
      {{ username }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UsersList',
  computed: {
    // Map the store selectedUser and users collection
    ...mapState('users', ['selectedUser', 'users']),
    // Return the list of username
    usernameList() {
      return Object.keys(this.users)
    }
  },
  methods: {
    /**
     *  Set a username as selected one
     *
     *  @param {String} username
     */
    // a mapped mutation methods would be shorter and sync
    setActiveUser(username) {
      this.$store.dispatch('users/setSelectedUser', username)
    }
  }
}
</script>

<style lang="scss">
.user-list {
  display: flex;
  height: 100%;
  max-height: 390px;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
  .user-name {
    padding: 15px 25px;
    margin-bottom: 15px;
    border: 1px solid black;
    cursor: pointer;
    // BEM-wise it would be "user-name--active"
    &.active {
      background-color: #DEDEDE;
    }
  }
}
</style>