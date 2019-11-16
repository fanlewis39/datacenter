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
  name: 'ChangeValueBar',
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
    ...mapGetters(['valueChangeData'])
  },
  watch: {
    valueChangeData (value) {
      const types = Object.keys(value)
      const seriesData = []

      for (let i = 0, len = types.length; i < len; i++) {
        seriesData.push(value[types[i]].length)
      }

      this.options.xAxis.data = types
      this.options.series[0].data = seriesData
      this.$refs.chart.resize()
    }
  }
}
</script>
