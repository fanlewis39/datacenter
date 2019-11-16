<template>
  <div id="progressData">
    <Row :style="{ height: `calc(${firstRowPercent}% - 30px)` }">
      <QuarterCol>
        <DataCard>
          <p slot="title">
            总体进度
          </p>
          <Circle dashboard :percent="36">
            <span style="font-size:24px; user-select: none">36%</span>
          </Circle>
        </DataCard>
      </QuarterCol>
      <QuarterCol>
        <DataCard>
          <p slot="title">
            本月完成
          </p>
          <Numeral :count="23"></Numeral>
        </DataCard>
      </QuarterCol>
      <QuarterCol>
        <DataCard>
          <p slot="title">
            累计完成
          </p>
          <Numeral :count="176"></Numeral>
        </DataCard>
      </QuarterCol>
      <QuarterCol>
        <DataCard>
          <p slot="title">
            未完成
          </p>
          <Numeral :count="273"></Numeral>
        </DataCard>
      </QuarterCol>
    </Row>
    <Row :style="{ height: `${secondRowPercent}%` }">
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
          <PartsProgressBar></PartsProgressBar>
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
          <PartsProgressPie></PartsProgressPie>
        </DataCard>
      </i-col>
    </Row>
    <Row :style="{ height: `${thirdRowPercent}%` }">
      <i-col :span="24">
        <DataCard>
          <p slot="title">
            历史进度
          </p>
          <HistoryProgressLine></HistoryProgressLine>
        </DataCard>
      </i-col>
    </Row>
  </div>
</template>

<script>
import DataCard from '../components/business/DataCard'
import Numeral from '../components/business/Numeral'
import QuarterCol from '../components/business/QuarterCol'
import PartsProgressBar from '../components/business/progress/PartsProgressBar'
import PartsProgressPie from '../components/business/progress/PartsProgressPie'
import HistoryProgressLine from '../components/business/progress/HistoryProgressLine'

export default {
  name: 'ProgressData',
  components: {
    DataCard,
    Numeral,
    QuarterCol,
    PartsProgressBar,
    PartsProgressPie,
    HistoryProgressLine
  },
  props: {},
  data () {
    return {
      firstRowPercent: 26,
      secondRowPercent: 37,
      thirdRowPercent: 37
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
#progressData {
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
