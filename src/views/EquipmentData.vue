<template>
  <div id="equipmentData">
    <Row :style="{ height: `calc(${firstRowPercent}% - 30px)` }">
      <QuarterCol>
        <DataCard>
          <p slot="title">
            本月进场
          </p>
          <Numeral :count="3"></Numeral>
        </DataCard>
      </QuarterCol>
      <QuarterCol>
        <DataCard>
          <p slot="title">
            本月退场
          </p>
          <Numeral :count="1"></Numeral>
        </DataCard>
      </QuarterCol>
      <QuarterCol>
        <DataCard>
          <p slot="title">
            大型设备
          </p>
          <Numeral :count="4"></Numeral>
        </DataCard>
      </QuarterCol>
      <QuarterCol>
        <DataCard>
          <p slot="title">
            设备合计
          </p>
          <Numeral :count="21"></Numeral>
        </DataCard>
      </QuarterCol>
    </Row>
    <Row :style="{ height: `${100 - firstRowPercent}%` }">
      <HalfCol>
        <Row :style="{ height: `calc(${firstInsideRowPercent}% - 15px)` }">
          <DataCard>
            <p slot="title">
              设备类型
            </p>
            <TypeBar></TypeBar>
            <TypePie></TypePie>
          </DataCard>
        </Row>
        <Row :style="{ height: `${100 - firstInsideRowPercent}%` }">
          <DataCard>
            <p slot="title">
              历史情况
            </p>
            <HistoryLine></HistoryLine>
          </DataCard>
        </Row>
      </HalfCol>
      <HalfCol>
        <DataCard>
          <p slot="title">
            设备分布
          </p>
          <DistributionScatter></DistributionScatter>
        </DataCard>
      </HalfCol>
    </Row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { QUERY_EQUIPMENT_DATA } from '../store/types'

import DataCard from '../components/business/DataCard'
import Numeral from '../components/business/Numeral'
import QuarterCol from '../components/business/QuarterCol'
import HalfCol from '../components/business/HalfCol'

import TypeBar from '../components/business/equipment/TypeBar'
import TypePie from '../components/business/equipment/TypePie'
import HistoryLine from '../components/business/equipment/HistoryLine'
import DistributionScatter from '../components/business/equipment/DistributionScatter'

export default {
  name: 'EquipmentData',
  components: {
    DataCard,
    Numeral,
    QuarterCol,
    HalfCol,
    TypeBar,
    TypePie,
    HistoryLine,
    DistributionScatter
  },
  props: {},
  data () {
    return {
      firstRowPercent: 26,
      firstInsideRowPercent: 50
    }
  },
  created () {
    this.queryEquipmentData()
  },
  methods: {
    ...mapActions({
      queryEquipmentData: QUERY_EQUIPMENT_DATA
    })
  }
}
</script>

<style lang="scss">
#equipmentData {
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
