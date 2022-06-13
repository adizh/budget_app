<template>
  <section>
    <CalendarRange
      :selectedMonth="selectedMonth"
      :isDateSelected="isDateSelected"
      @selectMonth="selectMonth"
      @clearDate="clearDate"
    />
    <BudgetInfo
      :isPlanChanged="isPlanChanged"
      :total_budget_value="total_budget_value"
      :total_budget="total_budget"
      :isTotalVisible="isTotalVisible"
      :isPercentVisible="isPercentVisible"
      :rest_budget="rest_budget"
      :perDayMed="perDayMed"
      :percent="percent"
      :totalBudgetData="totalBudgetData"
      @totalBudget="totalBudget"
      @changePerDayMed="changePerDayMed"
    />
    <MainChart :purchases="purchases" :languages="languages" />

    <ChartInfo
      @selectNameChart="selectNameChart"
      :eachMonthChart="eachMonthChart"
      :monthChartsOption="$t('monthChartsOption')"
      :isChartVisible="isChartVisible"
      :isMonthVisible="isMonthVisible"
      :purchases="purchases"
    />
    <form v-if="formMode" @submit.prevent="addTodo" class="main_form">
      <label for="name"
        >{{ $t("Name") }}
        <input
          required
          id="name"
          class="form-control inputs"
          type="text"
          v-model="input"
          ref="editPurchaseName"
        />
      </label>
      <p
        class="alert alert-danger err alerts_dan"
        role="alert"
        v-if="isNameSmall"
      >
        {{ $t("NameProblem") }}
      </p>
      <label for="price" name="price"
        >{{ $t("Price") }}
        <input
          required
          id="price"
          class="form-control inputs"
          type="number"
          v-model="numberInput"
        />
      </label>
      <p
        class="alert alert-danger err alerts_dan"
        role="alert"
        v-if="isPriceNegative"
      >
        {{ $t("PriceProblem") }}
      </p>
      <label for="date">
        {{ $t("Time") }}
        <input
          required
          class="form-control inputs"
          v-model="dateNow"
          type="date"
          name="date"
          id="date"
        />
      </label>

      <div class="typesArea">
        <button
          @click="areTypesVisible = !areTypesVisible"
          class="btn btn-info selBtn"
          type="button"
        >
          {{ isTypeSel ? $t("typeSelect") : selected_type }}
        </button>
        <div class="types">
          <ul
            v-show="areTypesVisible"
            v-for="types in $t('purchaseType2')"
            :key="types.name"
            @click="selectTypeOfPurchase(types)"
          >
            <li>{{ types.name }}</li>
          </ul>
        </div>
      </div>
      <button
        v-if="!editName"
        :disabled="input.length && numberInput.length ? false : true"
        class="btn btn-primary addBtn"
        type="submit"
      >
        {{ $t("default") }}
      </button>
      <button
        @click="updateValue"
        class="btn btn-primary addBtn"
        type="submit"
        v-else
      >
        {{ $t("updatedVersion") }}
      </button>
    </form>

    <div
      v-if="medPriceAcc"
      class="alert alert-danger d-flex align-items-center alert_med_price"
      role="alert"
    >
      <svg
        class="bi flex-shrink-0 me-2"
        width="24"
        height="24"
        role="img"
        aria-label="Danger:"
      >
        <use xlink:href="#exclamation-triangle-fill" />
      </svg>
      <div>{{ $t("accText") }}</div>
      <a class="btn btn-danger" href="#budgetInfo" @click="changePerDayMed">
        {{ $t("Changetheplan") }}
      </a>
    </div>
    <CategoryChart
      :purchases="purchases"
      :typeSelected="typeSelected"
      :isCatVisible="isCatVisible"
      :purchaseType2="$t('purchaseType2')"
      @filterType="filterType"
      :isDefault="isDefault"
      :sortedPro="sortedPro"
    />

    <Favourites :purchases="purchases" />
    <Purchases
      :editName="editName"
      @editTodo="editTodo"
      :sortedPro="sortedPro"
      :filteredPro="filteredPro"
      :arePurchasesVisible="arePurchasesVisible"
      @addToFav="addToFav"
    />
    <PriceFilter
      :isPriceChooses="isPriceChooses"
      :sortedPro="sortedPro"
      @selectPrice="selectPrice"
    />
    <div class="total">
      {{ $t("Totalsum") }} : {{ totalSum }} {{ $t("som") }}
    </div>
  </section>
