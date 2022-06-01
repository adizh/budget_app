<template>
  <section>
    <CalendarRange
      :selectedMonth="selectedMonth"
      @selectMonth="selectMonth"
      @clearDate="clearDate"
    />
    <BudgetInfo
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
      :medPriceAcc="medPriceAcc"
    />
    <MainChart :purchases='purchases' />

    <ChartInfo
      @selectNameChart="selectNameChart"
      :eachMonthChart="eachMonthChart"
      :monthChartsOption="monthChartsOption"
      :isChartVisible="isChartVisible"
      :purchases="purchases"
    />
    <form v-if="formMode" @submit.prevent="addTodo" class="main_form">
      <label for="name"
        >Name
        <input
          required
          id="name"
          class="form-control inputs"
          type="text"
          v-model="input"
          ref='editPurchaseName'
        />
      </label>
      <p
        class="alert alert-danger err alerts_dan"
        role="alert"
        v-if="isNameSmall"
      >
        Name must be bigger 3 letters!
      </p>
      <label for="price" name="price"
        >Price
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
        Price must be positive only!
      </p>
      <label for="date"
        >Date
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
          {{ selected_type }}
        </button>
        <div class="types">
          <ul
            v-show="areTypesVisible"
            v-for="types in purchaseType"
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
        {{ def }}
      </button>
      <button @click='updateValue' class="btn btn-primary addBtn" type="submit" v-else>
        {{ updatedVersion }}
      </button>
    </form>

    <CategoryChart 
    :purchases='purchases'
    :typeSelected='typeSelected' :isCatVisible="isCatVisible" 
    :purchaseType="purchaseType" @filterType='filterType'
    :sortedPro='sortedPro'
    />

<Favourites 
  
   :purchases='purchases'
   />
    <Purchases
      :editName="editName"
      @editTodo="editTodo"
      :sortedPro="sortedPro"
      :filteredPro="filteredPro"
      :arePurchasesVisible="arePurchasesVisible"
      
      @addToFav='addToFav'
   
    />

    <PriceFilter :sortedPro="sortedPro" @selectPrice="selectPrice" />
    


    <div class="total">Total sum: {{ totalSum }}</div>
  </section>
</template>

<script>

