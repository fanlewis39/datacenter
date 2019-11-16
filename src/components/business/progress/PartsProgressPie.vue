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
  name: 'PartsProgressPie',
  data () {
    return {
      options: {
        tooltip: {},
        series: [
          {
            name: '任务数',
            type: 'pie',
            radius: ['55%', '68%'],
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
    ...mapGetters(['partsProgress'])
  },
  watch: {
    partsProgress (value) {
      const keys = Object.keys(value)
      const data = []

      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i]

        data.push({
          name: key,
          value: value[key]
        })
      }

      this.options.series[0].data = data
    }
  }
}
</script>
