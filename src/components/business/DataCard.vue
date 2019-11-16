<template>
  <Card :bordered="false" :dis-hover="true">
    <div class="data-card">
      <div class="data-card__title">
        <slot name="title"></slot>
      </div>
      <div class="data-card__content" :style="{ height: `${height}px` }">
        <slot></slot>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'DataCard',
  props: {
    /* eslint-disable */
    height: Number
    /* eslint-disable */
  }
}
</script>
