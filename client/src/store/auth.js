import auth from '../api/auth'
import instance from '../api'
import {
  LOGIN_BEGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_TOKEN,
  UPDATE_TOKEN,
  REMOVE_STATE,
  SET_USER
} from './types'

const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY'
const USER_NAME = 'USER_NAME'
const USER_EMAIL = 'USER_EMAIL'

const initialState = {
  authenticating: false,
  error: false,
  token: null,
  user: {
    name: '',
    email: ''
  }
}

const getters = {
  isAuthenticated: state => !!state.token,
  userInfo: state => state.user
}

const actions = {
  login ({ commit }, { username, password }) {
    commit(LOGIN_BEGIN)
    return auth.login(username, password)
      .then(response => {
        commit(SET_TOKEN, response.data.token)
        commit(SET_USER, response.data.user)
      })
      .then(() => commit(LOGIN_SUCCESS))
      .catch(error => {
        console.log(error)
        commit(LOGIN_FAILURE)
      })
  },
  logout ({ commit }) {
    return auth.logout()
      .then(() => commit(LOGOUT))
      .finally(() => commit(REMOVE_STATE))
  },
  initialize ({ commit }) {
    const token = sessionStorage.getItem(TOKEN_STORAGE_KEY)
    if (!!token) {
      commit(SET_TOKEN, token)
    }

    const name = sessionStorage.getItem(USER_NAME)
    const email = sessionStorage.getItem(USER_EMAIL)
    if (!!name) {
      commit(SET_USER, {name, email})
    }
  },
  update ({ commit }) {
    commit(UPDATE_TOKEN)
  }
}

const mutations = {
  [LOGIN_BEGIN] (state) {
    state.authenticating = true
    state.error = false
  },
  [LOGIN_FAILURE] (state) {
    state.authenticating = false
    state.error = true
  },
  [LOGIN_SUCCESS] (state) {
    state.authenticating = false
    state.error = false
  },
  [LOGOUT] (state) {
    state.authenticating = false
    state.error = false
  },
  [SET_TOKEN] (state, token) {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token)
    instance.defaults.headers.Authorization = `token ${token}`
    state.token = token
  },
  [UPDATE_TOKEN] (state) {
    const token = sessionStorage.getItem(TOKEN_STORAGE_KEY)
    state.token = token
  },
  [REMOVE_STATE] (state) {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY)
    delete instance.defaults.headers.Authorization
    state.token = null

    sessionStorage.removeItem(USER_NAME)
    sessionStorage.removeItem(USER_EMAIL)
    state.user.name = ''
    state.user.email = ''
  },
  [SET_USER] (state, user) {
    const name = user.name
    const email = user.email
    state.user = { name, email }
    sessionStorage.setItem(USER_NAME, name)
    sessionStorage.setItem(USER_EMAIL, email)
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}






