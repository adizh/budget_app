

<template>

<section id='info'>
  <div>
      <input
        @keyup.enter="totalBudget"
        v-model="total_budget"
        class="form-control inputs"
        type="number"
       
         ref='budgetName'
        :placeholder=" !isTotalChanged  ? $t(
      'typeatotalbudget'
        ) : $t(
      'changebudget'
        )"
      /><a v-show='PRICE_ACC_MED' href='#budgetName'></a>
    </div>
    
   <div v-if="IS_TOTAL_VISIBLE"  class="total_budget"  >
      <p>  {{$t('Totalbudget')}}  {{TOTAL_BUDGET}} {{$t('som')}} </p>
        <button type='button' @click='changeTheTotalBudget' class='btn btn-danger'>
        {{$t('Changebudget')}} 
        </button>
      <p>{{$t('leftBudget')}}  {{ REST_BUDGET}} {{$t('som')}}</p>
      <div>{{ this.$store.state.totalBudgetData | moment }}</div>
      <div > {{$t('Perdaymedium')}}  {{ PER_DAY_MED }} {{$t('som')}}</div>

        <div id="budgetInfo"
      v-if='this.$store.state.isPlanChanged'
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
      <div> {{$t('accText2')}}  {{ PER_DAY_MED }} {{$t('som')}} </div>
     
    </div>
    </div>
 <div class='progress_bar'>
   <v-progress-circular
      :size="100"
      :width="15"
      :value="PERCENT"
      :style="parseInt(PERCENT <= 50) ? { color: 'red' } : { color: 'teal' }"
      :color="PERCENT ? 'teal' : 'red'"
    >
      {{ this.$store.state.isPercentVisible ? parseInt(PERCENT) + "%" : 0 }}
    </v-progress-circular>
 </div>




    </section>
</template>
<script>

import i18n from '../plugins/i18n.js'
import moment from "moment";
import {mapActions,mapGetters} from 'vuex'
    export default {
        name:'BudgetInfo',
        data(){
            return{
          
             isTotalChanged:false
            }
        },
      
        methods: {
          ...mapActions(['INPUT_TOTAL_BUDGET']),
             moment() {
      return moment();
    },
    
             totalBudget() {
              this.INPUT_TOTAL_BUDGET(this.total_budget)      
    },

changeTheTotalBudget(){
  this.isTotalChanged=true;
  this.total_budget=''
  this.$refs.budgetName.focus() 
}
        },
          filters: {
    moment(date) {
 return   i18n.locale==='ru'? moment(date).locale('ru').format('LLLL')
 : moment(date).locale('en').format('LLLL')
  
    },
          },
          
computed:{
  ...mapGetters(['TOTAL_BUDGET','REST_BUDGET','PERCENT','PER_DAY_MED','PRICE_ACC_MED','IS_TOTAL_VISIBLE']),

                 total_budget:{
                get () {
      return this.$store.state.total_budget
    },
                set (value) {
      this.$store.commit('updateTotalInput', value)
    }

}
},
mounted(){


}
    }
    
</script>

<style  scoped>
.dark_theme{
  color:white


}
.light_theme{
  color:#000000;
}
.inputs{
    width: 29%;
    margin: 18px auto 7px;
}
.total_budget{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
#info{
      display: flex;
    flex-direction: column;
}
.progress_bar{
  margin:20px auto;
}
@media (min-width:250px) and (max-width: 450px){
#info{
      display: flex;
    flex-direction: column;
    align-items: center;
    gap:7px;
    margin: 10px auto 70px;
    text-align: center;
}
.inputs{
  width:100%;
}
}
</style>