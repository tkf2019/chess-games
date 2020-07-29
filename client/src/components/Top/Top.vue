<template>
  <div id="top-container">
    <!-- <img src="../../assets/images/15.jpg" alt=""> -->
  </div>
</template>

<script>
export default {
  name: 'TopContainer'
}
</script>

<style lang="scss">
  #top-container {
    position: absolute;
    width: 100%;
    min-width: 590px;
    height: 1000px;
    margin: 0;
    padding: 0;
    left: 0;
    top: 0;
    z-index: -1;
    border: none;
    background-image: url('../../assets/images/20.jpg');
    background-size: 100% auto;
    background-repeat: no-repeat;
    overflow: auto;
  }
</style>