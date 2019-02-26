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
    <button
      @click="submit()"
      class="the-message-form__button"
      :disabled="status === 'disabled' || message === ''"
    >
      ENVOYER
    </button>
  </form>
</template>

<script>

/**
 * The component could be improved a bit
 * 
 * However the handling of the message could have been done outside.
 * So that you'll have a real dumb component
 * 
 * Moreover the submit handler could have also been externalise by the container
 * by using the Callback property directly in your elements 
 * E.g: <button @click="callback(message)" />
 */
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
     *  Programmatic wise this will work. However your button doesn't need to do an async.
     *  Albeit you really wish to use async / await which can be understandable.
     * 
     *  /!\ However there's one thing that could happened
     *  What'll happened if you callback is throwing an error ?
     *  In this case the error won't be catch /!\
     * 
     *  Instead you could use this
     * 
     *  const haha = async () => {
     *   throw new Error('oopsie');
     *  }
     *
     *  const lol = async () => {
     *    try {
     *      const res = await haha()
     *      return res  
     *    } catch (e) {
     *      console.warn(e)
     *    }
     *  }
     *
     *  lol()
     * 
     *  Note: In this case it would have been better to use the Promise().then.catch() which 
     *        should have been easier to read
     * 
     *  Submit the message to callback function and reset input
     *
     *  @return {Promise}
     */
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