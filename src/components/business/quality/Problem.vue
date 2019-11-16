<template>
  <Chart
    autoresize
    theme="walden"
    :options="options"
  ></Chart>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Problem',
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
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            minInterval: 1
          }
        ],
        series: [
          {
            name: '问题数量',
            type: 'bar',
            barWidth: '60%',
            data: []
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['problemPercent'])
  },
  watch: {
    problemPercent (value) {
      const axisData = []
      const seriesData = []

      for (let key in value) {
        axisData.push(key)
        seriesData.push(value[key])
      }

      this.options.xAxis[0].data = axisData
      this.options.series[0].data = seriesData
    }
  }
}
</script>
