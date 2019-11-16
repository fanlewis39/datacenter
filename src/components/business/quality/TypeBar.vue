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
        legend: {
          data: ['未完成', '已完成'],
          right: '5%'
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
            name: '未完成',
            type: 'bar',
            stack: '总量',
            barWidth: '60%',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: []
          },
          {
            name: '已完成',
            type: 'bar',
            stack: '总量',
            barWidth: '60%',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: []
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['problemType'])
  },
  watch: {
    problemType (value) {
      const doneData = []
      const undoneData = []
      const axisData = []

      for (let key in value) {
        axisData.push(key)
        doneData.push(value[key].done)
        undoneData.push(value[key].undone)
      }

      this.options.xAxis[0].data = axisData
      this.options.series[0].data = doneData
      this.options.series[1].data = undoneData
    }
  }
}
</script>
