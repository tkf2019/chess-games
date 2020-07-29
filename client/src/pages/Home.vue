<template>
  <div id="home">
    <nav-container></nav-container>
    <top-container></top-container>
    <router-view></router-view>
  </div>
</template>

<script>
import NavContainer from '@/components/Nav/Nav'
import TopContainer from '@/components/Top/Top'
import auth from '../store/auth'

export default {
  name: 'Home',
  components: {
    NavContainer,
    TopContainer
  },
  beforeCreate() {
    const token = sessionStorage.getItem('TOKEN_STORAGE_KEY')
    auth.state.token = token
    
    const name = sessionStorage.getItem('USER_NAME')
    const email = sessionStorage.getItem('USER_EMAIL')
    auth.state.user = { name, email }
  }
}
</script>

<style lang="scss">
  #home {
    position: absolute;
    width: 100%;
    min-width: 1300px;
    top: 0;
    left: 0;
  }
</style>