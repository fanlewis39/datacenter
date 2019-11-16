<template>
  <div class="navbar">
    <ul class="navbar-list">
      <slot></slot>
    </ul>
    <div ref="mark" class="navbar-mark"></div>
  </div>
</template>

<script>
import { isNull, findComponentsDownward } from '../../utils'

const childName = 'NavbarItem'

export default {
  name: 'Navbar',
  props: {
    active: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      currentActive: this.active
    }
  },
  watch: {
    active (val) {
      this.currentActive = val
    }
  },
  mounted () {
    const children = findComponentsDownward(this, childName)

    let child

    if (isNull(this.currentActive)) {
      child = children.find(item => item.active)
    } else {
      child = children.find(item => item.name === this.currentActive)
    }

    if (child) {
      this.currentActive = child.name

      this.$nextTick(() => {
        const { left, width } = child.$el.getBoundingClientRect()

        this.computeMarkPosition(left, width)
      })
    }

    this.$on('on-navbar-change', ({ name, left, width }) => {
      this.computeMarkPosition(left, width)
      this.$emit('on-select', name)
    })
  },
  methods: {
    computeMarkPosition (left, width) {
      const mark = this.$refs.mark

      mark.style.left = `${left + 18}px`
      mark.style.width = `${width - 36}px`
    }
  }
}
</script>
