<template>
  <div id="games">
    <h1>
      Games
    </h1>
    <a href="http://81.70.38.165/">Five in a Row</a>
    <router-link to="/games/chinese-chess">Chinese Chess</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Games'
  }
</script>

<style>

</style>
