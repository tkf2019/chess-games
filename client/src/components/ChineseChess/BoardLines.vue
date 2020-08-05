<script>
  import {WIDTH, HEIGHT} from './const'

  export default {
    name: 'BoardLines',
    props: {
      size: {
        type: Number,
        default: 60
      }
    },
    render(h) {
      let lineList = []
      const padding = this.size / 2

      for (let i = 0; i <= WIDTH; i++) {
        lineList.push(h('line', {
          class: 'vertical',
          attrs: {
            x1: i * this.size + padding,
            y1: padding,
            x2: i * this.size + padding,
            y2: 4 * this.size + padding
          }
        }))
      }

      for (let i = 0; i <= WIDTH; i++) {
        lineList.push(h('line', {
          class: 'vertical',
          attrs: {
            x1: i * this.size + padding,
            y1: 5 * this.size + padding,
            x2: i * this.size + padding,
            y2: HEIGHT * this.size + padding
          }
        }))
      }
      
      for (let i = 0; i <= HEIGHT; i++) {
        lineList.push(h('line', {
          class: 'horizontal',
          attrs: {
            x1: padding,
            y1: i * this.size + padding,
            x2: WIDTH * this.size + padding,
            y2: i * this.size + padding 
          }
        }))
      }

      //The outside frame is dubble-line
      const outLinePadding = 3
      //vertical
      lineList.push(h('line', {
        class: {
          auxiliary: true,
          decoration: true
        },
        attrs: {
          x1: -outLinePadding + padding,
          y1: -outLinePadding + padding,
          x2: -outLinePadding + padding,
          y2: HEIGHT * this.size + outLinePadding + padding
        }
      }))

      lineList.push(h('line', {
        class: {
          auxiliary: true,
          decoration: true
        },
        attrs: {
          x1: WIDTH * this.size + outLinePadding + padding,
          y1: -outLinePadding + padding,
          x2: WIDTH * this.size + outLinePadding + padding,
          y2: HEIGHT * this.size + outLinePadding + padding
        }
      }))
      //horizontal
      lineList.push(h('line', {
        class: {
          auxiliary: true,
          decoration: true
        },
        attrs: {
          x1: -outLinePadding + padding,
          y1: -outLinePadding + padding,
          x2: WIDTH * this.size + outLinePadding + padding,
          y2: -outLinePadding + padding,
        }
      }))

      lineList.push(h('line', {
        class: {
          auxiliary: true,
          decoration: true
        },
        attrs: {
          x1: -outLinePadding + padding,
          y1: HEIGHT * this.size + outLinePadding + padding,
          x2: WIDTH * this.size + outLinePadding + padding,
          y2: HEIGHT * this.size + outLinePadding + padding,
        }
      }))
      //bias
      lineList.push(h('line', {
        class: 'auxiliary',
        attrs: {
          x1: 3 * this.size + padding,
          y1: 0 + padding,
          x2: 5 * this.size + padding,
          y2: 2 * this.size + padding
        }
      }))
      lineList.push(h('line', {
        class: 'auxiliary',
        attrs: {
          x1: 5 * this.size + padding,
          y1: 0 + padding,
          x2: 3 * this.size + padding,
          y2: 2 * this.size + padding
        }
      }))
      lineList.push(h('line', {
        class: 'auxiliary',
        attrs: {
          x1: 3 * this.size + padding,
          y1: 7 * this.size + padding,
          x2: 5 * this.size + padding,
          y2: 9 * this.size + padding
        }
      }))
      lineList.push(h('line', {
        class: 'auxiliary',
        attrs: {
          x1: 5 * this.size + padding,
          y1: 7 * this.size + padding,
          x2: 3 * this.size + padding,
          y2: 9 * this.size + padding
        }
      }))
      //moldings
      lineList = lineList.concat(molding(h, this.size + padding, 2 * this.size + padding, 0.2 * this.size))
      lineList = lineList.concat(molding(h, 7 * this.size + padding, 2 * this.size + padding, 0.2 * this.size))
      lineList = lineList.concat(molding(h, 0 + padding, 3 * this.size + padding, 0.2 * this.size, 'left'))
      lineList = lineList.concat(molding(h, 2 * this.size + padding, 3 * this.size + padding, 0.2 * this.size))
      lineList = lineList.concat(molding(h, 4 * this.size + padding, 3 * this.size + padding, 0.2 * this.size))
      lineList = lineList.concat(molding(h, 6 * this.size + padding, 3 * this.size + padding, 0.2 * this.size))
      lineList = lineList.concat(molding(h, 8 * this.size + padding, 3 * this.size + padding, 0.2 * this.size, 'right'))

      lineList = lineList.concat(molding(h, this.size + padding, 7 * this.size + padding, 0.2 * this.size))
      lineList = lineList.concat(molding(h, 7 * this.size + padding, 7 * this.size + padding, 0.2 * this.size))
      lineList = lineList.concat(molding(h, 0 + padding, 6 * this.size + padding, 0.2 * this.size, 'left'))
      lineList = lineList.concat(molding(h, 2 * this.size + padding, 6 * this.size + padding, 0.2 * this.size))
      lineList = lineList.concat(molding(h, 4 * this.size + padding, 6 * this.size + padding, 0.2 * this.size))
      lineList = lineList.concat(molding(h, 6 * this.size + padding, 6 * this.size + padding, 0.2 * this.size))
      lineList = lineList.concat(molding(h, 8 * this.size + padding, 6 * this.size + padding, 0.2 * this.size, 'right'))

      return h('article', [
        h('svg', lineList)
      ])
    }
  }
  function molding(h, x, y, size, type) {
    let lineList = []
    const outLinePadding = 3
    if (type !== 'left') {
      lineList.push(h('line', {
        class: 'decoration',
        attrs: {
          x1: x - size - outLinePadding,
          y1: y + outLinePadding,
          x2: x - outLinePadding,
          y2: y + outLinePadding
        }
      }))
      lineList.push(h('line', {
        class: 'decoration',
        attrs: {
          x1: x - outLinePadding,
          y1: y + size + outLinePadding,
          x2: x - outLinePadding,
          y2: y + outLinePadding
        }
      }))
      lineList.push(h('line', {
        class: 'decoration',
        attrs: {
          x1: x - size - outLinePadding,
          y1: y - outLinePadding,
          x2: x - outLinePadding,
          y2: y - outLinePadding
        }
      }))
      lineList.push(h('line', {
        class: 'decoration',
        attrs: {
          x1: x - outLinePadding, 
          y1: y - size - outLinePadding,
          x2: x - outLinePadding,
          y2: y - outLinePadding
        }
      }))
    }
    if (type !== 'right') {
      lineList.push(h('line', {
        class: 'decoration',
        attrs: {
          x1: x + size + outLinePadding,
          y1: y + outLinePadding,
          x2: x + outLinePadding,
          y2: y + outLinePadding
        }
      }))
      lineList.push(h('line', {
        class: 'decoration',
        attrs: {
          x1: x + outLinePadding,
          y1: y + size + outLinePadding,
          x2: x + outLinePadding,
          y2: y + outLinePadding
        }
      }))
      
      lineList.push(h('line', {
        class: 'decoration',
        attrs: {
          x1: x + size + outLinePadding,
          y1: y - outLinePadding,
          x2: x + outLinePadding,
          y2: y - outLinePadding
        }
      }))
      lineList.push(h('line', {
        class: 'decoration',
        attrs: {
          x1: x + outLinePadding,
          y1: y - size - outLinePadding,
          x2: x + outLinePadding,
          y2: y - outLinePadding
        }
      }))
    }
    return lineList
  }
</script>

<style lang="scss">
  
</style>