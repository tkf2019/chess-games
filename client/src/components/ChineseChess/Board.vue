<template>
  <div id="chess">
    <div id="point">
      <section id="board" :style="size">
        <article class="line">
          <board-lines></board-lines>
        </article>
        <article class="piece">
          <board-pieces></board-pieces>
        </article>
      </section>
    </div>
    <div>
      <button @click="init">
        Load
      </button>
    </div>
  </div>
</template>

<script>
  import BoardLines from './BoardLines'
  import BoardPieces from './BoardPieces'
  import {WIDTH, HEIGHT, TYPE, WAIT, oppoSign} from './const'

  export default {
    name: 'Board',
    data() {
      return {
        pieceSize: 60,
        list: [],
        //from the server: we get a number to judge 
        //which side to load
        //order == 1: the player is red, move first
        //order == 0: the player is black, move second
        order: 0,
        //from the server: this number will change once
        //a piece is moved
        //available == 1: red turn
        //available == 0: black turn
        available: 1
      }
    },
    components: {
      BoardLines,
      BoardPieces
    }, 
    computed: {
      size() {
        let width = WIDTH * this.pieceSize
        let height = HEIGHT * this.pieceSize
        return {
          width: width + this.pieceSize + 'px',
          height: height + this.pieceSize + 'px',
          marginLeft: parseInt(width + this.pieceSize)  / -2 + 'px',
          marginTop: parseInt(height + this.pieceSize) / -2 + 'px'
        }
      }
    },
    methods: {
      choose(x, y, type, state) {
        WAIT.$emit('clearState')
        if (type !== '' 
          && ((this.available && TYPE[type] < 0) || (!this.available && TYPE[type] > 0)
          || state == 3)) {
          if (WAIT.onWaitPiece[0] == x && WAIT.onWaitPiece[1] == y) {
            WAIT.onWaitPiece = [-1, -1]
          } else {
            if (state == 3) {
              this.eat(WAIT.onWaitPiece[0], WAIT.onWaitPiece[1], x, y)
              WAIT.onWaitPiece = [-1, -1]
              this.available = !this.available
            } else {
              WAIT.onWaitPiece = [x, y]
              this.check(x, y, type)
            }
          }
        } else {
          if (state == 2) {
            this.move(WAIT.onWaitPiece[0], WAIT.onWaitPiece[1], x, y)
            this.available = !this.available
          }
          WAIT.onWaitPiece = [-1, -1]
        }
      },
      init() {
        WAIT.$emit('clearPiece')
        if (this.order == 1) {
          this.list[0][0].type = 'ju-b'
          this.list[0][1].type = 'ma-b'
          this.list[0][2].type = 'xiang-b' 
          this.list[0][3].type = 'shi-b'
          this.list[0][4].type = 'jiang-b'
          this.list[0][5].type = 'shi-b' 
          this.list[0][6].type = 'xiang-b' 
          this.list[0][7].type = 'ma-b'
          this.list[0][8].type = 'ju-b'
          this.list[2][1].type = 'pao-b'
          this.list[2][7].type = 'pao-b'
          this.list[3][0].type = 'zu-b'
          this.list[3][2].type = 'zu-b'
          this.list[3][4].type = 'zu-b'
          this.list[3][6].type = 'zu-b'
          this.list[3][8].type = 'zu-b'

          this.list[9][0].type = 'ju-r'
          this.list[9][1].type = 'ma-r'
          this.list[9][2].type = 'xiang-r' 
          this.list[9][3].type = 'shi-r'
          this.list[9][4].type = 'shuai-r'
          this.list[9][5].type = 'shi-r' 
          this.list[9][6].type = 'xiang-r' 
          this.list[9][7].type = 'ma-r'
          this.list[9][8].type = 'ju-r'
          this.list[7][1].type = 'pao-r'
          this.list[7][7].type = 'pao-r'
          this.list[6][0].type = 'bing-r'
          this.list[6][2].type = 'bing-r'
          this.list[6][4].type = 'bing-r'
          this.list[6][6].type = 'bing-r'
          this.list[6][8].type = 'bing-r'
        } else {
          this.list[0][0].type = 'ju-r'
          this.list[0][1].type = 'ma-r'
          this.list[0][2].type = 'xiang-r' 
          this.list[0][3].type = 'shi-r'
          this.list[0][4].type = 'shuai-r'
          this.list[0][5].type = 'shi-r' 
          this.list[0][6].type = 'xiang-r' 
          this.list[0][7].type = 'ma-r'
          this.list[0][8].type = 'ju-r'
          this.list[2][1].type = 'pao-r'
          this.list[2][7].type = 'pao-r'
          this.list[3][0].type = 'bing-r'
          this.list[3][2].type = 'bing-r'
          this.list[3][4].type = 'bing-r'
          this.list[3][6].type = 'bing-r'
          this.list[3][8].type = 'bing-r'

          this.list[9][0].type = 'ju-b'
          this.list[9][1].type = 'ma-b'
          this.list[9][2].type = 'xiang-b' 
          this.list[9][3].type = 'shi-b'
          this.list[9][4].type = 'jiang-b'
          this.list[9][5].type = 'shi-b' 
          this.list[9][6].type = 'xiang-b' 
          this.list[9][7].type = 'ma-b'
          this.list[9][8].type = 'ju-b'
          this.list[7][1].type = 'pao-b'
          this.list[7][7].type = 'pao-b'
          this.list[6][0].type = 'zu-b'
          this.list[6][2].type = 'zu-b'
          this.list[6][4].type = 'zu-b'
          this.list[6][6].type = 'zu-b'
          this.list[6][8].type = 'zu-b'
        }
        
      },
      check(x, y, type) {
        this.list[x][y].state = 1
        let typeNum = TYPE[type]
        if (typeNum == 1 || typeNum == -1) {
          for (let i = y - 1; i >= 0; i--) {
            this.change(x, i, typeNum)
            if (this.list[x][i].type !== '') {
              break
            }
          }
          for (let i = y + 1; i <= WIDTH; i++) {
            this.change(x, i, typeNum)
            if (this.list[x][i].type !== '') {
              break
            }
          }
          for (let i = x - 1; i >= 0; i--) {
            this.change(i, y, typeNum)
            if (this.list[i][y].type !== '') {
              break
            }
          }
          for (let i = x + 1; i <= HEIGHT; i++) {
            this.change(i, y, typeNum)
            if (this.list[i][y].type !== '') {
              break
            }
          }
        } else if (typeNum == 2 || typeNum == -2) {
          if (x - 1 >= 0) {
            if (this.list[x - 1][y].type === '') {
              this.change(x - 2, y - 1, typeNum)
              this.change(x - 2, y + 1, typeNum)
            }
          }
          if (x + 1 <= HEIGHT) {
            if (this.list[x + 1][y].type === '') {
              this.change(x + 2, y - 1, typeNum)
              this.change(x + 2, y + 1, typeNum)
            }
          }
          if (y - 1 >= 0) {
            if (this.list[x][y - 1].type === '') {
              this.change(x - 1, y - 2, typeNum)
              this.change(x + 1, y - 2, typeNum)
            }
          }
          if (y + 1 <= WIDTH) {
            if (this.list[x][y + 1].type === '') {
              this.change(x - 1, y + 2, typeNum)
              this.change(x + 1, y + 2, typeNum)
            } 
          }
        } else if (typeNum === 3 || typeNum === -3) {
          for (let i = y - 1; i >= 0; i--) {
            if (this.list[x][i].type !== '') {
              for (let j = i - 1; j >= 0; j--) {
                if (this.list[x][j].type !== '') {
                  this.change(x, j, typeNum)
                  break
                }
              }
              break
            }
            this.change(x, i, typeNum)
          }
          for (let i = y + 1; i <= WIDTH; i++) {
            if (this.list[x][i].type !== '') {
              for (let j = i + 1; j <= WIDTH; j++) {
                if (this.list[x][j].type !== '') {
                  this.change(x, j, typeNum)
                  break
                }
              }
              break
            }
            this.change(x, i, typeNum)
          }
          for (let i = x - 1; i >= 0; i--) {
            if (this.list[i][y].type !== '') {
              for (let j = i - 1; j >= 0; j--) {
                if (this.list[j][y].type !== '') {
                  this.change(j, y, typeNum)
                  break
                }
              }
              break
            }
            this.change(i, y, typeNum)
          }
          for (let i = x + 1; i <= HEIGHT; i++) {
            if (this.list[i][y].type !== '') {
              for (let j = i + 1; j <= HEIGHT; j++) {
                if (this.list[j][y].type !== '') {
                  this.change(j, y, typeNum)
                  break
                }
              }
              break
            }
            this.change(i, y, typeNum)
          }
        } else if (typeNum == 4 || typeNum == -4) {
          if (y == 0 || y == 4) {
            if (this.list[x - 1][y + 1].type === '') {
              this.change(x - 2, y + 2, typeNum)
            }
            if (this.list[x + 1][y + 1].type === '') {
              this.change(x + 2, y + 2, typeNum)
            }
          }
          if (y == 8 || y == 4) {
            if (this.list[x - 1][y - 1].type === '') {
              this.change(x - 2, y - 2, typeNum)
            }
            if (this.list[x + 1][y - 1].type === '') {
              this.change(x + 2, y - 2, typeNum)
            }
          }
          if (x == 0 || x == 5) {
            if (this.list[x + 1][y - 1].type === '') {
              this.change(x + 2, y - 2, typeNum)
            }
            if (this.list[x + 1][y + 1].type === '') {
              this.change(x + 2, y + 2, typeNum)
            }
          }
          if (x == 4 || x == 9) {
            if (this.list[x - 1][y - 1].type === '') {
              this.change(x - 2, y - 2, typeNum)
            }
            if (this.list[x - 1][y + 1].type === '') {
              this.change(x - 2, y + 2, typeNum)
            }
          }
        } else if (typeNum == 5 || typeNum == -5) {
          if (x <= 2) {
            if (x - 1 >= 0 && y - 1 >= 3) {
              this.change(x - 1, y - 1, typeNum)
            }
            if (x - 1 >= 0 && y + 1 <= 5) {
              this.change(x - 1, y + 1, typeNum) 
            }
            if (x + 1 <= 2 && y - 1 >= 3) {
              this.change(x + 1, y - 1, typeNum)
            }
            if (x + 1 <= 2 && y + 1 <= 5) {
              this.change(x + 1, y + 1, typeNum)
            }
          } else if (x >= 7) {
            if (x - 1 >= 7 && y - 1 >= 3) {
              this.change(x - 1, y - 1, typeNum)
            }
            if (x - 1 >= 7 && y + 1 <= 5) {
              this.change(x - 1, y + 1, typeNum) 
            }
            if (x + 1 <= 9 && y - 1 >= 3) {
              this.change(x + 1, y - 1, typeNum)
            }
            if (x + 1 <= 9 && y + 1 <= 5) {
              this.change(x + 1, y + 1, typeNum)
            }
          }
        } else if (typeNum == 6 || typeNum == -6) {
          if (x <= 2) {
            if (x - 1 >= 0) {
              this.change(x - 1, y, typeNum)
            }
            if (x + 1 <= 2) {
              this.change(x + 1, y, typeNum)
            }
            if (y - 1 >= 3) {
              this.change(x, y - 1, typeNum)
            }
            if (y + 1 <= 5) {
              this.change(x, y + 1, typeNum)
            }
          } else if (x >= 7) {
            if (x - 1 >= 7) {
              this.change(x - 1, y, typeNum)
            }
            if (x + 1 <= 9) {
              this.change(x + 1, y, typeNum)
            }
            if (y - 1 >= 3) {
              this.change(x, y - 1, typeNum)
            }
            if (y + 1 <= 5) {
              this.change(x, y + 1, typeNum)
            }
          }
        } else if (typeNum == 7 || typeNum == -7) {
          if ((typeNum == 7 && this.order == 1) || (typeNum == -7 && this.order == 0)) {
            this.change(x + 1, y, typeNum)
            if (x >= 5) {
              this.change(x, y - 1, typeNum)
              this.change(x, y + 1, typeNum)
            }
          }
          if ((typeNum == -7 && this.order == 1) || (typeNum == 7 && this.order == 0)) {
            this.change(x - 1, y, typeNum)
            if (x <= 4) {
              this.change(x, y - 1, typeNum)
              this.change(x, y + 1, typeNum)
            }
          }
        }
      },
      change(x, y, type) {
        if (x >= 0 && x <= HEIGHT && y >= 0 && y <= WIDTH) {
          if (this.list[x][y].type != '') {
            if (oppoSign(type, TYPE[this.list[x][y].type])) {
                this.list[x][y].state = 3
              }
          } else {
            this.list[x][y].state = 2
          }
        }
      },
      move(fromx, fromy, tox, toy) {
        this.list[tox][toy].type = this.list[fromx][fromy].type
        this.list[fromx][fromy].type = ''
      },
      eat(fromx, fromy, tox, toy) {
        this.move(fromx, fromy, tox, toy)
      }
    },
    created() {
      WAIT.$on('loadPiece', piece => {
        if (this.list[piece.x] == undefined) {
          this.list[piece.x] = []
        }
        this.list[piece.x][piece.y] = piece
      })
      WAIT.$on('clickPiece', (piece) => {
        this.choose(piece.x, piece.y, piece.type, piece.state)
      })
    }
  }
