<template functional>
  <i-col
    :xs="props.xs"
    :sm="props.sm"
    :md="props.md"
    :lg="props.lg"
    :xl="props.xl"
  >
    <slot></slot>
  </i-col>
</template>

<script>
export default {
  props: {
    xs: {
      type: Number,
      default: 24
    },
    sm: {
      type: Number,
      default: 12
    },
    md: {
      type: Number,
      default: 12
    },
    lg: {
      type: Number,
      default: 12
    },
    xl: {
      type: Number,
      default: 6
    }
  }
}
</script>
