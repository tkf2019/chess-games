import instance from './index'

export default {
  // LOGIN relevant functions
  login(username, password) {
    return instance.post('/login/', {
      username,
      password
    })
  },
  logout() {
    return instance.post('/logout/', {})
  },
  // REGISTER relevant functions
  createAccount(username, password, passwordConfirmation, email) {
    return instance.post('/register/',{
      username,
      password,
      passwordConfirmation,
      email
    })
  },
  verifyAccountEmail(key) {
    return instance.post('/register/verifyEmail/', {
      key
    })
  },
  // RESET relevant functions
  resetAccountPassword(uid, token, newPassword1, newPassword2) {
    return instance.post('/auth/password/rest/confirm/', {
      uid,
      token,
      newPassword1,
      newPassword2
    })
  },
  sendAccountPasswordResetEmail(email) {
    return instance.post('/auth/password/reset/', {
      email
    })
  },
  changeAccountPassword(password1, password2) {
    return instance.post('/auth/password/change/', {
      password1,
      password2
    })
  },
  getAccount() {
    return instance.get('/auth/user/')
  },
  updateAccount(data) {
    return instance.patch('/auth/user/', data)
  }
}
