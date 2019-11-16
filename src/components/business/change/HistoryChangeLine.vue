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
import { deepClone, groupByProps } from '../../../utils'

const { blue } = require('../../../style/variable')

export default {
  name: 'HistoryChangeLine',
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
            name: '变更数',
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
    ...mapState(['changeData'])
  },
  watch: {
    changeData (value) {
      const data = deepClone(value)

      data.sort((prev, next) => {
        if (prev.year === next.year) {
          return prev.month - next.month
        }

        return prev.year - next.year
      })

      for (let item of data) {
        item.date = `${item.year}年${item.month}月`
      }

      const zipData = groupByProps(data, 'date')

      const dates = Object.keys(zipData)

      const axisData = []
      const seriesData = []

      for (let i = 0, len = dates.length; i < len; i++) {
        const date = dates[i]

        axisData.push(date)
        seriesData.push(zipData[date].length)
      }

      this.options.xAxis.data = axisData
      this.options.series[0].data = seriesData
    }
  }
}
</script>
