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
      />
    </div>
    
   <div v-if="isTotalVisible"  class="total_budget"  >
      <p>  {{$t('Totalbudget')}}  {{ total_budget_value }} {{$t('som')}} </p>
        <button type='button' @click='changeTheTotalBudget' class='btn btn-danger'>
        {{$t('Changebudget')}} 
        </button>
      <p>{{$t('leftBudget')}}  {{ rest_budget }} {{$t('som')}}</p>
      <div>{{ totalBudgetData | moment }}</div>
      <div id="budgetInfo"> {{$t('Perdaymedium')}}  {{ perDayMed }} {{$t('som')}}</div>

        <div
      v-if='isPlanChanged'
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
      <div> {{$t('accText2')}}  {{ perDayMed }} {{$t('som')}} </div>
     
    </div>
    </div>
 <div class='progress_bar'>
   <v-progress-circular
      :size="100"
      :width="15"
      :value="percent"
      :style="parseInt(percent <= 50) ? { color: 'red' } : { color: 'teal' }"
      :color="percent ? 'teal' : 'red'"
    >
      {{ isPercentVisible ? parseInt(percent) + "%" : 0 }}
    </v-progress-circular>
 </div>




    </section>
</template>
<script>
import i18n from '../plugins/i18n.js'
import moment from "moment";
    export default {
        name:'BudgetInfo',
        data(){
            return{
              total_budget:'',
             
             isTotalChanged:false
            }
        },
        props:{
                isTotalVisible:Boolean,
                isPercentVisible:Boolean,
                 rest_budget: null,
                   perDayMed: null,
                     totalBudgetData: null,
                     isPlanChanged:{
                         type:Boolean
                     },
                     percent:NaN,   
                     total_budget_value:null    
        },
        methods: {
             moment() {
      return moment();
    },
             totalBudget() {
      this.$emit('totalBudget',this.total_budget)
   setTimeout(() => {
this.total_budget = ''
   },1000) 
    },
    changePerDayMed(){
this.$emit('changePerDayMed')
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
     theme(){
           let theme = localStorage.getItem("theme")
       
           return theme
       }
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