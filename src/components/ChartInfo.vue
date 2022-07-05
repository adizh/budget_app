


<template>
  <div>
    <div class="monthChart">
      <p class="each_month" @click="isMonthSelected = !isMonthSelected">
        {{ !IS_MONTH_CHOOSEN ? EACH_MONTH_CHART : $t("selMonthChart") }}
      </p>
      <div :class="isMonthSelected ? 'all_info_chart' : ''">
        <div
          v-show="isMonthSelected"
          v-for="option in $t('monthChartsOption')"
          :key="option.name"
        >
          <p @click="selectChartMonth(option)" class="month_chart_">
            {{ option.name }}
          </p>
        </div>
      </div>
    </div>
    <line-chart
      v-show="
        EACH_MONTH_CHART !== 'Month chart' && JSON.stringify(EACH_MONTH_DATA).length > 2
      "
      :data="EACH_MONTH_DATA"
    ></line-chart>

    <div
      class="no_purchase"
      v-show="
        JSON.stringify(EACH_MONTH_DATA).length <= 2 &&
        EACH_MONTH_CHART !== 'Month chart'
      "
    >
      {{ $t("Nopurhases") }}
    </div>
  </div>
</template>
<script>

import {mapGetters,mapActions} from 'vuex'
export default {
  name: "ChartInfo",

  methods: {
    ...mapActions(['SELECT_CHART_MONTH']),
    selectChartMonth(option) {
      this.SELECT_CHART_MONTH(option)
      this.isMonthSelected = false;
    },
  },
  data() {
    return {
      isMonthSelected: false,
    };
  },
  computed: {
    ...mapGetters(['IS_MONTH_CHOOSEN','EACH_MONTH_CHART','EACH_MONTH_DATA']),
   
  },

};
</script>

<style scoped>
.each_month {
  background: cornflowerblue;
  padding: 5px;
  width: 14%;
  margin: 17px auto;
  text-align: center;
  color: white;
  border-radius: 9px;
}
.month_chart_:hover {
  cursor: pointer;
  opacity: 0.8;
}

.each_month:hover {
  opacity: 0.8;
  cursor: pointer;
}
.all_info_chart {
  margin: 10px auto;
  max-height: 111px;
  display: flex;
  background: cornflowerblue;
  border-radius: 20px;
  padding: 9px;
  color: white;
  flex-direction: column;
  flex-wrap: wrap;
  gap: -4px;
  align-items: center;
  width: 56%;
}
.no_purchase {
  text-align: center;
  font-weight: 300;
}
@media (min-width: 250px) and (max-width: 450px) {
  .each_month {
    text-align: center;
    width: 45%;
  }
  .all_info_chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 88%;
    max-height: 212px;
  }
}
</style>