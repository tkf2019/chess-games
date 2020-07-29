<template>
  <div id="nav-container">

    <img src="@/assets/images/icon3.png">

    <div id="nav-title">
      Chess Games
    </div>

    <div id="nav-items" v-if="clientWidth">
      <nav-item v-for="item in navItems" 
        :key="item">
        <li>
          <router-link :to="getPath(item)">
            {{item}}
          </router-link>
        </li>
      </nav-item>      
    </div>
    
    <nav-button id="nav-button" v-else>
    </nav-button>

    <nav-type id="nav-type"></nav-type>
    <router-view></router-view>
  </div>
</template>

<script>
import NavItem from './NavItem'
import NavButton from './NavButton'
import NavType from './NavType'

export default {
  name: 'NavContainer',
  data() {
    return {
      navItems: [
        'Home',
        'Games',
        'Files',
        'About'
      ],
      id: '',
      screenWidth: document.body.clientWidth 
        || document.documentElement.clientWidth,
      screenHeight: document.body.clientHeight 
        || document.documentElement.clientHeight
    }
  },
  components: {
    NavItem,
    NavButton,
    NavType
  },
  methods: {
    getPath(item) {
      return '/' + item.toLowerCase()
    }
  }, 
  computed: {
    clientWidth() {
      let maxWidth = window.screen.width
      return maxWidth * 0.62 < this.screenWidth
    }
  },
  mounted() {
    const _this = this
    window.onresize = () => {
      return (() => {
        _this.screenWidth = document.body.clientWidth 
          || document.documentElement.clientWidth
        _this.screenHeight = document.body.clientHeight 
          || document.documentElement.clientHeight
      })()
    }
  }
}
</script>

<style lang="scss">
  
  #nav-container {
    min-width: 590px;
    overflow: auto;
    position: fixed;
    display: flex;
    background-image: linear-gradient(#000, rgb(52, 47, 47));
    border: none;
    box-shadow: 1px 1px 10px grey;
    width: 100%;
    height: auto;
    margin: 0;
    left: 0;
    right: 0;
    top: 0;

    img {
      margin-left: 2%;
      width: 60px;
      height: auto;
    }

    #nav-title {
      color: white;
      margin: 12px 5% 0px 2%;
      font: {
        family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        size: 30px;
        style: italic;
      }
    }

    #nav-items {
      width: 50%;
      display: flex;
      :hover {
        background-image: linear-gradient(rgb(32, 29, 29), rgb(83, 78, 78));
        color: white;
      }
    }

    #nav-button {
      position: relative;
      margin-top: 10px;
      margin-left: 5%;
    }
  }
  
</style>