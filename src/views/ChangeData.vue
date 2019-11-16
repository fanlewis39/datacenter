<template>
  <div id="changeData">
    <Row :style="{ height: `calc(${firstRowPercent}% - 30px)` }">
      <QuarterCol>
        <DataCard>
          <p slot="title">
            本月变更
          </p>
          <Numeral unit="次" :count="2"></Numeral>
        </DataCard>
      </QuarterCol>
      <QuarterCol>
        <DataCard>
          <p slot="title">
            累计变更
          </p>
          <Numeral unit="次" :count="15"></Numeral>
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
            历史变更
          </p>
          <HistoryChangeLine></HistoryChangeLine>
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
            变更类型
          </p>
          <ChangeValueBar></ChangeValueBar>
          <ChangeValuePie></ChangeValuePie>
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
            变更来源
          </p>
          <ChangeSourceBar></ChangeSourceBar>
          <ChangeSourcePie></ChangeSourcePie>
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
            分段进度
          </p>
          <PartChangeBar></PartChangeBar>
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
          <PartChangePie></PartChangePie>
        </DataCard>
      </i-col>
    </Row>
  </div>
</template>

<script>
import DataCard from '../components/business/DataCard'
import Numeral from '../components/business/Numeral'
import QuarterCol from '../components/business/QuarterCol'
import HistoryChangeLine from '../components/business/change/HistoryChangeLine'
import ChangeValueBar from '../components/business/change/ChangeValueBar'
import ChangeValuePie from '../components/business/change/ChangeValuePie'
import ChangeSourceBar from '../components/business/change/ChangeSourceBar'
import ChangeSourcePie from '../components/business/change/ChangeSourcePie'
import PartChangeBar from '../components/business/change/PartChangeBar'
import PartChangePie from '../components/business/change/PartChangePie'

import { mapActions } from 'vuex'
import { QUERY_CHANGE_DATA } from '../store/types'

export default {
  name: 'ChangeData',
  components: {
    DataCard,
    Numeral,
    QuarterCol,
    HistoryChangeLine,
    ChangeValueBar,
    ChangeValuePie,
    ChangeSourceBar,
    ChangeSourcePie,
    PartChangeBar,
    PartChangePie
  },
  props: {},
  data () {
    return {
      firstRowPercent: 30,
      secondRowPercent: 35,
      thirdRowPercent: 35
    }
  },
  computed: {},
  created () {
    this.queryChangeData()
  },
  methods: {
    ...mapActions({
      queryChangeData: QUERY_CHANGE_DATA
    })
  }
}
</script>

<style lang="scss">
#changeData {
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
