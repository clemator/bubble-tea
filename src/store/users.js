/**
 *  Initial state
 *  users { userName: { messages: [] } }
 */
const state = {
  users: {},
  selectedUser: ''
}

const getters = {
  /**
   *  Users
   * 
   *  Should return an Object ? It's initialized as an Object
   *
   *  @param {Object} state
   *  @return {Array}
   */
  users: (state) => {
    return state.users
  },
  /**
   *  Seleted user
   * 
   *  /!\ SelectedUser is initialized as a String and here we're returning an Object
   *      This differ from it's original type String (Primitive) -> Object (Non-primitive)
   *
   *  @param {Object} state
   *  @return {Object}
   */
  selectedUser: (state) => {
    return state.selectedUser
  },
  /**
   *  User by name from users list
   *    - Getter by method
   * 
   *  Here the JS doc should have been @param {Object} state (but i could understand why u said String for userName)
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
  setUsers({ commit }, users) {
    if (Object.keys(users).length === 0)
      return;

    commit('pushUsers', users)
  },
  /**
   *  Set a selected user for shop owner
   *
   *  @param {Object} commit
   *  @param {String} userName
   */
  setSelectedUser({ commit }, userName) {
    commit('setSelectedUser', userName)
  },
  /**
   *  Add a single user by username
   *
   *  @param {Object} commit
   *  @param {String} userName
   */
  addNewUser({ commit }, userName) {
    commit('addNewUser', userName)
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
    /**
     * Hmmm... ok
     * Maybe do a diff algorithm for adding ? instead of altering directly the store
     * with the users array ? which can contain unwanted things ?
     */
    state.users = users
  },
  /**
   *  Add a new user to users state
   *
   *  @param {Object} state
   *  @param {String} userName
   */
  addNewUser(state, userName) {
    state.users[userName] = { messages: [] }
  },
  /**
   *  Set the user state property
   *
   *  @param {Object} commit
   *  @param {String} userName
   */
  setSelectedUser(state, userName) {
    state.selectedUser = userName
  },
  /**
   *  Post a new message to the selected user
   *
   *  @param {Object} state
   *  @param {Object} message
   */
  postMessage(state, message) {
    let newState = Object.keys(state.users)
      .reduce((acc, userName) => {
        if (userName === state.selectedUser) {
          let { messages } = state.users[userName]
          acc[userName] = { messages }
          acc[userName].messages.push(message)
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