/**
 *  Initial state
 *  users { userName: { messages: [] } }
 */
const state = {
  users: {},
  user : {
    userName: '',
    messages: []
  }
}

const getters = {
  /**
   *  Users
   *
   *  @param {Object} state
   *  @return {Array}
   */
  users: (state) => {
    return state.users
  },
  /**
   *  User
   *
   *  @param {Object} state
   *  @return {Object}
   */
  user: (state) => {
    return state.user
  },
  /**
   *  User by name from users list
   *    - Getter by method
   *
   *  @link https://vuex.vuejs.org/fr/guide/getters.html#acces-par-methode
   *  @param {String} userName
   *  @return {Function}
   */
  userByName: (state) => (userName) => {
    return state.users[userName]
  }
}

const actions = {
  /**
   *  Set Users
   *
   *  @param {Object} commit
   *  @param {Array} users
   */
  setUsers({ commit, state }, users) {
    if (Object.keys(users).length === 0)
      return;

    commit('pushUsers', users)
  },
  /**
   *  Set a User
   *
   *  @param {Object} commit
   *  @param {String} userName
   */
  setUser({ commit }, userName) {
    commit('setUser', userName)
  },
  /**
   *  Add a single user by username
   *
   *  @param {Object} commit
   *  @param {String} userName
   */
  addUser({ commit }, userName) {
    commit('pushUser', userName)
  },
  /**
   *  Post a new message
   *
   *  @param {Object} commit
   *  @param {Object} message
   */
  postMessage({ commit }, message) {
    commit('postMessage', message)
  }
}

const mutations = {
  /**
   *  Push Users to store
   *
   *  @param {Object} state
   *  @param {Array} users
   */
  pushUsers(state, users) {
    state.users = users
    if (state.user.userName)
      state.user.messages = state.users[state.user.userName].messages
  },
  /**
   *  Push a User by it's name
   *
   *  @param {Object} state
   *  @param {String} userName
   */
  pushUser(state, userName) {
    state.users[userName] = { messages: [] }
    state.user.userName = userName
    state.user.messages = []
  },
  /**
   *  Set the User state property from the state Users collection
   *
   *  @param {Object} commit
   *  @param {String} userName
   */
  setUser(state, userName) {
    const { messages } = state.users[userName]
    state.user = { userName, messages }
  },
  /**
   *  Post a new message to the current user
   *
   *  @param {Object} state
   *  @param {Object} message
   */
  postMessage(state, message) {
    state.user.messages.push(message)

    let newState = Object.keys(state.users)
      .reduce((acc, userName) => {
        if (userName === state.user.userName) {
          let { messages } = state.user
          acc[userName] = { messages }
        }
        else
          acc[userName] = state.users[userName]
        return acc
      }, {})

    state.users = newState
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};