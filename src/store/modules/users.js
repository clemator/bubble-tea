const state = {
  users: []
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
    if (users.length === 0)
      return;

    commit('pushUsers', users)
  },
  /**
   *  Add a single user
   *
   *  @param {Object} commit
   *  @param {Object} user
   */
  addUser({ commit }, user) {
    commit('pushUser', user)
  }
}

const mutations = {
  /**
   *  Push Users
   *
   *  @param {Object} state
   *  @param {Array} users
   */
  pushUsers(state, users) {
    state.users = [...users]
  },
  /**
   *  Push a user
   *
   *  @param {Object} state
   *  @param {Object} user
   */
  pushUser(state, user) {
    state.users.push(user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};