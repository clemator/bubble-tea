<template>
  <form
    class="the-message-form"
    @submit="submit()"
  >
    <input
      v-model="message"
      class="the-message-form__input"
      placeholder="Tapez votre message ici..."
      :disabled="status === 'disabled'"
    />
    <!-- disabled expression needs its own computed value, as the 
         business needs explanation -->
    <button
      type="submit"
      class="the-message-form__button"
      :disabled="status === 'disabled' || message === ''"
    >
      ENVOYER
    </button>
  </form>
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
    },
    status: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  methods: {
    /**
     *  Reset the input model value
     */
    resetInput() {
      this.message = ''
    },
    /**
     *  Submit the message to callback function and reset input
     *
     *  @return {Promise}
     */
    // what is the benefit of the `return res` here?
    async submit() {
      const res = await this.callback(this.message)
      this.resetInput()
      return res
    }
  }
}
</script>

<style lang="scss">
.the-message-form {
  display: flex;
  height: 30px;
  padding: 10px 0 0 0;
  justify-content: space-between;
  &__input {
    flex: 3;
    padding: 0 0 0 10px;
    margin-right: 10px;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: none;
    outline: none;
    &:disabled {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  &__button {
    flex: 1;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
    outline: none;
    &:disabled {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>