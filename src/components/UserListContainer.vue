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
    ...mapState('users', ['selectedUser', 'users']),
    usernameList() {
      return Object.keys(this.users)
    }
  },
  methods: {
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
    &.active {
      background-color: #DEDEDE;
    }
  }
}
</style>