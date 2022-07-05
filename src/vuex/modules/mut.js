import getLocals from '../getLocalState.js'
import i18n from '../../plugins/i18n.js'

let mut={
    updateNameInput (state, message) {
        state.nameInput = message
      },
      updateLowPrice(state,low){
        state.lowPrice = low
      },
      updateNewInputInput(state,type){
        state.newType=type
      },
      updateMedPrice(state,med){
        state.medPrice = med
      },
      updateTotalInput(state,bud){
        state.total_budget = bud
      },
      updatePageNum(state,page){
        state.page =page
      },
      updateHighPrice(state,high){
        state.highPrice = high
      },
      updateNumberInput (state, message) {
        state.numberInput = message
      },
      updateDateInput (state, message) {
        state.dateNow = message
      },
      setTypeOfPur: (state, type) => {
        state.selected_type = type.name;
    state.isTypeSel = false;
    state.isTypeSelected = true;
        state.typeHasNotSel=false;
      
      },
      addPurchases:(state)=>{
        let numOfPur = state.purchases.length;
        if (state.numberInput < 1) {
            state.isPriceNegative = true;
            setTimeout(() => {
              state.isPriceNegative = false;
            }, 5000);
          }
          if (state.nameInput.length < 4) {
            state.isNameSmall = true;
            setTimeout(() => {
              state.isNameSmall = false;
            }, 5000);
          }
          if (
            state.editing !== null &&
            state.priceEditing !== null &&
            state.dateEditing !== null &&
            state.typeEditing !== null
          ) {
            state.purchases[state.editing].name = state.nameInput;
            state.purchases[state.priceEditing].price = +state.numberInput;
            state.purchases[state.dateEditing].dateInput = state.dateNow;
            state.purchases[state.typeEditing].types = state.selected_type;
            state.editing = null;
            state.priceEditing = null;
            state.dateEditing = null;
            state.typeEditing = null;
            state.editName = false;

            state.totalSum = state.purchases.map((e)=>e.price).reduce((acc,rec)=>acc+rec)
          
          

            console.log('rest budget before editing',state.rest_budget)
          
            console.log('total_budget',+state.total_budget)
            console.log('totalSum',state.totalSum)



            state.rest_budget = state.saved_total_budget- state.totalSum   
     
  
            console.log('rest_budget before edit ',state.rest_budget)
           
            state.percent =
            (state.rest_budget * 100) / state.saved_total_budget
         
          state.nameInput = "";
          state.numberInput = "";
          state.dateNow = ""; 
          state.selected_type = 'Select a type'  
            
          }

         else if (
            state.nameInput.length >= 4 &&
            state.numberInput.length &&
            state.isTypeSelected
          ) {
            state.purchases.push({
              name: state.nameInput,
              id: Math.random(),
              price: +state.numberInput,
              dateInput: state.dateNow,
              types: state.selected_type,
              isFavourite: false,
              numOfPur:++numOfPur
              
            });
            state.totalSum = state.purchases.map((e)=>e.price).reduce((acc,rec)=>acc+rec)
      
            state.nameInput = "";
            state.numberInput = "";
            state.dateNow = ""; 
            state.selected_type = 'Select a type';
      }
      state.arePurchasesVisible = true;
      state.sortedPro = [...state.purchases];
      state.editName = false;
      state.isCatVisible = true;
    console.log('srotedPro in mutat',state.sortedPro)
    console.log('purchases in mutat',state.purchases)
    if(state.nameInput.length >= 4 && state.numberInput.length &&
         state.dateNow.length && state.isTypeSelected === false){
            state.typeHasNotSel = true;
      }

      let todays_date = new Date();
      let todays_day = todays_date.getDate();
      let todays_month = todays_date.getMonth() + 1;
      state.sortedPro.map((e) => {
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
          state.perDayMed &&
          state.totalSum > state.perDayMed
        )
        {
         setTimeout(()=>{
          state.medPriceAcc = true;
         },4000)
          setTimeout(() => {
            state.medPriceAcc = false;
          }, 8000); 
        }  
         else {
          state.medPriceAcc = false;
        } 
      }); 

      if (state.saved_total_budget) {
        state.percent = 100 - (100 * state.totalSum) / state.saved_total_budget;
        state.rest_budget =
          state.saved_total_budget && state.saved_total_budget - state.totalSum;
      }

    },
    editPurchase(state,index){
      state.isTypeSel = false;
      state.editName = true;
      state.nameInput = state.purchases[index].name;
      state.numberInput = +state.purchases[index].price;
      state.dateNow = state.purchases[index].dateInput;
      state.selected_type = state.purchases[index].types;
      state.editing = index;
      state.priceEditing = index;
      state.dateEditing = index;
      state.typeEditing = index;
    },
  initialiseStore(state) {
    return getLocals(state)
    },
    submitCustomPrice(state,{lowPrice,medPrice,highPrice}){
      state.lowPrice=+lowPrice
      state.medPrice=+medPrice;
      state.highPrice =+highPrice
    }  ,
    setSorted(state){
      state.sortedPro=[...state.purchases]
    },
    isCatVis(state){
      state.isCatVisible=true
    },
    selectMonth(state,option){
      if (option) {
        state.startDay = option.start.getDate();
        state.endDay = option.end.getDate();
        state.startMonth = option.start.getMonth() + 1;
        state.endMonth = option.end.getMonth() + 1;  
        state.selectedMonth = `${
          String(state.startDay).length === 2
            ? state.startDay
            : "0" + state.startDay
        }.${
          String(state.startMonth).length === 2
            ? state.startMonth
            : "0" + state.startMonth
        } - ${
          String(state.endDay).length === 2 ? state.endDay : "0" + state.endDay
        }.${
          String(state.endMonth).length === 2
            ? state.endMonth
            : "0" + state.endMonth
        }`;
       state.sortedPro = state.purchases.filter((item) => {
          state.itemDay = item.dateInput.split("-")[2];
          state.itemMonth = item.dateInput.split("-")[1];
          if (state.itemDay.startsWith("0")) {
            state.itemDay = state.itemDay.split("")[1];
          }
          if (state.itemMonth.startsWith("0")) {
            state.itemMonth = state.itemMonth.split("")[1];
          }
          state.isMonthChoosen = true
          return (
            +state.itemDay >= state.startDay &&
            +state.itemDay <= state.endDay &&
            +state.itemMonth >= state.startMonth &&
            +state.itemMonth <= state.endMonth
          );
        });
      }
    
   if(!state.isPriceChooses){
        let globalPrice2 = state.globalPrice;
        state.sortedPro = state.purchases.filter((item) => {
          state.itemDay = item.dateInput.split("-")[2];
          state.itemMonth = item.dateInput.split("-")[1];
          if (state.itemDay.startsWith("0")) {
            state.itemDay = state.itemDay.split("")[1];
          }
          if (state.itemMonth.startsWith("0")) {
            state.itemMonth = state.itemMonth.split("")[1];
          }
          state.isMonthChoosen = true
          if (
            +state.itemDay >= state.startDay &&
            +state.itemDay <= state.endDay &&
            +state.itemMonth >= state.startMonth &&
            +state.itemMonth <= state.endMonth
          ){
            return    globalPrice2 === "High" || globalPrice2=== "Высокий"
            ? item.price > state.highPrice
            :globalPrice2=== "Moderate" || globalPrice2=== "Средний"
            ? item.price >= state.medPrice && item.price <= state.highPrice
            : globalPrice2=== "All" || globalPrice2=== "Все"
            ? state.purchases
            : item.price >= state.lowPrice && item.price < state.medPrice 
          }
        });            
   }

   if(!state.isDefault){
    console.log('yes type was selec',state.typeSelected)
    console.log(+state.itemDay,+state.itemMonth)
    console.log(state.startDay,state.endDay,state.startMonth,state.endMonth)
    let typeObj;
    let enObj
 return   state.sortedPro = state.purchases.filter((e) => {
  state.itemDay = e.dateInput.split("-")[2];
  state.itemMonth = e.dateInput.split("-")[1];
  if (state.itemDay.startsWith("0")) {
    state.itemDay = state.itemDay.split("")[1];
  }
  if (state.itemMonth.startsWith("0")) {
    state.itemMonth = state.itemMonth.split("")[1];
  }
    typeObj = {
      Еда: "Food",
      Транспорт: "Transport",
      Медицина: "Medicine",
      Связь: "Internet",
      Кредит:'Credit',
      Другое: "Entertainment",
    };
    const rusValues = Object.values(typeObj);
    const rusKeys = Object.keys(typeObj);
    enObj = Object.assign(
      ...rusValues.map((v, i) => ({ [v]: rusKeys[i] }))
    );
   
/*   if (
        +state.itemDay >= state.startDay &&
            +state.itemDay <= state.endDay &&
            +state.itemMonth >= state.startMonth &&
            +state.itemMonth <= state.endMonth
          ){
            return i18n.locale === "en"
            ? state.typeSelected=== e.types ||state.typeSelected === typeObj[e.types]
            : i18n.locale === "ru"
            ? state.typeSelected === e.types || state.typeSelected=== enObj[e.types]
            : ""; 
          }
      });
      }  */
      if(i18n.locale === "en"
      ? state.typeSelected === e.types || state.typeSelected=== typeObj[e.types] ||  state.typeSelected=='All'
      : i18n.locale === "ru"
      ?  state.typeSelected === e.types ||  state.typeSelected === enObj[e.types]
      : ''  ) 
      {
        console.log('yes the types are eqal in selectMOnth')
        
    return   +state.itemDay >= state.startDay &&
        +state.itemDay <= state.endDay &&
        +state.itemMonth >= state.startMonth &&
        +state.itemMonth <= state.endMonth
      }   
  });
  }  
    },
    clearDate(state,lan){
      state.selectedMonth=  lan.locale==='en' ?'Select a month' :'Выберите число'
      return state.sortedPro = [...state.purchases]
    },
    addToFav(state,purchase){
      state.purchases.map((e) => {
        if (e.id === purchase.id) {
          e.isFavourite = !e.isFavourite;
        }
       
      });
    },
    totalBudget(state,total_budget){
      state.isTotalVisible = true;
      state.isPercentVisible = true;
      state.percent = 100;
      state.saved_total_budget = +total_budget;
      state.perDayMed = Math.floor(total_budget / 30);
      if (state.sortedPro.length) {
        state.rest_budget = state.saved_total_budget - state.totalSum
        state.percent =
          parseInt(state.percent) -
          (state.totalSum * 100) / total_budget; 
        if (state.totalSum> state.perDayMed) {
           setTimeout(()=>{
            state.medPriceAcc = true;
           },4000)
        }
      }
        if( state.sortedPro.length === 0 ){
        state.rest_budget = +state.total_budget;
      }
      if (total_budget.length) {
       setTimeout(()=>{
        state.total_budget = "";
       },4000)
      }
    },
    getTotalSum(state){

      if(state.sortedPro.length){
     
        state.totalSum = state.sortedPro.map((e)=>e.price)?.reduce((acc,rec)=>acc+rec)
     
        return state.totalSum
      }
    },
    changePerDayMed(state) {
      state.perDayMed = Math.floor(state.rest_budget / 30); 
      setTimeout(() => {
        state.medPriceAcc = false;
      }, 1000); 
      state.isPlanChanged = true;
      setTimeout(() => {
        state.isPlanChanged = false;
      }, 3000);
    },
    closePriceWarn(state){
      state.medPriceAcc=false
    },
    selectPrice(state,price){
      state.isPriceChooses = false;
      state.sortedPro = [...state.purchases];
      state.globalPrice = price.name
      state.sortedPro = state.sortedPro.filter((e) => {
         return    price.name === "High" || price.name === "Высокий"
          ? e.price > state.highPrice
          : price.name === "Moderate" || price.name === "Средний"
          ? e.price >= state.medPrice && e.price <= state.highPrice
          : price.name === "All" || price.name === "Все"
          ? state.purchases
          : e.price >= state.lowPrice && e.price < state.medPrice 
      });

      if (state.isMonthChoosen && state.selectedMonth.length > 12) {
       state.sortedPro = state.purchases.filter((item) => {
          state.itemDay = item.dateInput.split("-")[2];
          state.itemMonth = item.dateInput.split("-")[1];
          if (state.itemDay.startsWith("0")) {
            state.itemDay = state.itemDay.split("")[1];
          }
          if (state.itemMonth.startsWith("0")) {
            state.itemMonth = state.itemMonth.split("")[1];
          }
         if(  +state.itemDay >= state.startDay &&
          +state.itemDay <= state.endDay &&
          +state.itemMonth >= state.startMonth &&
          +state.itemMonth <= state.endMonth){
            return price.name === "High" || price.name === "Высокий"
            ? item.price > state.highPrice
            : price.name === "Moderate" || price.name === "Средний"
            ? item.price >= state.medPrice && item.price <= state.highPrice
            : price.name === "All" || price.name === "Все"
            ? state.purchases
            : item.price >= state.lowPrice && item.price < state.medPrice   
          }
        });

    }

    if(!state.isDefault){
      let typeObj;
      let enObj
      state.sortedPro = state.purchases.filter((e) => {
      typeObj = {
        Еда: "Food",
        Транспорт: "Transport",
        Медицина: "Medicine",
        Связь: "Internet",
        Кредит:'Credit',
        Другое: "Entertainment",
      };
      const rusValues = Object.values(typeObj);
      const rusKeys = Object.keys(typeObj);
      enObj = Object.assign(
        ...rusValues.map((v, i) => ({ [v]: rusKeys[i] }))
      );

        if(i18n.locale === "en"
        ? state.typeSelected === e.types || state.typeSelected=== typeObj[e.types] ||  state.typeSelected=='All'
        : i18n.locale === "ru"
        ?  state.typeSelected === e.types ||  state.typeSelected === enObj[e.types]
        : ''  ) 
        {
             return price.name === "High" || price.name === "Высокий"
        ? e.price > state.highPrice
        : price.name === "Moderate" || price.name === "Средний"
        ? e.price >= state.medPrice && e.price <= state.highPrice
       : price.name === "All" || price.name === "Все"
        ? state.purchases 
        : e.price >= state.lowPrice && e.price < state.medPrice
        }  
    });
    }



  },
  filterType(state,type){
    let typeObj;
    let enObj;
    state.typeSelected = type.name;
    state.typeNameSelected = true;
    state.isDefault = false;
    state.sortedPro = state.purchases.filter((e) => {
if ( type.name === "All" || type.name === "Все" ) {
      state.sortedPro =[...state.purchases]
      return state.sortedPro
      }    
      typeObj = {
        Еда: "Food",
        Транспорт: "Transport",
        Медицина: "Medicine",
        Связь: "Internet",
        Кредит:'Credit',
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

    if (state.isMonthChoosen && state.selectedMonth.length > 12) {
      state.sortedPro = state.purchases.filter((item) => {
         state.itemDay = item.dateInput.split("-")[2];
         state.itemMonth = item.dateInput.split("-")[1];
         if (state.itemDay.startsWith("0")) {
           state.itemDay = state.itemDay.split("")[1];
         }
         if (state.itemMonth.startsWith("0")) {
           state.itemMonth = state.itemMonth.split("")[1];
         }
        if(+state.itemDay >= state.startDay &&
         +state.itemDay <= state.endDay &&
         +state.itemMonth >= state.startMonth &&
         +state.itemMonth <= state.endMonth){
           return i18n.locale === "en"
              ? type.name === item.types || type.name === typeObj[item.types]
              : i18n.locale === "ru"
              ? type.name === item.types || type.name === enObj[item.types]
              : "";  
         }
       });

   }


   if(!state.isPriceChooses){
    let globalPrice2 = state.globalPrice;
   return state.sortedPro = state.purchases.filter((e) => {
         if(globalPrice2=== "High" ||  globalPrice2 === "Высокий"
            ? e.price > state.highPrice
            :  globalPrice2 === "Moderate" ||  globalPrice2=== "Средний"
            ? e.price >= state.medPrice && e
            .price <= state.highPrice
             :  globalPrice2 === "All" | globalPrice2 === "Все"
            ? state.purchases 
            : e.price >= state.lowPrice && e.price < state.medPrice)
            { 
               if(type.name === 'All'   || type.name === 'Все' ){
                state.sortedPro=[... state.purchases ]
                return state.sortedPro
                } 
              if(i18n.locale === "en" ){
                console.log('in type filtering ',type.name)
                console.log('in type filtering ',e.types)
  return  type.name === e.types || type.name === typeObj[e.types] || type.name=='All'
                }
                else if(i18n.locale === "ru"){
  return  type.name === e.types || type.name === enObj[e.types] || type.name =='Все'
                }
            }     
        }) 
      }
  },
  selectChartMonth(state,option){
    state.eachMonthChart = option.name;
    state.isChartVisible = true;
    state.isMonthVisible = false;
  },
  showAll(state){
    state.isAllVisible = !state.isAllVisible
    state.page=1;
state.isAllVisible ?   state.perPage = state.purchases.length : state.perPage=5
  },
 
}
export default mut