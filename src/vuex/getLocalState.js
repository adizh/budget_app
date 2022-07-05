let getLocals=(state)=>{
    if(localStorage.getItem('purchases')) {     
        state.purchases=JSON.parse(localStorage.getItem('purchases'))
    }
    if(localStorage.getItem('lowPrice')){
      state.lowPrice = localStorage.getItem('lowPrice')
    }
    if(localStorage.getItem('medPrice')){
      state.medPrice = localStorage.getItem('medPrice')
    }
    if(localStorage.getItem('highPrice')){
      state.highPrice = localStorage.getItem('highPrice')
    }
    if(localStorage.getItem('saved_total_budget')){
      state.saved_total_budget = localStorage.getItem('saved_total_budget')
      state.isTotalVisible = true;
      state.isPercentVisible = true;
    }
    if(localStorage.getItem('rest_budget')){
      state.rest_budget = localStorage.getItem('rest_budget')
    }
    if(localStorage.getItem('totalBudgetData')){
      state.totalBudgetData = localStorage.getItem('totalBudgetData')
    }
    if(localStorage.getItem('perDayMed')){
      state.perDayMed = localStorage.getItem('perDayMed')
    }
    if(localStorage.getItem('percent')){
      state.percent = localStorage.getItem('percent')
    }

}
export default getLocals