<template>
  <div id="main_chart">
    <button
      class="btn btn-primary info_btn"
      @click="isMainChartVisible = !isMainChartVisible"
    >
      {{ !isMainChartVisible ? $t("Showchart") : $t("Hidechart") }}
    </button>
    <div v-show="isMainChartVisible">
      <div class="min_max_iden">
        {{ $t("Maxmonth") }}: {{ showMax }} {{ $t("som") }}
        {{ $t("Minmonth") }}: {{ showMin }} {{ $t("som") }}
      </div>
      <column-chart :min="0" :data="columnData"></column-chart>
    </div>
  </div>
</template>

<script>
import i18n from "../plugins/i18n.js";
export default {
  name: "MainChart",
  data() {
    return {
      isMainChartVisible: false,
    };
  },
  props: {
    purchases: Array,
    languages: Array,
  },
  
  computed: {
    janTotalSum() {
      let count = [];
      let month;
      this.purchases.map((e) => {
        month = e.dateInput.split("-")[1];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (month == 1) {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => {
        return acc + rec;
      }, 0);
      return count;
    },

    febTotalSum() {
      let count = [];
      let month;
      this.purchases.map((e) => {
        month = e.dateInput.split("-")[1];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (month == 2) {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => {
        return acc + rec;
      }, 0);
      return count;
    },
    marchTotalSum() {
      let count = [];
      let month;
      this.purchases.map((e) => {
        month = e.dateInput.split("-")[1];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (month == 3) {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => {
        return acc + rec;
      }, 0);
      return count;
    },
    apTotalSum() {
      let count = [];
      let month;
      this.purchases.map((e) => {
        month = e.dateInput.split("-")[1];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (month == 4) {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => {
        return acc + rec;
      }, 0);
      return count;
    },

    mayTotalSum() {
      let count = [];
      let month;
      this.purchases.map((e) => {
        month = e.dateInput.split("-")[1];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (month == 5) {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => {
        return acc + rec;
      }, 0);
      return count;
    },
    junTotalSum() {
      let count = [];
      let month;
      this.purchases.map((e) => {
        month = e.dateInput.split("-")[1];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (month == 6) {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => {
        return acc + rec;
      }, 0);
      return count;
    },
    julTotalSum() {
      let count = [];
      let month;
      this.purchases.map((e) => {
        month = e.dateInput.split("-")[1];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (month == 7) {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => {
        return acc + rec;
      }, 0);
      return count;
    },
    augTotalSum() {
      let count = [];
      let month;
      this.purchases.map((e) => {
        month = e.dateInput.split("-")[1];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (month == 8) {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => {
        return acc + rec;
      }, 0);
      return count;
    },
    sepTotalSum() {
      let count = [];
      let month;
      this.purchases.map((e) => {
        month = e.dateInput.split("-")[1];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (month == 9) {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => {
        return acc + rec;
      }, 0);
      return count;
    },
    octTotalSum() {
      let count = [];
      let month;
      this.purchases.map((e) => {
        month = e.dateInput.split("-")[1];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (month == 10) {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => {
        return acc + rec;
      }, 0);
      return count;
    },
    novTotalSum() {
      let count = [];
      let month;
      this.purchases.map((e) => {
        month = e.dateInput.split("-")[1];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (month == 11) {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => {
        return acc + rec;
      }, 0);
      return count;
    },
    decTotalSum() {
      let count = [];
      let month;
      this.purchases.map((e) => {
        month = e.dateInput.split("-")[1];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (month == 12) {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => {
        return acc + rec;
      }, 0);
      return count;
    },
    columnData() {
      return i18n.locale === "en"
        ? [
            ["Jan", this.janTotalSum],
            ["Feb", this.febTotalSum],
            ["Mar", this.marchTotalSum],
            ["Apr", this.apTotalSum],
            ["May", this.mayTotalSum],
            ["Jun", this.junTotalSum],
            ["Jul", this.julTotalSum],
            ["Aug", this.augTotalSum],
            ["Sep", this.sepTotalSum],
            ["Oct", this.octTotalSum],
            ["Nov", this.novTotalSum],
            ["Dec", this.decTotalSum],
          ]
        : [
            ["Янв", this.janTotalSum],
            ["Фев", this.febTotalSum],
            ["Март", this.marchTotalSum],
            ["Апр", this.apTotalSum],
            ["Май", this.mayTotalSum],
            ["Июнь", this.junTotalSum],
            ["Июль", this.julTotalSum],
            ["Авг", this.augTotalSum],
            ["Сен", this.sepTotalSum],
            ["Окт", this.octTotalSum],
            ["Нояб", this.novTotalSum],
            ["Дек", this.decTotalSum],
          ];
    },
    showMax() {
      let arr = [
        this.janTotalSum,
        this.febTotalSum,
        this.marchTotalSum,
        this.apTotalSum,
        this.mayTotalSum,
        this.junTotalSum,
        this.julTotalSum,
        this.augTotalSum,
        this.sepTotalSum,
        this.octTotalSum,
        this.novTotalSum,
        this.decTotalSum,
      ];
      return arr.length ? Math.max(...arr) : 0;
    },
    showMin() {
      let arr = [
        this.janTotalSum,
        this.febTotalSum,
        this.marchTotalSum,
        this.apTotalSum,
        this.mayTotalSum,
        this.junTotalSum,
        this.julTotalSum,
        this.augTotalSum,
        this.sepTotalSum,
        this.octTotalSum,
        this.novTotalSum,
        this.decTotalSum,
      ];
      let res = arr.filter((e) => e > 0);
      return res.length > 1 ? Math.min(...res) : 0;
    },
  },
};
</script>

<style  scoped>
#main_chart {
  text-align: center;
}

@media (min-width: 250px) and (max-width: 450px) {
  .info_btn {
    text-align: center;
    display: block;
    margin: 10px auto;
  }
}
</style>