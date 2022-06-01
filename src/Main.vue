<template>
  <div id="app">
    <div id="range_date" @click="areOptionVisible = !areOptionVisible">
      <p>{{ selectedMonth }}</p>
      <v-date-picker
        mode="date"
        id="date_picker"
        @input="selectMonth"
        v-show="areOptionVisible"
        v-model="range"
        is-range
        color="gray"
        is-dark
      />
    </div>
    <button class="btn btn-success" @click="clearDate">clear</button>
    <div>
      <input
        @keyup.enter="totalBudget"
        v-model="total_budget"
        class="form-control inputs"
        type="number"
        placeholder="type a total budget"
      />
    </div>
    <div v-if="isTotalVisible" class="total_budget">
      <p>Total budget {{ total_budget }}</p>
      <p>Res budget {{ rest_budget }}</p>
      <div>{{ totalBudgetData | moment }}</div>
      <div>Per day medium {{ perDayMed }}</div>
    </div>
    <v-progress-circular
      :size="100"
      :width="15"
      :value="percent"
      :style="parseInt(percent <= 50) ? { color: 'red' } : { color: 'teal' }"
      :color="percent ? 'teal' : 'red'"
    >
      {{ isPercentVisible ? parseInt(percent) + "%" : 0 }}
    </v-progress-circular>
    <div
      v-if="medPriceAcc"
      class="alert alert-danger d-flex align-items-center"
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
      <div>An example danger alert with an icon</div>
      <button class="btn btn-danger" @click="changePerDayMed">
        Change the plan
      </button>
    </div>
    <div style='width: 700px'>  
      <div >Max month: {{showMax}}  <button >Min month: {{showMin}}</button></div>
      <column-chart   :min='0'  :data="columnData"
        @mousemove="chartInfo"
       ></column-chart>  
</div>

<ChartInfo @selectNameChart='selectNameChart' 
:eachMonthChart='eachMonthChart' :todos='todos'
 :monthChartsOption='monthChartsOption'
 :isChartVisible='isChartVisible'
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
        />
      </label>
      <p class="alert alert-danger err" role="alert" v-if="isNameSmall">
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
      <p class="alert alert-danger err" role="alert" v-if="isPriceNegative">
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
      <button
        :disabled="input.length && numberInput.length ? false : true"
        class="btn btn-primary addBtn"
        type="submit"
        @click="updateValue"
      >
        {{ editName ? updatedVersion : def }}
      </button>
    </form>
    <div class="filterByPrice">
      <p @click="arePricesVisible = !arePricesVisible">Filter by price</p>
      <div
        v-show="arePricesVisible"
        v-for="price in pricesOption"
        :key="price.name"
        @click="selectPrice(price)"
      >
        <p>{{ price.name }}</p>
      </div>
    </div>
    <div class="totalLengh">
      All products {{ this.filteredPro && this.filteredPro.length }}
    </div>
    <div class="expenses" v-show="this.filteredPro.length">
      <table class="table table-bordered border-primary today_tables">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody v-for="(todo, index) in filteredPro" :key="todo.id">
          <tr
            :title="
              todo.price > 100
                ? 'expensive'
                : todo.price >= 50 && todo.price < 100
                ? 'moderate'
                : 'normal'
            "
            :class="
              todo.price > 100
                ? 'expensiveRow'
                : todo.price >= 50 && todo.price < 100
                ? 'moderateRow'
                : 'normalRow'
            "
          >
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ todo.name }}</td>
            <td>{{ todo.price }} сом</td>
            <td>{{ todo.dateInput | moment }}</td>
            <td>
              <button class="btn btn-success" @click="editTodo(index)">
                edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>




    <div
      v-show="
        !this.filteredPro.length && this.todos.length && this.isThereAnyFiltered
      "
    >
      No results
    </div>
    <div class="total">Total sum: {{ totalSum }}</div>
  </div>
