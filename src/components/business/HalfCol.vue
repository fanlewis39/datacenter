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
      default: 24
    },
    md: {
      type: Number,
      default: 24
    },
    lg: {
      type: Number,
      default: 24
    },
    xl: {
      type: Number,
      default: 12
    }
  }
}
</script>
