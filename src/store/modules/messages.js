const state = {
  messages: [],
  message: {}
};

const getters = {
  /**
   *  Messages
   *
   *  @param {Object} state
   *  @return {Array}
   */
  messages: (state) => {
    return state.messages
  },
  /**
   *  Message
   *
   *  @param {Object} state
   *  @return {Object}
   */
  message: (state) => {
    return state.message
  }
};

const actions = {
  /**
   *  Set Messages
   *
   *  @param {Object} commit
   *  @param {Array} messages
   */
  setMessages({ commit }, messages) {
    if (messages.length === 0)
      return;

    commit('pushMessages', messages)
  },
  /**
   *  Set a Message
   *
   *  @param {Object} state
   *  @param {Object} message
   */
  setMessage({commit}, message) {
    commit('setMessage', message)
  },
  /**
   *  Unset the Message
   *
   *  @param {Object} state
   */
  unsetMessage({commit}) {
    commit('unsetMessage')
  },
  /**
   *  Add a single message
   *
   *  @param {Object} commit
   *  @param {Object} message
   */
  addMessage({ commit }, message) {
    commit('pushMessage', message)
  },
  /**
   *  Remove Message
   *
   *  @param {Object} commit
   *  @param {Number} id
   */
  removeMessage({ commit }, id) {
    if (typeof id !== 'number')
      return;

    commit('removeMessage', id)
  },
  /**
   *  Complete Message
   *
   *  @param {Object} commit
   *  @param {Number} id
   */
  completeMessage({ commit }, id) {
    if (typeof id !== 'number')
      return;

    commit('completeMessage', id)
  },
  /**
   *  Update a message from messages
   *
   *  @param {Object} commit
   *  @param {Object} message
   */
  updateMessage({ commit }, message) {
    commit('updateMessage', message)
  },
  /**
   *  Delete a message from message list
   */
  deleteMessage({ commit }, id) {
    commit('deleteMessageById', id)
  }
};

/**
 *  Mutations
 */
const mutations = {
  /**
   *  Push Messages
   *
   *  @param {Object} state
   *  @param {Array} messages
   */
  pushMessages(state, messages) {
    state.messages = [...messages]
  },
  /**
   *  Set a Message
   *
   *  @param {Object} state
   *  @param {Object} message
   */
  setMessage(state, message) {
    state.message = message
  },
  /**
   *  Unset a Message
   *
   *  @param {Object} state
   */
  unsetMessage(state) {
    state.message = {}
  },
  /**
   *  Push a message
   *
   *  @param {Object} state
   *  @param {Object} message
   */
  pushMessage(state, message) {
    state.messages.push(message)
  },
  /**
   *  Remove Message
   *
   *  @param {Object} state
   *  @param {Number} id
   */
  removeMessage(state, id) {
    const messages = state.messages
    const newMessages = messages.map(t => {
      if (t.id === id)
        t.status = 'deleted'

      return t
    })

    state.messages = newMessages
  },
  /**
   *  Complete Message
   *
   *  @param {Object} state
   *  @param {Number} id
   */
  completeMessage(state, id) {
    const currentMessages = state.messages
    const newMessages = currentMessages.map(t => {
      if (t.id === id)
        t.status = 'done'

      return t
    });

    state.messages = newMessages
  },
  /**
   *  Update a message from the message list
   *
   *  @param {Object} state
   *  @param {Object} message
   */
  updateMessage(state, message) {
    const currentMessages = state.messages
    const newMessages = currentMessages.map(t => {
      if (t.id === message.id) {
        t.description = message.description
        t.status = message.status
      }

      return t
    });

    state.messages = newMessages
  },
  /**
   *  Look for a message and remove it from message list
   *
   *  @param {Object} state
   *  @param {Number} id
   */
  deleteMessageById(state, id) {
    const toSpliceMessages = state.messages

    const indexToSplice = toSpliceMessages.findIndex(t => t.id === id)

    toSpliceMessages.splice(indexToSplice, 1);

    state.messages = toSpliceMessages
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
