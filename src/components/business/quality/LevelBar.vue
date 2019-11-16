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
  name: 'LevelBar',
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
    ...mapGetters(['problemLevel'])
  },
  watch: {
    problemLevel (value) {
      const level = ['一级', '二级', '三级', '四级']
      const axisData = []
      const doneData = []
      const undoneData = []

      for (let key in value) {
        doneData.push(value[key].done)
        undoneData.push(value[key].undone)
        axisData.push(level[key - 1])
      }

      this.options.xAxis[0].data = axisData
      this.options.series[0].data = doneData
      this.options.series[1].data = undoneData
    }
  }
}
</script>