</script>

<style lang="scss">
#chess {
  position: absolute;
  background-image: url('../../assets/images/16.jpg');
  background-size: cover;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
#point {
  position: absolute;
  width: 0;
  height: 0;
  left: 50%;
  top: 50%;
}
#board {
    position: fixed;
    border-style: solid;
    border-color: #3d3b3b;
    box-shadow: 0 0 25px rgb(143, 97, 76, 0.35);
}
.line {
  position: absolute;
  z-index: -1;
  width: 540px;
  height: 600px;
  &>article {
    width: 100%;
    height: 100%;
    &>svg {
      width: 100%;
      height: 100%;
      .horizontal, .vertical {
        stroke-width: 1;
        stroke: #571b16;
      }
      .decoration {
        stroke-width: 1;
        stroke: rgba(134, 42, 3, 0.55);
      }
      .auxiliary {
        stroke-width: 1;
        stroke: #752e2b;
      }
    }
  }
}
.boardPieces {
  &>article {
    float: left;
    box-sizing: border-box;
    cursor: default;
    &>div {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      box-sizing: border-box;
      border: 3px solid rgba(0, 0, 0, 0);
      transition: all 0.2s;
      text-align: center;
      &:hover {
        box-shadow: 0 0 25pt rgba(0, 0, 0, 0.35);
        border: 3px double rgba(0, 0, 0, 0.15);
        transform: scale(1.1, 1.1);
        cursor: pointer;
      }
      &.choose {
        box-shadow: 0 0 25pt green;
        border: 3px solid green;
      }
      &.potential {
        box-shadow: 0 0 25pt yellow;
        border: yellow;
      }
      &.target {
        box-shadow: 0 0 25pt red;
        border: red;
      }
      &>div {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        box-sizing: border-box;
        border: 2px solid rgba(0, 0, 0, 0);
        background: rgba(0, 0, 0, 0);
        box-shadow: rgba(0, 0, 0, 0);
        transition: all 0.2s;
        font: {
          family: 'KaiTi';
          weight: 600;
          size: 32px;
        }
        &::before {
          content: '';
          opacity: 0;
          transition: all 0.2s;
        }
        &.exist {
          box-shadow: 0 0 25pt rgba(0, 0, 0, 0);
          &::before {
            opacity: 1;
          }
        }

        &.ju-b {
          color: white;
          background-color: black;
          border-color: gold;
          &::before {
            content: '車';
          }
        }

        &.ju-r {
          color: black;
          background-color: red;
          border-color: white;
          &::before {
            content: '車';
          }
        }

        &.ma-b {
          color: white;
          background-color: black;
          border-color: gold;
          &::before {
            content: '馬';
          }
        }
        
        &.ma-r {
          color: black;
          background-color: red;
          border-color: white;
          &::before {
            content: '馬';
          }
        }

        &.xiang-b {
          color: white;
          background-color: black;
          border-color: gold;
          &::before {
            content: '象';
          }
        }
        
        &.xiang-r {
          color: black;
          background-color: red;
          border-color: white;
          &::before {
            content: '相';
          }
        }

        &.shi-b {
          color: white;
          background-color: black;
          border-color: gold;
          &::before {
            content: '士';
          }
        }
        
        &.shi-r {
          color: black;
          background-color: red;
          border-color: white;
          &::before {
            content: '仕';
          }
        }

        &.jiang-b {
          color: white;
          background-color: black;
          border-color: gold;
          &::before {
            content: '将';
          }
        }
        
        &.shuai-r {
          color: black;
          background-color: red;
          border-color: white;
          &::before {
            content: '帅';
          }
        }

        &.pao-b {
          color: white;
          background-color: black;
          border-color: gold;
          &::before {
            content: '炮';
          }
        }
        
        &.pao-r {
          color: black;
          background-color: red;
          border-color: white;
          &::before {
            content: '炮';
          }
        }

        &.zu-b {
          color: white;
          background-color: black;
          border-color: gold;
          &::before {
            content: '卒';
          }
        }
        
        &.bing-r {
          color: black;
          background-color: red;
          border-color: white;
          &::before {
            content: '兵';
          }
        }
      }  
    }
  }
  
}
</style>