import Purchases from "./Purchases.vue";
import PriceFilter from "./PriceFilter.vue";
import CalendarRange from "./CalendarRange.vue";
import MainChart from "./MainChart.vue";
import Favourites from './Favourites.vue'
import BudgetInfo from "./BudgetInfo.vue";
import ChartInfo from "./ChartInfo.vue";
import CategoryChart from "./CategoryChart.vue";
export default {
  name: "FormMode",
  data() {
    return {
      input: "",
      purchases:[],
      numberInput: "",
      selected_type: "select a type",
      dateNow: "",
      editName: false,
      editing: null,
      priceEditing: null,
      dateEditing: null,
      typeEditing:null,
      updatedName: "",
      areTypesVisible: false,
      isNameSmall: false,
      isPriceNegative: false,
      day: "",
      month: "",
      sortedPro: [],
      def: "Add",
      updatedVersion: "update",
      selectedMonth: "Select a day",

      startDay: "",
      endDay: "",
      startMonth: "",
      eachMonthChart: "Month chart",
      endMonth: "",
      arePurchasesVisible: false,
      isMonthChoosen: false,
      isTypeSelected: false,
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
      formMode: true,
      purchaseType: [
        { name: "Food" },
        { name: "Transport" },
        { name: "Medicine" },
        { name: "Internet" },
        { name: "Entertainment" },
      ],
   typeSelected:'Filter by type',
      monthChartsOption: [
        { name: "January" },
        { name: "February" },
        { name: "March", option: "3" },
        { name: "April" },
        { name: "May" },
        { name: "June" },
        { name: "July" },
        { name: "August" },
        { name: "September" },
        { name: "October" },
        { name: "November" },
        { name: "December" },
      ],
      typeNameSelected:false,
    
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
    Favourites
  },
  props: {},

  methods: {
 
addToFav(todo){
this.purchases.map((e)=>{
  if(e.id == todo.id){
      e.isFavourite = !e.isFavourite

  }
this.savePurchase()
})

},
    selectNameChart(option) {
      this.eachMonthChart = option.name;
      this.isChartVisible = true;
    },
    selectTypeOfPurchase(type) {
      this.isTypeSelected = true;
      this.selected_type = "";
      this.selected_type = type.name;
      this.areTypesVisible = false;
    },
    updateValue() {
      let regex = /\d/g;
      this.percent = this.percent.match(regex).join("");
      if (this.editName && +this.percent < 100) {
        this.rest_budget = (+this.total_budget_value * +this.percent) / 100;
      }
    },
   
    addTodo() {
      if (
        this.editing !== null &&
        this.priceEditing !== null &&
        this.dateEditing !== null &&
        this.typeEditing!== null
      ) {
        this.purchases[this.editing].name = this.input;
        this.purchases[this.priceEditing].price = +this.numberInput;
        this.purchases[this.dateEditing].dateInput = this.dateNow;
        this.purchases[this.typeEditing].types=this.selected_type
        this.editing = null;
        this.priceEditing = null;
        this.dateEditing = null;
        this.typeEditing=null;
        this.editName = false;
             this.percent =
        parseInt(this.percent) -
        (this.totalSum * 100) / this.total_budget_value +
        "%";
      this.rest_budget = +this.total_budget_value - this.totalSum;
        this.saveCounter()
        this.saveMainBudget()
        this.savePurchase()
       

      } else if (
        this.input.length >= 4 &&
        this.numberInput.length &&
        this.isTypeSelected
      ) {
        this.purchases.push(
          {
          name: this.input,
          done: false,
          id: Math.random(),
          price: +this.numberInput,
          dateInput: this.dateNow,
          types: this.selected_type,
          isFavourite:false
        }
        )
         
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
           this.saveCounter()
   this.savePurchase()
      this.saveMainBudget()
    },
    
    editTodo(index) {
    /*   this.input = "";
      this.numberInput = "";
      this.dateNow = "";  */ 
this.$refs.editPurchaseName.focus()
      this.editName = true;
      this.input = this.purchases[index].name;
      this.numberInput = +this.purchases[index].price;
      this.dateNow = this.purchases[index].dateInput;
      this.selected_type = this.purchases[index].types
      this.editing = index;
      this.priceEditing = index;
      this.dateEditing = index;
      this.typeEditing=index;
 
    },
     savePurchase() {
      localStorage.setItem("purchases",JSON.stringify(this.purchases));
    },
             
    
    clearDate() {
      this.selectedMonth = "Select a day";
      return (this.sortedPro = [...this.purchases]);
    },
 saveCounter(){
            localStorage.rest_budget= +this.rest_budget
        },
         saveMainBudget(){
            localStorage.total_budget_value= +this.total_budget_value
            localStorage.percent=this.percent
            localStorage.perDayMed=this.perDayMed
            localStorage.totalBudgetData=this.totalBudgetData
           
        },


filterType(type){
    this.typeSelected=type.name
    this.typeNameSelected=true;
  this.sortedPro= this.purchases.filter((e)=>{
if(type.name==='All'){
  return this.purchases
}
    return e.types === type.name
  })
},
    selectPrice(price) {
      this.sortedPro = [...this.purchases];
       let month;
        let day;
         let optionDay;
          let optionMonth;
          let endDays;
          let endMonth;
      this.sortedPro = this.sortedPro.filter((e) => {
        return price.name === "High"
          ? e.price > 100
          : price.name === "Moderate"
          ? e.price >= 50 && e.price < 100
          :price.name ==='All' ? this.purchases :  e.price < 50;
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
            return price.name === "High"
              ? e.price > 100
              : price.name === "Moderate"
              ? e.price >= 50 && e.price < 100
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
          (this.totalSum * 100) / prop_total_budget +
          "%";

        if (this.totalSum > this.perDayMed) {
          this.medPriceAcc = true;
        }
      }
      this.total_budget = prop_total_budget;
      this.total_budget_value = prop_total_budget;
      if (prop_total_budget.length) {
        prop_total_budget = "";
      }
     this.saveMainBudget()
     this.saveCounter()
    },

    changePerDayMed() {
      this.perDayMed = Math.floor(this.rest_budget / 30);
      setTimeout(() => {
        this.medPriceAcc = false;
      }, 3000);
      this.saveMainBudget()
    },
  },
 created(){
 this.purchases = JSON.parse(localStorage.getItem('purchases')||[])
}, 
  computed: {
   
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
    if (this.purchases.length) {
      this.sortedPro = [...this.purchases];
       this.isCatVisible = true; 
    }
 if(localStorage.total_budget_value){
  this.total_budget_value = +localStorage.total_budget_value

        this.isTotalVisible=true; 
        this.isPercentVisible=true;
 }
 if(localStorage.rest_budget){
   this.rest_budget = +localStorage.rest_budget
 }
 if(localStorage.rest_budget){
   this.rest_budget = localStorage.rest_budget
 }
 if(localStorage.names){
  this.purchases[this.editing].name  = localStorage.names
  
 }
 if(localStorage.perDayMed){
   this.perDayMed = localStorage.perDayMed
 }
  if(localStorage.percent){
   this.percent = localStorage.percent
 }
  if(localStorage.totalBudgetData){
   this.totalBudgetData = localStorage.totalBudgetData
 }

 
  },

  watch: {
    purchasesyu: {
      handler: function(updatedList) {
        localStorage.setItem('purchases', JSON.stringify(updatedList));
      },
      deep: true
    }
  },


 
};
</script>

<style  scoped>
.main_form {
  margin: 20px auto;
  display: flex;
  flex-direction: column;
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
.inputs{
  width:80%;
}
}
</style>