</template>

<script>
import Purchases from "./Purchases.vue";
import PriceFilter from "./PriceFilter.vue";
import CalendarRange from "./CalendarRange.vue";
import MainChart from "./MainChart.vue";
import Favourites from "./Favourites.vue";
import BudgetInfo from "./BudgetInfo.vue";
import ChartInfo from "./ChartInfo.vue";
import CategoryChart from "./CategoryChart.vue";
import i18n from "../plugins/i18n.js";
export default {
  name: "FormMode",
  data() {
    return {
      input: "",
      isDateSelected: false,
      isPlanChanged: false,
      purchases: [],
      numberInput: "",
      selected_type: "select a type",
      dateNow: "",
      editName: false,
      lan: "",
      isTypeSel: true,
      editing: null,
      priceEditing: null,
      dateEditing: null,
      typeEditing: null,
      updatedName: "",
      areTypesVisible: false,
      isNameSmall: false,
      isPriceNegative: false,
      day: "",
      month: "",
      sortedPro: [],

      selectedMonth: "Select a day",
      startDay: "",
      endDay: "",
      startMonth: "",
      eachMonthChart: "Month chart",
      endMonth: "",
      arePurchasesVisible: false,
      isMonthChoosen: false,
      isTypeSelected: false,
      isMonthVisible: true,
      percent: 0,
      isChartVisible: false,
      total_budget_value: "",
      total_budget: "",
      isTotalVisible: false,
      medPriceAcc: false,
      isPercentVisible: false,
      rest_budget: 0,
      perDayMed: 0,
      totalBudgetData: new Date(),
      isCatVisible: false,
      isPriceChooses: true,
      formMode: true,
      purchaseType: [
        { name: "Food" },
        { name: "Transport" },
        { name: "Medicine" },
        { name: "Internet" },
        { name: "Entertainment" },
      ],
      typeSelected: "Filter by type",
      isDefault: true,

      typeNameSelected: false,
    };
  },
  components: {
    Purchases,
    PriceFilter,
    CalendarRange,
    BudgetInfo,
    MainChart,
    ChartInfo,
    CategoryChart,
    Favourites,
  },
  props: {
    languages: {
      type: Array,
    },
    islocaleChanged: Boolean,
  },

  methods: {
    addToFav(todo) {
      this.purchases.map((e) => {
        if (e.id == todo.id) {
          e.isFavourite = !e.isFavourite;
        }
        this.savePurchase();
      });
    },
    selectNameChart(option) {
      this.eachMonthChart = option.name;
      this.isChartVisible = true;
      this.isMonthVisible = false;
    },
    selectTypeOfPurchase(type) {
      this.isTypeSelected = true;
      this.selected_type = type.name;
      this.areTypesVisible = false;
      this.isTypeSel = false;
    },
    updateValue() {
      if (this.editName && +this.percent < 100) {
        this.rest_budget = (+this.total_budget_value * +this.percent) / 100;
      }
    },

    addTodo() {
      if (
        this.editing !== null &&
        this.priceEditing !== null &&
        this.dateEditing !== null &&
        this.typeEditing !== null
      ) {
        this.purchases[this.editing].name = this.input;
        this.purchases[this.priceEditing].price = +this.numberInput;
        this.purchases[this.dateEditing].dateInput = this.dateNow;
        this.purchases[this.typeEditing].types = this.selected_type;
        console.log("this selected one", this.selected_type);
        console.log(
          "this selected one2",
          this.purchases[this.typeEditing].types
        );
        this.editing = null;
        this.priceEditing = null;
        this.dateEditing = null;
        this.typeEditing = null;
        this.editName = false;
        this.percent =
          parseInt(this.percent) -
          (this.totalSum * 100) / this.total_budget_value; /* +
          "%"; */
        this.rest_budget = +this.total_budget_value - this.totalSum;
        this.saveCounter();
        this.saveMainBudget();
        this.savePurchase();
      } else if (
        this.input.length >= 4 &&
        this.numberInput.length &&
        this.isTypeSelected
      ) {
        this.purchases.push({
          name: this.input,
          done: false,
          id: Math.random(),
          price: +this.numberInput,
          dateInput: this.dateNow,
          types: this.selected_type,
          isFavourite: false,
        });
        console.log("purchases", this.purchases);
        this.arePurchasesVisible = true;
        this.sortedPro = [...this.purchases];
        this.editName = false;
        this.isCatVisible = true;
      }
      let todays_date = new Date();
      let todays_day = todays_date.getDate();
      let todays_month = todays_date.getMonth() + 1;
      this.sortedPro.map((e) => {
        let itemDay = e.dateInput.split("-")[2];
        let itemsMonth = e.dateInput.split("-")[1];
        if (itemDay.startsWith("0")) {
          itemDay = itemDay.split("")[1];
        }
        if (itemsMonth.startsWith("0")) {
          itemsMonth = itemsMonth.split("")[1];
        }
        if (
          todays_day === +itemDay &&
          todays_month === +itemsMonth &&
          this.perDayMed &&
          this.totalSum > this.perDayMed
        ) {
          this.medPriceAcc = true;
          setTimeout(() => {
            this.medPriceAcc = false;
          }, 8000);
        } else {
          this.medPriceAcc = false;
        }
      });

      if (this.total_budget_value) {
        this.percent = 100 - (100 * this.totalSum) / this.total_budget_value;
        this.rest_budget =
          this.total_budget_value && +this.total_budget_value - this.totalSum;
      }

      if (this.numberInput < 1) {
        this.isPriceNegative = true;
        setTimeout(() => {
          this.isPriceNegative = false;
        }, 5000);
      }
      if (this.input.length < 4) {
        this.isNameSmall = true;
        setTimeout(() => {
          this.isNameSmall = false;
        }, 5000);
      }
      this.input = "";
      this.numberInput = "";
      this.dateNow = "";
      this.saveCounter();
      this.savePurchase();
      this.saveMainBudget();
    },

    editTodo(index) {
      this.$refs.editPurchaseName.focus();
      this.editName = true;
      this.input = this.purchases[index].name;
      this.numberInput = +this.purchases[index].price;
      this.dateNow = this.purchases[index].dateInput;
      this.selected_type = this.purchases[index].types;
      this.editing = index;
      this.priceEditing = index;
      this.dateEditing = index;
      this.typeEditing = index;
    },
    savePurchase() {
      localStorage.setItem("purchases", JSON.stringify(this.purchases));
    },

    clearDate() {
      this.selectedMonth = "Select a day";
      return (this.sortedPro = [...this.purchases]);
    },
    saveCounter() {
      localStorage.rest_budget = +this.rest_budget;
    },
    saveMainBudget() {
      localStorage.total_budget_value = +this.total_budget_value;
      localStorage.percent = this.percent;
      localStorage.perDayMed = this.perDayMed;
      localStorage.totalBudgetData = this.totalBudgetData;
    },

    filterType(type) {
      let month;
      let day;
      let optionDay;
      let optionMonth;
      let endDays;
      let endMonth;
      let typeObj;
      let enObj;
      this.typeSelected = type.name;
      this.typeNameSelected = true;
      this.isDefault = false;
      this.sortedPro = this.purchases.filter((e) => {
        if (type.name === "All" || type.name === "Все") {
          return this.purchases;
        }
        typeObj = {
          Еда: "Food",
          Транспорт: "Transport",
          Медицина: "Medicine",
          Связь: "Internet",
          Другое: "Entertainment",
        };

        const rusValues = Object.values(typeObj);
        const rusKeys = Object.keys(typeObj);
        enObj = Object.assign(
          ...rusValues.map((v, i) => ({ [v]: rusKeys[i] }))
        );
        return i18n.locale === "en"
          ? type.name === e.types || type.name === typeObj[e.types]
          : i18n.locale === "ru"
          ? type.name === e.types || type.name === enObj[e.types]
          : "";
      });
      if (this.isMonthChoosen && this.selectedMonth.length > 12) {
        this.sortedPro = this.purchases.filter((e) => {
          month = e.dateInput.split("-")[1];
          day = e.dateInput.split("-")[2];
          if (month.startsWith("0")) {
            month = month.split("")[1];
          }
          if (day.startsWith("0")) {
            day = day.split("")[1];
          }
          optionDay = this.selectedMonth.split(".")[0];
          if (optionDay.startsWith("0")) {
            optionDay = optionDay.split("")[1];
          }
          optionMonth = this.selectedMonth.split(".")[1];
          if (optionMonth.startsWith("0")) {
            optionMonth = optionMonth.split("")[1];
          }
          endDays = this.selectedMonth.split(" - ")[1].split(".")[0];
          if (/^0/g.test(endDays)) {
            endDays = endDays.split("")[1];
          }
          endMonth = this.selectedMonth.split("-")[1].split(".")[1];
          if (endMonth.startsWith("0")) {
            endMonth = endMonth.split("")[1];
          }
          if (
            Number(day) >= Number(optionDay) &&
            Number(day) <= Number(endDays) &&
            Number(month) >= Number(optionMonth) &&
            Number(month) <= Number(endMonth)
          ) {
            return i18n.locale === "en"
              ? type.name === e.types || type.name === typeObj[e.types]
              : i18n.locale === "ru"
              ? type.name === e.types || type.name === enObj[e.types]
              : "";
          }
        });
      }
    },

    selectPrice(price) {
      this.isPriceChooses = false;
      this.sortedPro = [...this.purchases];
      let month;
      let day;
      let optionDay;
      let optionMonth;
      let endDays;
      let endMonth;
      this.sortedPro = this.sortedPro.filter((e) => {
        return price.name === "High" || price.name === "Высокий"
          ? e.price > 100
          : price.name === "Moderate" || price.name === "Средний"
          ? e.price >= 50 && e.price < 100
          : price.name === "All" || price.name === "Все"
          ? this.purchases
          : e.price < 50;
      });

      if (this.isMonthChoosen && this.selectedMonth.length > 12) {
        this.sortedPro = this.purchases.filter((e) => {
          month = e.dateInput.split("-")[1];
          day = e.dateInput.split("-")[2];
          if (month.startsWith("0")) {
            month = month.split("")[1];
          }
          if (day.startsWith("0")) {
            day = day.split("")[1];
          }
          optionDay = this.selectedMonth.split(".")[0];
          if (optionDay.startsWith("0")) {
            optionDay = optionDay.split("")[1];
          }
          optionMonth = this.selectedMonth.split(".")[1];
          if (optionMonth.startsWith("0")) {
            optionMonth = optionMonth.split("")[1];
          }
          endDays = this.selectedMonth.split(" - ")[1].split(".")[0];
          if (/^0/g.test(endDays)) {
            endDays = endDays.split("")[1];
          }
          endMonth = this.selectedMonth.split("-")[1].split(".")[1];
          if (endMonth.startsWith("0")) {
            endMonth = endMonth.split("")[1];
          }
          if (
            Number(day) >= Number(optionDay) &&
            Number(day) <= Number(endDays) &&
            Number(month) >= Number(optionMonth) &&
            Number(month) <= Number(endMonth)
          ) {
            return price.name === "High" || price.name === "Высокий"
              ? e.price > 100
              : price.name === "Moderate" || price.name === "Средний"
              ? e.price >= 50 && e.price < 100
              : price.name === "All" || price.name === "Все"
              ? this.purchases
              : e.price < 50;
          }
        });
      }
    },
    selectMonth(option) {
      if (option) {
        this.startDay = option.start.getDate();
        this.endDay = option.end.getDate();
        this.startMonth = option.start.getMonth() + 1;
        this.endMonth = option.end.getMonth() + 1;
        this.selectedMonth = `${
          String(this.startDay).length === 2
            ? this.startDay
            : "0" + this.startDay
        }.${
          String(this.startMonth).length === 2
            ? this.startMonth
            : "0" + this.startMonth
        } - ${
          String(this.endDay).length === 2 ? this.endDay : "0" + this.endDay
        }.${
          String(this.endMonth).length === 2
            ? this.endMonth
            : "0" + this.endMonth
        }`;
        this.sortedPro = this.purchases.filter((item) => {
          this.day = item.dateInput.split("-")[2];
          this.month = item.dateInput.split("-")[1];
          if (this.day.startsWith("0")) {
            this.day = this.day.split("")[1];
          }
          if (this.month.startsWith("0")) {
            this.month = this.month.split("")[1];
          }
          this.isMonthChoosen = true;
          return (
            this.day >= this.startDay &&
            this.day <= this.endDay &&
            this.month >= this.startMonth &&
            this.month <= this.endMonth
          );
        });
      }
      this.isDateSelected = true;
    },
    totalBudget(prop_total_budget) {
      this.isTotalVisible = true;
      this.isPercentVisible = true;
      this.percent = 100;
      this.perDayMed = Math.floor(prop_total_budget / 30);
      if (this.filteredPro.length) {
        this.rest_budget = +prop_total_budget - this.totalSum;
        this.percent =
          parseInt(this.percent) -
          (this.totalSum * 100) / prop_total_budget; /*  +
          "%"; */

        if (this.totalSum > this.perDayMed) {
          this.medPriceAcc = true;
        }
      }
      this.total_budget = prop_total_budget;
      this.total_budget_value = prop_total_budget;
      if (prop_total_budget.length) {
        prop_total_budget = "";
      }
      this.saveMainBudget();
      this.saveCounter();
    },

    changePerDayMed() {
      this.perDayMed = Math.floor(this.rest_budget / 30);
      setTimeout(() => {
        this.medPriceAcc = false;
      }, 3000);
      this.saveMainBudget();
      this.isPlanChanged = true;
      let vm = this;
      setTimeout(() => {
        vm.isPlanChanged = false;
      }, 4000);

      /*    this.$refs.budgetInfo.focus() */
      console.log("refs", this.$refs.budgetInfo);
    },
  },
  created() {
    this.purchases = JSON.parse(localStorage.getItem("purchases") || []);
  },
  computed: {
    theme() {
      let theme = localStorage.getItem("theme");

      return theme;
    },
    filteredPro() {
      if (this.sortedPro.length) {
        return this.sortedPro;
      } else {
        return [];
      }
    },
    totalSum() {
      if (this.sortedPro.length) {
        let newArr = [];
        for (let item of this.sortedPro) {
          newArr.push(+item.price);
        }
        newArr = newArr.reduce((acc, rec) => {
          return acc + rec;
        });
        return newArr;
      } else {
        return 0;
      }
    },
  },

  mounted() {
    console.log("it med", this.medPriceAcc);

    this.lan = i18n.locale;
    console.log(this.lan);

    if (this.purchases.length) {
      this.sortedPro = [...this.purchases];
      this.isCatVisible = true;
    }
    if (localStorage.total_budget_value) {
      this.total_budget_value = +localStorage.total_budget_value;

      this.isTotalVisible = true;
      this.isPercentVisible = true;
    }
    if (localStorage.rest_budget) {
      this.rest_budget = +localStorage.rest_budget;
    }
    if (localStorage.rest_budget) {
      this.rest_budget = localStorage.rest_budget;
    }
    if (localStorage.names) {
      this.purchases[this.editing].name = localStorage.names;
    }
    if (localStorage.perDayMed) {
      this.perDayMed = localStorage.perDayMed;
    }
    if (localStorage.percent) {
      this.percent = localStorage.percent;
    }
    if (localStorage.totalBudgetData) {
      this.totalBudgetData = localStorage.totalBudgetData;
    }
  },

  watch: {
    purchasesyu: {
      handler: function (updatedList) {
        localStorage.setItem("purchases", JSON.stringify(updatedList));
      },
      deep: true,
    },
  },
};
</script>

<style  scoped>
.main_form {
  margin: 20px auto;
  display: flex;
  flex-direction: column;
}

.dark_theme {
  color: white;
}
.light_theme {
  color: #000000;
}
.typesArea {
  margin: 10px auto;
}
.alerts_dan {
  width: 70%;
  margin: 0 auto;
}
.types {
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 11px auto;
  color: #000;
  background: #25cff2;
  border-radius: 4px;
}
.selBtn {
  width: 100%;
  display: block;
}
ul {
  margin: 2px 8px;
}
.inputs {
  margin: 5px auto;
  display: block;
  width: 25%;
}
label {
  text-align: center;
}
ul {
  display: flex;
}
li {
  list-style: none;
  display: block;
}
.addBtn {
  min-width: 10%;
  margin: 10px auto;
}
@media (min-width: 250px) and (max-width: 450px) {
  .alert_med_price {
    padding-bottom: 21px;

    flex-direction: column;
    gap: 2px;
  }
  .alert_med_price div {
    margin-top: -15px;
    padding-bottom: 10px;
  }
  .inputs {
    width: 80%;
  }
}
</style>