</template>
<script>
import moment from "moment";
import ChartInfo from './components/ChartInfo'
export default {
  name: "App",
  components:{
    ChartInfo
  },
  data() {
    return {
      eachMonthChart:'Month chart',
      total_budget: "",
      monthChartsOption:[
      {name:'January'},
      {name:'February'},
      {name:'March',option:'3'},
      {name:'April'},
      {name:'May'},
      {name:'June'},
      {name:'July'},
      {name:'August'},
      {name:'September'},
      {name:'October'},
      {name:'November'},
      {name:'December'},
      ],
      medPriceAcc: false,
      interval: {},
      isPercentVisible: false,
      value: 0,
      janPrice: 0,
      febPrice: 0,
      marchPrice: 0,
      apPrice: 0,
      mayPrice: 0,
      junPrice: 0,
      julPrice: 0,
      AugPrice: 0,
      sepPrice: 0,
      octPrice: 0,
      novPrice: 0,
      decPrice: 0,
      range: {
        start: new Date(2020, 0, 1),
        end: new Date(2020, 0, 5),
      },
      areOptionVisible: false,
      todos: [],
      totalBudgetData: new Date(),
      input: "",
      numberInput: "",
      dateNow: "",
      editing: null,
      editName: false,
      priceEditing: null,
      dateEditing: null,
      def: "Add",
      updatedVersion: "update",
      isNameSmall: false,
      isPriceNegative: false,
      sortedPro: [],
      formMode: true,
      selectedMonth: "Select a day",
      isThereAnyFiltered: true,
      pricesOption: [{ name: "High" }, { name: "Moderate" }, { name: "Low" }],
      arePricesVisible: false,
      isMonthChoosen: false,
      day: "",
      month: "",
      perDayMed: 0,
      startDay: "",
      endDay: "",
      startMonth: "",
      endMonth: "",
      isTotalVisible: false,
      percent: 0,
      marchArr: [],
      rest_budget: 0,
      isChartVisible:false
    };
  },
  methods: {
    selectNameChart(option){
this.eachMonthChart = option.name;
this.isChartVisible=true;
    },
 chartInfo(){
   console.log('hello from chart')
 },
    clearDate() {
      this.selectedMonth = "Select a day";
      return (this.sortedPro = [...this.todos]);
    },
    totalBudget() {
      this.isTotalVisible = true;
      this.isPercentVisible = true;
      this.percent = 100;
      this.perDayMed = Math.floor(this.total_budget / 30);
      if (this.filteredPro.length) {
        this.rest_budget = +this.total_budget - this.totalSum;
        this.percent =
          parseInt(this.percent) -
          (this.totalSum * 100) / this.total_budget +
          "%";
        if (this.totalSum > this.perDayMed) {
          this.medPriceAcc = true;
        }
      }
    },
    changePerDayMed() {
      this.perDayMed = Math.floor(this.rest_budget / 30);
      setTimeout(() => {
        this.medPriceAcc = false;
      }, 3000);
    },
    addTodo() {
      if (
        this.editing !== null &&
        this.priceEditing !== null &&
        this.dateEditing !== null
      ) {
        this.todos[this.editing].name = this.input;
        this.todos[this.priceEditing].price = +this.numberInput;
       
        this.todos[this.dateEditing].dateInput = this.dateNow;
        this.editing = null;
        this.priceEditing = null;
        this.dateEditing = null;
        this.editName = false;
      } else if (this.numberInput > 0 && this.input.length > 3) {
        this.todos.push({
          name: this.input,
          done: false,
          id: Math.random(),
          price: +this.numberInput,
          dateInput: this.dateNow,
        });
        this.sortedPro = [...this.todos];
        console.log("rest", this.rest_budget);
        console.log("total", this.total_budget);
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
        if (this.total_budget) {
       
this.percent = 100 -  ((100*this.totalSum) / this.total_budget)
          this.rest_budget =
            this.total_budget && +this.total_budget - this.totalSum;

            console.log('percent in adding todo',this.percent)
        }
      } else if (this.input.length <= 3) {
        this.isNameSmall = true;
        let vm = this;
        setTimeout(() => {
          vm.isNameSmall = false;
        }, 2000);
      } else if (this.numberInput < 0) {
        this.isPriceNegative = true;
        let vm = this;
        setTimeout(() => {
          vm.isPriceNegative = false;
        }, 2000);
      }
      this.input = "";
      this.numberInput = "";
      this.dateNow = "";
    },
    updateValue() {
      let regex = /\d/g;
      this.percent = this.percent.match(regex).join("");
      if (this.editName && +this.percent < 100) {
        this.rest_budget = (+this.total_budget * +this.percent) / 100;
      }
    },
    editTodo(index) {
      this.input = "";
      this.numberInput = 0;
      this.dateNow = "";
      this.input = this.todos[index].name;
      this.numberInput = +this.todos[index].price;
      this.dateNow = this.todos[index].dateInput;
      this.editing = index;
      this.priceEditing = index;
      this.dateEditing = index;
      this.editName = true;
      this.percent =
        parseInt(this.percent) -
        (this.totalSum * 100) / this.total_budget +
        "%";
      this.rest_budget = +this.total_budget - this.totalSum;
      console.log("totalSum in editing", this.totalSum);
      console.log("rest budget after editing in editTodo", this.rest_budget);
    },
    moment() {
      return moment();
    },
    selectMonth(option) {
      console.log(option);
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
        this.sortedPro = this.todos.filter((item) => {
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
    selectPrice(price) {
      this.sortedPro = this.todos.filter((e) => {
        return price.name === "High"
          ? e.price > 100
          : price.name === "Moderate"
          ? e.price >= 50 && e.price < 100
          : e.price < 50;
      });
      if (this.isMonthChoosen && this.selectedMonth.length > 12) {
        this.sortedPro = this.todos.filter((e) => {
          let month;
          let day;
          month = e.dateInput.split("-")[1];
          day = e.dateInput.split("-")[2];
          if (month.startsWith("0")) {
            month = month.split("")[1];
          }
          if (day.startsWith("0")) {
            day = day.split("")[1];
          }
          let optionDay;
          let optionMonth;
          let endDays;
          let endMonth;
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
            console.log("gotcha!!");
            return price.name === "High"
              ? e.price > 100
              : price.name === "Moderate"
              ? e.price >= 50 && e.price < 100
              : e.price < 50;
          } else {
            console.log("not ");
          }
        });
      }
    },
    hideSelect() {
      this.areOptionVisible = false;
      this.arePricesVisible = false;
    },
  },
  filters: {
    moment(date) {
      return moment(date).format("MMMM Do YYYY");
    },
  },
  computed: {
  showMax(){
      let arr = [this.janTotalSum,this.febTotalSum,this.marchTotalSum,
      this.apTotalSum,this.mayTotalSum,this.junTotalSum,this.julTotalSum,
      this.augTotalSum,this.sepTotalSum,this.octTotalSum,this.novTotalSum,
      this.decTotalSum
      ]
      return arr.length ?  Math.max(...arr) : 0
    },
showMin(){
  let arr = [this.janTotalSum,this.febTotalSum,this.marchTotalSum,
      this.apTotalSum,this.mayTotalSum,this.junTotalSum,this.julTotalSum,
      this.augTotalSum,this.sepTotalSum,this.octTotalSum,this.novTotalSum,
      this.decTotalSum
      ]
      console.log(Math.min(...arr))
      let res = arr.filter((e)=>e>0)
      return res.length > 1 ? Math.min(...res) : 0
},
    janTotalSum() {
      let count = [];
      let month;
      this.todos.map((e) => {
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
      this.todos.map((e) => {
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
      this.todos.map((e) => {
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
      this.todos.map((e) => {
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
      this.todos.map((e) => {
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
      this.todos.map((e) => {
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
      this.todos.map((e) => {
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
      this.todos.map((e) => {
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
      this.todos.map((e) => {
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
      this.todos.map((e) => {
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
      this.todos.map((e) => {
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
      this.todos.map((e) => {
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
      return [
        ['Jan', this.janTotalSum],
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
      ];
    },
    haldMonthDanger() {
      return (
        parseInt(this.percent <= 50) &&
        this.total_budget / 2 <
          (this.totalBudgetData?.getDate() + 15) * this.perDayMed
      );
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
    filteredPro() {
      if (this.sortedPro.length) {
        return this.sortedPro;
      } else {
        return [];
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
    /*   this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000) */
  },
  destroyed() {
    document.removeEventListener("click", this.hideSelect);
  },
};
</script>
<style>
#range_date {
}
#date_picker {
}
#myCanvas {
  width: 100px;
  height: 100px;
}
.v-progress-circular__overlay .moreThan {
  fill: red;
}
.v-progress-circular__overlay .default {
  fill: green;
}
.chartjs-render-monitor{
width:400px;

}
.circleBase {
  border-radius: 50%;
}
.circle1 {
  width: 100px;
  height: 100px;
  background: #4bc475;
  border: 1px solid #000;
}
.percent_graph {
  background: blueviolet;
  width: 100px;
  height: 50px;
}
.expensiveRow {
  background: #dc3545;
  border: 1px solid #000;
  color: white;
}
.moderateRow {
  border: 1px solid #000;
  background: #ffc107;
}
.normalRow {
  background: #198754;
  border: 1px solid #000;
  color: white;
}
.non_def {
  color: red;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
}
.done_todo {
  text-decoration: line-through;
  color: #00000050;
}
.total_budget {
  position: absolute;
  top: 3px;
  right: 20px;
}
li {
  text-decoration: none;
  list-style: none;
  border: 1px solid grey;
  max-width: 300px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  padding: 3px 10px;
  align-items: center;
}
li span {
  display: block;
}
.main_form {
  margin: 20px auto;
  display: flex;
  flex-direction: column;
}
.inputs {
  margin: 5px auto;
  display: block;
  width: 25%;
}
.addBtn {
  min-width: 10%;
  margin: 10px auto;
}
tr{
  text-align:center;
}
.today_tables {
  max-width: 400px;
  margin: 20px auto;
}
td {
  padding: 10px;

}
.err {
  width: 25%;
  margin: 10px auto;
}
.selectMonth {
  border: 1px solid grey;
  width: 200px;
  margin: 10px auto;
}
.options {
  border: 1px solid grey;
}
</style>
