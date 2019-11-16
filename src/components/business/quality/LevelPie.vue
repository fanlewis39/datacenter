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
  name: 'LevelPie',
  data () {
    return {
      options: {
        tooltip: {
          trigger: 'item',
          formatter (params) {
            const { marker, seriesName, percent, name, value } = params
            return `${seriesName}<br>${marker} ${name}: ${value} (${percent}%)`
          }
        },
        series: [
          {
            name: '问题级别',
            type: 'pie',
            clickable: false,
            center: ['50%', '50%'],
            radius: ['50%', '65%'],
            avoidLabelOverlap: false,
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
      const levelData = ['一级', '二级', '三级', '四级']
      const data = []

      for (let key in value) {
        // console.log(key)
        data.push({
          value: value[key].done + value[key].undone,
          name: levelData[key - 1]
        })
      }

      this.options.series[0].data = data
    }
  }
}
</script>
