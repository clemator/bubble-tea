<template>
  <div class="the-shop-owner-layout">
    COUCOU shop owner
    <MessageHandlerContainer>
      <div slot-scope="{ users }">
        <UserList
          :collection="users"
        ></UserList>
      </div>
    </MessageHandlerContainer>
  </div>
</template>

<script>
import MessageHandlerContainer from '../components/MessageHandlerContainer'
import UserList from '../components/UserList'

export default {
  name: 'TheShopOwnerLayout',
  components: {
    MessageHandlerContainer,
    UserList
  }
}
</script>

<style lang="scss">
.the-shop-owner-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>