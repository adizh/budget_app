import i18n from '../../plugins/i18n.js'


let getters = {
  NAME_INPUT(state) {
    return state.nameInput
  },
  IS_TYPE_SEL(state) {
    return state.isTypeSel
  },
  SELECTED_TYPE_ADD(state) {
    return state.selected_type
  },
  IS_NAME_SMALL(state) {
    return state.isNameSmall
  },
  TOTAL_SUM(state) {
    return state.totalSum
  },
  IS_PRICE_NEG(state) {
    return state.isPriceNegative
  },
  IS_TYPE_SELEC(state) {
    return state.typeHasNotSel
  },
  EDIT_NAME(state) {
    return state.editName
  },
  PURCHASES(state) {
    return state.purchases
  },
  PRICE_ACC_MED(state) {
    return state.medPriceAcc
  },
  SORTED_PRO(state) {
    return state.sortedPro

  },
  HIGH_PRICE_MAIN(state) {
    return state.highPrice
  },
  MED_PRICE_MAIN(state) {
    return state.medPrice
  },
  LOW_PRICE_MAIN(state) {
    return state.lowPrice
  },
  SELECTED_MONTH_CALENDAR(state) {
    return state.selectedMonth
  },
  TOTAL_BUDGET(state) {
    return state.saved_total_budget
  },
  REST_BUDGET(state) {
    return state.rest_budget
  },
  PER_DAY_MED(state) {
    return state.perDayMed
  },
  PERCENT(state) {
    return state.percent
  },
  IS_TOTAL_VISIBLE(state) {
    return state.isTotalVisible
  },
  IS_PRICE_CHOOSEN(state) {
    return state.isPriceChooses
  },
  IS_CATEGORY_VISIBLE(state) {
    return state.isCatVisible
  },
  NEW_TYPE(state) {
    return state.newType
  },
  FOOD_SUM(state) {
    let count = [];
    state.purchases.map((e) => {
      if (e.types === "Food" || e.types === "Еда") {
        count.push(e.price);
      }
    });
    count = count.reduce((acc, rec) => acc + rec, 0);
    return count
  },

  TRANSPORT_SUM(state) {
    let count = [];
    state.purchases.map((e) => {
      if (e.types === "Transport" || e.types === "Транспорт") {
        count.push(e.price);
      }
    });
    count = count.reduce((acc, rec) => acc + rec, 0);
    return count;
  },

  MEDICINE_SUM(state) {
    let count = [];
    state.purchases.map((e) => {
      if (e.types === "Medicine" || e.types === "Медицина") {
        count.push(e.price);
      }
    });
    count = count.reduce((acc, rec) => acc + rec, 0);
    return count;
  },
  INTERNET_SUM(state) {
    let count = [];
    state.purchases.map((e) => {
      if (e.types === "Internet" || e.types === "Связь") {
        count.push(e.price);
      }
    });
    count = count.reduce((acc, rec) => acc + rec, 0);
    return count;
  },
  CREDIT_SUM(state) {
    let count = [];
    state.purchases.map((e) => {
      if (e.types === "Credit" || e.types === "Кредит") {
        count.push(e.price);
      }
    });
    count = count.reduce((acc, rec) => acc + rec, 0);
    return count;
  },
  ENTERN_SUM(state) {
    let count = [];
    state.purchases.map((e) => {
      if (e.types === "Entertainment" || e.types === "Другое") {
        count.push(e.price);
      }
    });
    count = count.reduce((acc, rec) => acc + rec, 0);
    return count;
  },


  IS_DEFAULT_TYPE_SEL(state) {
    return state.isDefault
  },
  TYPE_SELECTED_FILTER(state) {
    return state.typeSelected
  },
  janTotalSum(state) {
    let count = [];
    let month;
    state.purchases.map((e) => {
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

  febTotalSum(state) {
    let count = [];
    let month;
    state.purchases.map((e) => {
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
  marchTotalSum(state) {
    let count = [];
    let month;
    state.purchases.map((e) => {
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
  apTotalSum(state) {
    let count = [];
    let month;
    state.purchases.map((e) => {
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

  mayTotalSum(state) {
    let count = [];
    let month;
    state.purchases.map((e) => {
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
  junTotalSum(state) {
    let count = [];
    let month;
    state.purchases.map((e) => {
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
  julTotalSum(state) {
    let count = [];
    let month;
    state.purchases.map((e) => {
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
  augTotalSum(state) {
    let count = [];
    let month;
    state.purchases.map((e) => {
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
  sepTotalSum(state) {
    let count = [];
    let month;
    state.purchases.map((e) => {
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
  octTotalSum(state) {
    let count = [];
    let month;
    state.purchases.map((e) => {
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
  novTotalSum(state) {
    let count = [];
    let month;
    state.purchases.map((e) => {
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
  decTotalSum(state) {
    let count = [];
    let month;
    state.purchases.map((e) => {
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
  IS_MONTH_CHOOSEN(state) {
    return state.isMonthVisible
  },
  EACH_MONTH_CHART(state) {
    return state.eachMonthChart
  },
  EACH_MONTH_DATA(state) {
    let obj2 = {};
    let day;
    let price = [];
    let datArr = [];
    state.purchases &&
      state.purchases.map((e) => {
        let month;
        month = e.dateInput.split("-")[1];
        day = e.dateInput.split("-")[2];
        if (month.startsWith("0")) {
          month = month.split("")[1];
        }
        if (day.startsWith("0")) {
          day = day.split("")[1];
        }
        let monthName = i18n.locale === 'en' ? i18n.messages.en.monthChartsOption.map((e) => e.name) :
          i18n.messages.ru.monthChartsOption.map((e) => e.name)
        let isMonthObj = {};
        for (let i = 0; i < monthName.length; i++) {
          isMonthObj[monthName[i]] = `${i + 1}`;
        }
        let mnObjDays = Array.from(Object.values(isMonthObj));
        let reversedMonth = {};
        for (let i = 0; i < mnObjDays.length; i++) {
          reversedMonth[mnObjDays[i]] = monthName[i];
        }
        if (state.eachMonthChart === reversedMonth[month]) {
          price.push(e.price);

          datArr.push(`2022-${isMonthObj[state.eachMonthChart]}-${day}`);
        }
      });
    obj2 = datArr.reduce(
      (acc, rec, i) => ((acc[rec] = (acc[rec] || 0) + price[i]), acc),
      {}
    );

    return obj2;
  },
  PAGE(state) {
    return state.page
  },
  PER_PAGE(state) {
    return state.perPage
  },
  IS_ALL_VISIBLE(state) {
    return state.isAllVisible
  },
  PURCHASE_TYPES(state) {
    return i18n.locale === 'en' ? state.purchaseType : state.purchaseTypeRu
  }
}
export default getters