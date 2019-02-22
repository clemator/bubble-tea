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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
