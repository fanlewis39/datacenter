import ECharts from 'vue-echarts'

import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/scatter'

import walden from './theme/walden'

ECharts.registerTheme('walden', walden)

export default ECharts
