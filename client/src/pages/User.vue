<template>
  <div id="user-login">
    <div id="login-box" :style="boxStyle">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      boxStyle: {
        marginTop: ''
      },
      screenHeight: document.body.clientHeight 
        || document.documentElement.clientHeight,
      screenWidth: document.body.clientWidth 
        || document.documentElement.clientWidth,
      boxHeight: 0,
      observer: null
    }
  },
  methods: {
    setBoxMarginTop() {
      this.boxHeight = document.getElementById('login-box').clientHeight
      this.boxStyle.marginTop = (this.screenHeight - this.boxHeight) / 2 + 'px'
    }
  },
  mounted() {
    this.setBoxMarginTop()
    
    const _this = this
    window.onresize = () => {
      return (() => {
        _this.screenHeight = document.body.clientHeight 
          || document.documentElement.clientHeight
        this.setBoxMarginTop()
      })()
    }
  },
  updated() {
    this.setBoxMarginTop()
  }
}

</script>

<style lang="scss">
  
  #user-login {
    position: fixed;
    width: 100%;
    min-width: 1300px;
    height: 100%;
    top: 0;
    left: 0;
    background-size: 100% auto;
    background: url('../assets/images/15.jpg') no-repeat;
    color: white;
    #login-box {
      width: 30%;
      height: auto;
      text-align: center;
      background: #00000060;
      margin: 0 auto 0;
      padding: 20px 50px;
      border-radius: 5%;
      box-shadow: 1px 1px 10px #000;
      font: {
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      }
    }
  }
</style>
