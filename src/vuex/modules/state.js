let state={
    nameInput:"",
    numberInput:'',
    dateNow:'',
    isTypeSel:true,
    selected_type:'Select a type',
    typeHasNotSel:false,
    isNameSmall:false,
    isPriceNegative:false,
    isTypeSelected:false,
    editName: false,
    purchases:[],
    editing: null,
    priceEditing: null,
    dateEditing: null,
    typeEditing: null,
    sortedPro:[],
    isCatVisible:false,
    highPrice:100,
    medPrice:50,
    isPlanChanged:false,
    lowPrice:0,
    selectedMonth: "Select a day",
    startDay: "",
    saved_total_budget:0,
    endDay: "",
    startMonth: "",
    endMonth: "",
    isMonthChoosen :false,
    itemDay: "",
    itemMonth: "",
    isPercentVisible: false,
    rest_budget: 0,
    perDayMed: 0,
    totalBudgetData: new Date(),
    total_budget: "",
    percent: 0,
isTotalVisible: false,
    medPriceAcc: false,
    totalSum:0,
    isPriceChooses:true,
    globalPrice:'',
    isDefault: true,
    newType:'',
    typeSelected: "Filter by type",
    typeNameSelected: false,
    isMonthVisible: true,
    eachMonthChart: "Month chart",
    perPage: 5,
    isAllVisible:false,
    page:1,
    purchaseType: [
        { name: "Food" },
        { name: "Transport" },
        { name: "Medicine" },
        { name: "Internet" },
        { name: "Credit" },
        { name: "Entertainment" },
      ],
      purchaseTypeRu:[
        { name: "Еда" },
        { name: "Транспорт" },
        { name: "Медицина" },
        { name: "Связь" },
        { name: "Кредит" },
        { name: "Другое" },
      ],
    
    
}
export default state