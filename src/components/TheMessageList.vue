<template>
  <div
    class="the-message-list"
  >
    <ul>
      <li
        v-for="message in messages"
        :key="message.content"
        class="message-item"
        :class="{ 'own-message': message.from === currentUser }"
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
      required: true
    },
    currentUser: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">

</style>