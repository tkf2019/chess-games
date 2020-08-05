import Vue from 'vue'
const WIDTH = 8
const HEIGHT = 9

const TYPE = {
  'ju-b': 1,
  'ma-b': 2,
  'pao-b': 3,
  'xiang-b': 4,
  'shi-b': 5,
  'jiang-b': 6,
  'zu-b': 7,
  'ju-r': -1,
  'ma-r': -2,
  'pao-r': -3,
  'xiang-r': -4,
  'shi-r': -5,
  'shuai-r': -6,
  'bing-r': -7
}

const WAIT = new Vue ({
  data() {
    return {
      onWaitExist: false,
      onWaitPiece: [-1, -1]
    }
  }
})

function oppoSign(num1, num2) {
  if ((num1 > 0 && num2 < 0) || (num1 < 0 && num2 > 0)) {
    return true
  }
}

export {
  WIDTH,
  HEIGHT,
  TYPE,
  WAIT,
  oppoSign
}