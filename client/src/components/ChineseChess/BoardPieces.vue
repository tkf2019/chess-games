<script>
  import Piece from './PieceInfo'
  import {WIDTH, HEIGHT} from './const'

  export default {
    name: 'Pieces',
    props: {
      size: {
        type: Number,
        default: 60
      },
      padding: {
        type: Number,
        default: 1
      },
      border: {
        type: Number,
        default: 3 
      },
      font: {
        type: Number,
        default: 24
      }
    },
    components: {
      Piece
    },
    render(h) {
      let pieceList = []
      pieceList.unshift(h('style', {
        domProps: {
          innerHTML: `
            .boardPieces>article{
              width: ${this.size}px;
              height: ${this.size}px;
              padding: ${this.padding}px;
            }
            .boardPieces>article>div{
              border-width: ${this.border}px;
              font-size: ${this.font}px;
            }
            .boardPieces>article>div>div{
              line-height: ${this.size - (this.padding + this.border) * 2 - 4}px;
            }
          ` 
        }
      }))
      for (let i = 0; i <= HEIGHT; i++) {
        for (let j = 0; j <= WIDTH; j++) {
          pieceList.push(h('article', [
            h('piece', {
              props: {
                x: i,
                y: j
              }
            })
          ]))
        }
      }
      return h('section', {
        class: 'boardPieces',
      }, pieceList)
    }
  }
</script>

<style>

</style>