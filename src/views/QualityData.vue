<template>
  <div id="qualityData">
    <Row :style="{ height: `calc(${firstRowPercent}% - 30px)` }">
      <QuarterCol>
        <DataCard>
          <p slot="title">
            本月巡检
          </p>
          <Numeral unit="次" :count="14"></Numeral>
        </DataCard>
      </QuarterCol>
      <QuarterCol>
        <DataCard>
          <p slot="title">
            累计巡检
          </p>
          <Numeral unit="次" :count="23"></Numeral>
        </DataCard>
      </QuarterCol>
      <i-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      >
        <DataCard>
          <p slot="title">
            历史巡检
          </p>
          <HistoryLine></HistoryLine>
        </DataCard>
      </i-col>
    </Row>
    <Row :style="{ height: `${secondRowPercent}%` }">
      <i-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      >
        <DataCard>
          <p slot="title">
            问题类型
          </p>
          <TypeBar></TypeBar>
          <TypePie></TypePie>
        </DataCard>
      </i-col>
      <i-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="12"
      >
        <DataCard>
          <p slot="title">
            问题级别
          </p>
          <LevelBar></LevelBar>
          <LevelPie></LevelPie>
        </DataCard>
      </i-col>
    </Row>
    <Row :style="{ height: `${thirdRowPercent}%` }">
      <i-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="18"
      >
        <DataCard>
          <p slot="title">
            各段问题
          </p>
          <Problem></Problem>
        </DataCard>
      </i-col>
      <i-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="6"
      >
        <DataCard>
          <p slot="title">
            各段占比
          </p>
          <Percent></Percent>
        </DataCard>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { QUERY_INSPECTION_DATA } from '../store/types'

import DataCard from '../components/business/DataCard'
import Numeral from '../components/business/Numeral'
import QuarterCol from '../components/business/QuarterCol'

import HistoryLine from '../components/business/quality/HistoryLine'
import TypeBar from '../components/business/quality/TypeBar'
import TypePie from '../components/business/quality/TypePie'
import LevelBar from '../components/business/quality/LevelBar'
import LevelPie from '../components/business/quality/LevelPie'
import Problem from '../components/business/quality/Problem'
import Percent from '../components/business/quality/Percent'

export default {
  name: 'QualityData',
  components: {
    DataCard,
    Numeral,
    QuarterCol,
    HistoryLine,
    TypeBar,
    TypePie,
    LevelBar,
    LevelPie,
    Problem,
    Percent
  },
  props: {},
  data () {
    return {
      firstRowPercent: 30,
      secondRowPercent: 35,
      thirdRowPercent: 35
    }
  },
  created () {
    this.queryInspectionData()
  },
  methods: {
    ...mapActions({
      queryInspectionData: QUERY_INSPECTION_DATA
    })
  }
}
</script>

<style lang="scss">
#qualityData {
  height: 100%;

  .ivu-row:not(:first-child) {
    margin-top: 15px;
  }

  .ivu-col,
  .ivu-card,
  .ivu-card-body,
  .data-card {
    height: 100%;
  }

  .data-card {
    align-items: center;
  }

  .data-card__content {
    width: 100%;
    height: 100%;
  }
}
</style>
