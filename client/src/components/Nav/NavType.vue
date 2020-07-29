<template>
  <div id="nav-type">
    <template v-if="userExist">
      <div id="text">
        {{username}}
      </div>
      <button class="nav-login" @click="logoutClick">
        Logout
      </button>
    </template>
    
    <template v-else>
      <img src="@/assets/images/icon4.png">
      <button class="nav-login" @click="loginClick">
          Login
      </button>
    </template>
    
  </div>
</template>

<script>

export default {
  name: 'NavType',
  data() {
    return {
      id: ''
    }
  },
  methods: {
    loginClick() {
      //Default Path: 
      //If the user hasn't signed up, the LOGIN button will
      //Show up in the navigation, So the UserLogin component
      //Will be loaded by routing the path
      let loginClickPath = (this.id === '') ?
        '/user/login' : '/user/' + this.id
      this.$router.push(loginClickPath)
    },
    logoutClick() {
      this.$store.dispatch('auth/logout')
          .then(() => this.$router.push('/user/login/'))
    },
  },
  computed: {
    userExist() {
      return this.$store.getters['auth/isAuthenticated']
    },
    username() {
      return this.$store.getters['auth/userInfo'].name
    }
  }
}
</script>

<style lang="scss">
  #nav-type {
    position: absolute;
    right: 0;
    display: flex;
    .nav-login {
      right: 0;
      background-color: black;;
      width: 100px;
      height: 60px;
      margin-left: 20px;
      cursor: pointer;
      color: white;
      border-radius: 5px;
      outline: none;
      font: {
        weight: 600;
        size: 16px;
        family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      }
      &:hover {
        background-image: linear-gradient(rgb(32, 29, 29), rgb(83, 78, 78));
        color: white;
      }
      
    }
    #text {
      margin-top: 20px;
      font: {
        size: 18px;
      }
      color: white;
    }
  }
</style>