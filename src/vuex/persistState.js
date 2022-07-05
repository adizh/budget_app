
let st = (mut, state)=>{
    localStorage.setItem('purchases', JSON.stringify(state.purchases));
    localStorage.setItem('lowPrice',state.lowPrice)
    localStorage.setItem('medPrice',state.medPrice)
    localStorage.setItem('highPrice',state.highPrice)
    localStorage.setItem('saved_total_budget',state.saved_total_budget)
    localStorage.setItem('rest_budget',state.rest_budget)
    localStorage.setItem('totalBudgetData',state.totalBudgetData)
    localStorage.setItem('perDayMed',state.perDayMed)
    localStorage.setItem('percent',state.percent)
}
export default st
