<template>
  <div :class="passiveClass" @click="handleClick">
    <div :class="mainClass">
    </div>
  </div>
</template>

<script>
  import {WAIT} from './const'
  export default {
    name: 'Piece',
    data() {
      return {
        type: '',
        state: 0
      }
    },
    props: {
      x: Number,
      y: Number
    },
    created() {
      WAIT.$emit('loadPiece', this)
      WAIT.$on('clearPiece', () => {
        this.type = ''
      })
      WAIT.$on('clearState', () => {
        this.state = 0
      })
    },
    computed: {
      passiveClass() {
        let passiveClass = {}
        if (this.state == 1) {
          passiveClass['choose'] = true
        } else if (this.state == 2) {
          passiveClass['potential'] = true
        } else if (this.state == 3) {
          passiveClass['target'] = true
        }
        return passiveClass
      },
      mainClass() {
        let mainClass = {}
        if (this.type !== '') {
          mainClass['exist'] = true
          mainClass[this.type] = true
        }
        return mainClass
      }
    },
    methods: {
      handleClick() {
        WAIT.$emit('clickPiece', {
          x: this.x, 
          y: this.y, 
          type: this.type, 
          state: this.state
        })
      } 
    }
  }
</script>

<style lang="scss">

</style>