<template>
  <div id="nav-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NavItem'
}
</script>

<style lang="scss">
  #nav-item {
    text-align: center;
    margin-right: 10%;
    width: auto;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    font: {
      size: 24px;
    }
    li {
      height: 100%;
      color: white;
      list-style-type: none;
      margin: auto;
    }
    a {
      display: block;
      line-height: 55px;
      text-decoration: none;
      color: white;
    }  
  }
</style>