<template>
  <div class="numeral">
    <div class="numeral__wrapper">
      <span class="numeral__title">
        {{ formatedCount }}
      </span>
      <span class="numeral__subtitle">
        {{ unit }}
      </span>
    </div>
  </div>
</template>

<script>
import { formatNumber } from '../../utils'

export default {
  name: 'Numeral',
  props: {
    count: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: '个'
    }
  },
  computed: {
    formatedCount () {
      return formatNumber(this.count)
    }
  }
}
</script>
