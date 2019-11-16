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
  name: 'TypePie',
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
            name: '设备类型',
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
    ...mapGetters(['equipmentType'])
  },
  watch: {
    equipmentType (value) {
      const data = []

      for (let key in value) {
        data.push({
          value: value[key],
          name: key
        })
      }

      this.options.series[0].data = data
    }
  }
}
</script>
