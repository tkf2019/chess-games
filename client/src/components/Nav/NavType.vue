<template>
  <div id="nav-type">
    <template v-if="userExist">
      <div id="text">
        {{username}}
      </div>
      <button @click="logoutClick">
        Logout
      </button>
    </template>
    
    <template v-else>
      <img src="@/assets/images/icon4.png">
      <button @click="loginClick">
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
    margin: 0;
    padding: 0;
    display: flex;
    button {
      height: 60px;
      margin-left: 20px;    
    }
    #text {
      margin-top: 14px;
      font: {
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-weight: 600;
        size: 24px;
      } 
      color: white;
    }
  }
</style>