<template>
  <Chart
    ref="chart"
    theme="walden"
    :options="options"
    :autoresize="true"
  ></Chart>
</template>

<script>
import { mapState } from 'vuex'

const { blue } = require('../../../style/variable')

export default {
  name: 'HistoryProgressLine',
  components: {},
  props: {},
  data () {
    return {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
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
          boundaryGap: false,
          data: [],
          splitLine: {
            show: true
          }
        },
        yAxis: {
          type: 'value',
          axisLable: {
            show: true
          },
          axisPointer: {
            label: {
              formatter: params => parseInt(params.value) + '个'
            }
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '任务数',
            type: 'line',
            data: [],
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: blue
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 255, 255, 0)'
                  }
                ]
              }
            },
            smooth: true
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['historyProgress'])
  },
  watch: {
    historyProgress (value) {
      const axisData = []
      const seriesData = []

      for (let i = 0, len = value.length; i < len; i++) {
        const { year, month, count } = value[i]

        axisData.push(`${year}年${month}月`)
        seriesData.push(count)
      }

      this.options.xAxis.data = axisData
      this.options.series[0].data = seriesData
    }
  }
}
</script>
