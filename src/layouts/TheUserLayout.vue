<template>
  <div>
    COUCOU user {{ $route.params.user }}
    <MessageHandlerContainer></MessageHandlerContainer>
  </div>
</template>

<script>
import MessageHandlerContainer from '../components/MessageHandlerContainer'

export default {
  name: 'TheUserLayout',
  components: {
    MessageHandlerContainer
  }
}
</script>