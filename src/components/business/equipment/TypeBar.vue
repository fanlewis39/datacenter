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
  name: 'TypeBar',
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
          bottom: '1%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              rotate: 40
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
            name: '设备数量',
            type: 'bar',
            barWidth: '60%',
            data: []
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['equipmentName'])
  },
  watch: {
    equipmentName (value) {
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
