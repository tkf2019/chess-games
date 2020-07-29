<template>
  <div id="register-form">
    <div>
      <h1>
        Register
      </h1>

      <template v-if="registrationLoading">
        <h3>Loading...</h3>
      </template>

      <template v-else-if="!registrationCompleted">
        <div v-for="(value, key) in errorForm" :key="key">
          <user-input :placeHolder="key"
            @input="catchInput"></user-input>
          <div v-for="err in value" :key="err" id="err">
            {{err}}
          </div>
        </div>

        <button class="button"
          @click="routeJump('back')">
          <div>⬅ back</div>
        </button>

        <button class="button"
          @click="create(registerForm)">
          <div>Submit</div>
        </button>
      </template>

      <template v-else>
        <div>
          Registration Complete. You shuold receive an email
          soon with instructions on how to activate your account.
        </div>
        <button class="button"
          @click="routeJump('login')"
          disabled="disabled">
          Login Now
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UserInput from './UserInput'
import Validator from "../../utils/validator"

export default {
  name: 'UserRegister',
  components: {
    UserInput
  },
  data() {
    return {
      errorForm: {
        'Username': [],
        'Password': [],
        'Password Confirm': [],
        'Email': []
      },
      registerForm: {
        username: '',
        password: '',
        passwordConfirm: '',
        email: ''
      },
      validator: new Validator()
    }
  },
  computed: mapState('register', [
    'registrationCompleted',
    'registrationError',
    'registrationLoading'
  ]),
  methods: {
    routeJump(type) {
      if (type === 'back') {
        this.$router.go(-1)
      } else if (type === 'login') {
        this.$router.replace('/user/login')
      }
    },
    catchInput(event, value, type) {
      let user = this.registerForm
      this.errorForm[type].splice(0, this.errorForm[type].length)
      
      if (type === "Username") {
        this.registerForm.username = value
        this.validator.add(user.username, event, [{
          strategy: 'isNoEmpty',
          errorMessage: 'Username Cannot be Empty!'
        }])
      } else if (type === "Password") {
        this.registerForm.password = value
        this.validator.add(user.password, event, [{
          strategy: 'isNoEmpty',
          errorMessage: 'Password Cannot be Empty!'
        }])
      } else if (type === "Password Confirm") {
        this.registerForm.passwordConfirm = value
        let str = 'compare:' + this.registerForm.password
        this.validator.add(user.passwordConfirm, event, [{
          strategy: 'isNoEmpty',
          errorMessage: 'Password Confirm Cannot be Empty!'
        }, {
          strategy: str,
          errorMessage: 'Entered Passwords Differ!'
        }])
      } else if (type === "Email") {
        this.registerForm.email = value
        this.validator.add(user.email, event, [{
          strategy: 'isEmail',
          errorMessage: 'Please Enter a valid Email!'
        }])
      }
      this.validator.check(event, () => {}, err => {
        this.errorForm[type].push(err)
      })
    },
    create(form) {
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
        this.createAccount(form)
      } else {
        alert('Wrong Input!')
      }
    },
    ...mapActions('register', [
      'createAccount',
      'clearRegistrationStatus'
    ])
  },
  beforeRouteLeave(to, from, next) {
    this.clearRegistrationStatus()
    next()
  }
}
</script>

<style lang="scss">
  #register-form {
    h1 {
      margin-bottom: 20px;
      font: {
        size: 36px;
      }
    }
    button {
      width: 100px;
      height: 30px;
      color: white;
      background-color: #00000090;
      cursor: pointer;
      outline: none;
      margin: 30px 10px 0;
      border-radius: 5px;
      font: {
        size: 18px;
        family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      }
    }
    #err {
      color: red;
    }
  }
</style>
