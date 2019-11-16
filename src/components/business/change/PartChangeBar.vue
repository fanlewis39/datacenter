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
  name: 'PartChangeBar',
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
    ...mapGetters(['partChangeData'])
  },
  watch: {
    partChangeData (value) {
      const parts = Object.keys(value)
      const seriesData = []

      for (let i = 0, len = parts.length; i < len; i++) {
        seriesData.push(value[parts[i]].length)
      }

      this.options.xAxis.data = parts
      this.options.series[0].data = seriesData
      this.$refs.chart.resize()
    }
  }
}
</script>
