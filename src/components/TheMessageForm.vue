<template>
  <div
    class="the-message-form"
  >
    <input v-model="message" />
    <button @click="callback(message)">
      ENVOYER
    </button>
  </div>
</template>

<script>
export default {
  name: 'TheMessageForm',
  data() {
    return {
      message: ''
    }
  },
  props: {
    callback: {
      type: Function,
      required: true
    }
  }
}
</script>