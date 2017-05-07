import Human from '../../index'

export default {
  props: {
    mobile: {
      type: [String, Object]
    },
    tablet: {
      type: [String, Object]
    },
    desktop: {
      type: [String, Object]
    },
    widescreen: {
      type: [String, Object]
    }
  },
  data () {
    return {
      offsetWidth: 0
    }
  },
  computed: {
    adaptedMedia () {
      let screens = Human.$screens.filter(item => {
        return this.offsetWidth > item.min && typeof this[item.name] !== 'undefined'
      })

      // 取结果集中的最后一个匹配值
      let screen = screens.reverse()[0]

      if (screen) {
        return this[screen.name]
      }
    }
  },
  methods: {
    setOffsetWidth () {
      this.offsetWidth = document.body.offsetWidth
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setOffsetWidth()
      window.addEventListener('resize', this.setOffsetWidth)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setOffsetWidth)
  }
}