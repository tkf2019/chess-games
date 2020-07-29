<template>
  <div id="user-input">
    
    <input type="text" :placeholder="placeHolder"
      @mouseover="changeBottom" @mouseleave="changeBottom"
      v-model="inputData" @blur="emitData('blur')">

    <div class="bottom-line">
      <div :class="changeBottomStyle">
         <span></span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'UserInput',
  data() {
    return {
      bottomVisible: true,
      inputData: ''
    }
  },
  props: {
    placeHolder: String
  },
  methods: {
    changeBottom() {
      this.bottomVisible = !this.bottomVisible
    },
    emitData(type, event) {
      this.$emit('input', type, this.inputData, this.placeHolder)
    }
  },
  computed: {
    changeBottomStyle() {
      return this.bottomVisible ?
        'default' : 'change'
    }
  }
}
</script>

<style lang="scss">
  #user-input {
    input {
      background: none;
      border: none;
      padding: 0 10px;
      margin-top: 30px;
      outline: none;
      color: white;
      font: {
        size: 24px;
        family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      }
    }
    .bottom-line {
      span {
        width: 75%;
        border-radius: 50%;
        background-color: white;
        display: inline-block;
        display: -moz-inline-box;
        transition: all 0.6s;
      }
      .default {
        span {
          height: 2px;
        }
      }
      .change {
        span {
          height: 2px;
          transform: scale(0, 1);
        }
      }
    }
  }
</style>