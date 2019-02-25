<template>
  <div
    class="the-message-list"
  >
    <ul class="message-list">
      <li
        v-for="message in messages"
        :key="message.sendAt"
        class="message-item"
        :class="{ 'own-message': message.sender === currentUser }"
      >
        {{ message.content }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TheMessageList',
  props: {
    messages: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    currentUser: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.the-message-list {
  min-height: 350px;
  max-height: 350px;
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
    .message-item {
      display: block;
      margin: 0 0 20px 0;
      padding: 10px;
      width: auto;
      border: 1px solid gray;
      border-radius: 5px;
      background-color: #FFF;
      text-align: left;
      &.own-message {
        align-self: flex-end;
        background-color: rgba(0, 0, 0, 0.1);
        text-align: right;

      }
    }
  }
}
</style>