<template>
  <li :class="className" @click="handleSelect">
    <slot></slot>
    <span class="navbar-divider"></span>
  </li>
</template>

<script>
import { dispatch } from '../../utils'

export default {
  name: 'NavbarItem',
  props: {
    name: {
      type: [String, Number],
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: this.active
    }
  },
  computed: {
    className () {
      return {
        'navbar-item': true,
        open: this.open
      }
    }
  },
  watch: {
    active (value) {
      this.open = value

      if (value) {
        this.handleSelect()
      }
    }
  },
  methods: {
    handleSelect () {
      if (this.disabled) {
        return
      }

      const { left, width } = this.$el.getBoundingClientRect()

      this.dispatch('Navbar', 'on-navbar-change', {
        name: this.name,
        left,
        width
      })
    },
    dispatch (componentName, eventName, ...params) {
      dispatch.apply(this, [componentName, eventName].concat(params))
    }
  }
}
</script>
