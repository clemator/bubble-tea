<template>
  <div class="the-shop-owner-layout">
    <h1>Creepy shop owner</h1>
    <div
      class="shop-owner-container"
    >
      <UserListContainer></UserListContainer>
      <MessageHandlerContainer></MessageHandlerContainer>
    </div>
  </div>
</template>

<script>
import MessageHandlerContainer from '../components/MessageHandlerContainer'
import UserListContainer from '../components/UserListContainer'

export default {
  name: 'TheShopOwnerLayout',
  components: {
    MessageHandlerContainer,
    UserListContainer
  }
}
</script>

<style lang="scss">
.the-shop-owner-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  .shop-owner-container {
    display: flex;
    align-items: stretch;
  }
}
</style>