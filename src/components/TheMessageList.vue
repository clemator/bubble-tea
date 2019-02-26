<template>
  <div
    class="the-message-list"
  >
    <ul class="message-list">
      <MessageListItem
        v-for="message in messages"
        :key="message.sendAt"
        :message="message"
        :class="{ 'own-message': message.sender === currentUser }"
      ></MessageListItem>
    </ul>
  </div>
</template>

<script>
import MessageListItem from './MessageListItem'

export default {
  name: 'TheMessageList',
  components: {
    MessageListItem
  },
  props: {
    messages: {
      type: Array,
      required: true
    },
    currentUser: {
      type: String,
      required: true
    }
  },
  /**
   * Ok why not
   * Could have been put in a directive
   */
  updated() {
    const container = this.$el.querySelector('.message-list')
    container.scrollTop = container.scrollHeight
  }
}
</script>

<style lang="scss">
.the-message-list {
  height: 350px;
  width: 400px;
  border: 1px solid black;
  .message-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    padding: 10px 15px;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    list-style: none;
  }
}
</style>