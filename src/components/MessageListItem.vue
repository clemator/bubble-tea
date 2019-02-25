<template>
  <li
    class="message-item"
  >
    {{ message.content }}
  </li>
</template>

<script>
export default {
  name: 'MessageListItem',
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.message-item {
  display: block;
  margin: 0 0 20px 0;
  padding: 10px;
  width: auto;
  max-width: 85%;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: #FFF;
  text-align: justify;
  &.own-message {
    align-self: flex-end;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>