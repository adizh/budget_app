<template>
    <div id='main_chart'>
      <button class='btn btn-primary info_btn' @click='isMainChartVisible =!isMainChartVisible'>

{{!isMainChartVisible ?   $t('Showchart') : $t('Hidechart')}}

      </button>
  <div v-show='isMainChartVisible'>
           <div > {{$t('Maxmonth') }}: {{showMax}}  <button >  {{$t('Minmonth') }}: {{showMin}}</button></div>
   <column-chart   :min='0'  :data="columnData"
       ></column-chart>  
  </div>
    </div>
</template>

<script>

    export default {
        name:'MainChart',
        data(){
            return{
              isMainChartVisible:false
            }
        },
        props: {
          purchases:Array,
          languages:Array
        },
        computed:{
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
      return this.languages.map((e)=>{
        if(e.language == 'en'){
          console.log('its enlish')
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
      ]
        }
        else{
        console.log('its russia')
         return   [
        ['Янва', this.janTotalSum],
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
          }
        
      })
    },
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
      let res = arr.filter((e)=>e>0)
      return res.length > 1 ? Math.min(...res) : 0
},
        }
    }
</script>

<style  scoped>
#main_chart{
  text-align:center;
}

@media (min-width:250px) and (max-width: 450px){
  .info_btn{
    text-align:center;
    display:block;
    margin: 10px auto;
  }

}
</style>