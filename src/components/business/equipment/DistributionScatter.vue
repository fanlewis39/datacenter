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

export default {
  name: 'DistributionScatter',

  props: {},
  data () {
    return {
      options: {
        tooltip: {
          formatter: function (params) {
            const { name, marker } = params
            const value = params.value[2]
            const eqName = params.value[1]
            return `${name} ${eqName}<br>${marker}数量: ${value}`
          }
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [
          {
            type: 'scatter',
            data: [],
            symbolSize: function (val) {
              return val[2] * 10
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['equipmentData'])
  },
  watch: {
    equipmentData (data) {
      const map = {}
      const equipmentMap = {}
      const datas = []

      for (let item of data) {
        const { part, name } = item

        if (!map[part]) map[part] = []

        if (!map[part][item.name]) {
          map[part][item.name] = 0
        }
        map[part][item.name]++

        if (!equipmentMap[name]) equipmentMap[name] = []
        equipmentMap[name].push(item)
      }

      const partKeys = Object.keys(map).sort()

      const equipmentKeys = Object.keys(equipmentMap)

      for (let i in partKeys) {
        const part = partKeys[i]
        for (let j in equipmentKeys) {
          const name = equipmentKeys[j]
          datas.push([+i, equipmentKeys[j], map[part][name] || 0])
        }
      }

      this.options.xAxis.data = partKeys
      this.options.yAxis.data = equipmentKeys
      this.options.series[0].data = datas
    }
  }
}
</script>
