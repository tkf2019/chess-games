<template>
  <div id="login-form">

    <h1>
      Login
    </h1>

    <template v-if="authenticating">
      <h3>Loading...</h3>
    </template>

    <template v-else>
      <div v-for="(value, key) in errorForm" :key="key">
        <user-input :placeHolder="key"
          @input="catchInput"></user-input>
        <div v-for="err in value" :key="err" id="error">
          {{err}}
        </div>
      </div>
    </template>

    <button class="button"
      @click="routeJump('back')">
      <div>⬅ back</div>
    </button>

    <button class="button"
      @click="login(loginForm)">
      Login
    </button>

    <button class="button"
      @click="routeJump('register')">
      New?
    </button>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import UserInput from './UserInput'
import Validator from "../../utils/validator"

export default {
  name: 'UserLogin',
  components: {
    UserInput
  },
  data() {
    return {
      errorForm: {
        'Username': [],
        'Password': []
      },
      loginForm: {
        username: '',
        password: ''
      },
      validator: new Validator()
    }
  },
  computed: mapState('auth', [
    'authenticating',
    'error'
  ]),
  methods: {
    routeJump(type) {
      if (type === 'back') {
        this.$router.go(-1)
      } else if (type === 'register') {
        this.$router.push('/user/register')
      }
    },
    catchInput(event, value, type) {
      let user = this.loginForm
      this.errorForm[type].splice(0, this.errorForm[type].length)

      if(type === 'Username') {
        this.loginForm.username = value
        this.validator.add(user.username, event, [{
          strategy: 'isNoEmpty',
          errorMessage: 'Username Cannot be Empty!'
        }])
      } else if(type === 'Password') {
        this.loginForm.password = value
        this.validator.add(user.username, event, [{
          strategy: 'isNoEmpty',
          errorMessage: 'Password Cannot be Empty!'
        }])
      }
      this.validator.check(event, ()=>{}, err => {
        this.errorForm[type].push(err)
      })
    },
    login (form) {
      let errorExist = false
      let formBlank = false
      for (let key in this.errorForm) {
        if (this.errorForm[key].length != 0) {
          errorExist = true
          break
        }
      }
      for (let key in form) {
        if (!!form[key]) {
          continue
        } else {
          formBlank = true
        }
      }
      if (!errorExist && !formBlank) {
        this.$store.dispatch('auth/login', form)
          .then(() => this.$router.push('/'))
      } else {
        alert('Wrong Input!')
      }
    }
  }
}
</script>

<style lang="scss">

</style>
