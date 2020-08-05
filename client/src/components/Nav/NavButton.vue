<template>
  <div id="nav-button">
    <div class="menuBlock" @click="changeMenu">
      <div :class="changeStyle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavButton',
  data() {
    return {
      active: false
    }
  },
  methods: {
    changeMenu() {
      this.active = !this.active
    }
  },
  computed: {
    changeStyle() {
      return this.active ? 
        'menuActivated' : 'menu'
    }
  }
}
</script>

<style lang="scss">
  .menuBlock {
    width: 40px;
    height: 40px;
    display: block;
    background-color: #00000090;
    border-radius: 50%;
    box-shadow: 0 0 10px 5px #ccc;
    span {
      width: 16px;
      height: 2px;
      position: absolute;
      left: 12px;
      top: 15px;
      background-color: white;
      transition: all 0.4s;
      border-radius: 2px;
    }
    &:hover{
      cursor: pointer;
    }
  }
  .menu {
    span {
      &:nth-child(1) {
        top: 14px;
      }
      &:nth-child(2) {
        top: 19px;
      }
      &:nth-child(3) {
        top: 24px;
      }
    }
  }
  .menuActivated {
    span {
      &:nth-child(1) {
        top: 19px;
        transform: rotate(45deg);
      }
      &:nth-child(2) {
        transform: scale(0, 1);
      }
      &:nth-child(3) {
        top: 19px;
        transform: rotate(-45deg);
      }
    }
  }
</style>