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
  name: 'ChangeSourcePie',
  data () {
    return {
      options: {
        tooltip: {
          formatter (params) {
            const { marker, seriesName, percent, name, value } = params

            return `${seriesName}<br>${marker} ${name}: ${value} (${percent}%)`
          }
        },
        series: [
          {
            name: '变更数',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: [],
            avoidLabelOverlap: false,
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['sourceChangeData'])
  },
  watch: {
    sourceChangeData (value) {
      const keys = Object.keys(value)
      const data = []

      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i]

        data.push({
          name: key,
          value: value[key].length
        })
      }

      this.options.series[0].data = data
    }
  }
}
</script>
