<template>
  <div>
    <div class="monthChart">
      <p class='each_month' @click="isMonthSelected = !isMonthSelected">{{ !isMonthVisible ? eachMonthChart :$t('selMonthChart') }}</p>
      <div  :class="isMonthSelected ? 'all_info_chart':''">
        <div
        v-show="isMonthSelected"
        v-for="option in monthChartsOption"
        :key="option.name"
      >
        <p @click="selectChartMonth(option)" class='month_chart_'>{{ option.name }}</p>
      </div>
      </div>
    </div>
     <line-chart
      v-show="eachMonthChart !== 'Month chart'  && JSON.stringify(aprilData).length > 2 "
      :data="aprilData"
    ></line-chart>

    <div class="no_purchase" v-show="JSON.stringify(aprilData).length <= 2   && eachMonthChart !== 'Month chart'  
    ">No purhases were found in this month</div>
  </div>
</template>
<script>
export default {
  name: "ChartInfo",

  methods: {
    selectChartMonth(option) {
      this.$emit("selectNameChart", option);
      this.isMonthSelected=false
    },
  },
  props: {
    purchases:Array,
    eachMonthChart: {
      type: String,
    },
    isChartVisible: {
      type: Boolean,
      default: false,
    },
  isMonthVisible:Boolean,
    monthChartsOption: {
      type: Array,
    },
  },
  data() {
    return {
      isMonthSelected: false,
    };
  },
  computed: {
 
    aprilData(){
      let obj2 = {};
      let day;
      let price = [];
      let datArr = [];
     this.purchases && this.purchases.map((e) => {
        let month;
        month = e.dateInput.split("-")[1];
        day = e.dateInput.split("-")[2];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (day.startsWith("0")) {
          day = day.split("")[1];
        }


let monthName = this.monthChartsOption.map((e)=>e.name)
let isMonthObj = {
}
for(let i =0;i<monthName.length;i++){
  isMonthObj[monthName[i]] = `${i+1}`
}
let mnObjDays=Array.from(Object.values(isMonthObj))
let reversedMonth={
}
for(let i =0;i<mnObjDays.length;i++){
  reversedMonth[mnObjDays[i]] = monthName[i]
}
if(this.eachMonthChart === reversedMonth[month] ){


price.push(e.price)


console.log('prices',price)
datArr.push(`2022-${isMonthObj[this.eachMonthChart]}-${day}`)
console.log('datArr',datArr)


}


      });
obj2=datArr.reduce((acc,rec,i)=>(acc[rec]=(acc[rec]||0) + price[i],acc),{})
console.log('obj2 length',JSON.stringify(obj2).length)
return obj2
    },
   
  },
};
</script>

<style scoped>
.each_month{
  background: cornflowerblue;
    padding: 5px;
    width: 14%;
    margin: 17px auto;
    text-align: center;
    color: white;
    border-radius: 9px
}
.month_chart_:hover{
  cursor:pointer;
  opacity:.8;
}

.each_month:hover{
  opacity:.8;
  cursor:pointer;
}
.all_info_chart{
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
.no_purchase{
      text-align: center;
    font-weight: 300;
}
@media (min-width:250px) and (max-width: 450px){
  .each_month{
    text-align:center;
    width:45%;
  }
  .all_info_chart{
    display:flex;
    flex-direction:column;
    align-items:center;
width: 88%;
    max-height: 212px;

  }
}
</style>