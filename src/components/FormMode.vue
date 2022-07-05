
<template>
  <div>
 <CalendarRange/>
    <BudgetInfo  />
<MainChart/>
<ChartInfo/>
<CreatePurchase/>
<CategoryChart/>
 <PriceCustom />
   <Favourites/>
   <Purchases/>
     <PriceFilter/>
<Paginate/>

    <div class="total">
      {{ $t("Totalsum") }} : {{TOTAL_SUM}} {{ $t("som") }}
    </div>

  </div>
</template>
<script>
import CreatePurchase from './CreatePurchase.vue'
import Purchases from './Purchases.vue'
import PriceCustom from './PriceCustom.vue'
import CalendarRange from './CalendarRange.vue'
import Favourites from './Favourites.vue'
import BudgetInfo from './BudgetInfo.vue'
import PriceFilter from './PriceFilter.vue'
import CategoryChart from './CategoryChart.vue'
import MainChart from './MainChart.vue'
import ChartInfo from './ChartInfo.vue'
import Paginate from './Paginate.vue'
import {mapGetters,mapActions} from 'vuex'
  export default {
    name:'FormMode',
    components:{
      CreatePurchase,
      Purchases,
      PriceCustom,
      CalendarRange,
      Favourites,
      BudgetInfo,
      PriceFilter,
      CategoryChart,
      MainChart,
      ChartInfo,
      Paginate
    },
    computed:{
      ...mapGetters(['TOTAL_SUM','SORTED_PRO']),
    },
    methods:{
      ...mapActions(['GET_TOTAL_SUM']),
    },
    mounted(){
      this.GET_TOTAL_SUM() 
    },
    watch:{
      SORTED_PRO(){
        return  this.GET_TOTAL_SUM()
      }
    }
  }
</script>

