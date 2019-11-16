<template>
  <Chart
    ref="chart"
    theme="walden"
    :options="options"
    :autoresize="true"
  ></Chart>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PartsProgressBar',
  data () {
    return {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '任务数',
            type: 'bar',
            barWidth: '60%',
            data: []
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['partsProgress'])
  },
  watch: {
    partsProgress (value) {
      this.options.xAxis.data = Object.keys(value)
      this.options.series[0].data = Object.values(value)
      this.$refs.chart.resize()
    }
  }
}
</script>
