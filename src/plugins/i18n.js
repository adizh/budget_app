import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
        welcomeMsg: 'Welcome to Your Vue.js App',
        selectedMonth2:'Select a month',
        clearData:'Clear',
        leftBudget:'Rest Budget ',
        Totalbudget:'Total Budget',
        Changebudget:'Change budget',
        som:'som',
        Perdaymedium:'Per day medium',
        accText:'You accelareted per day medium plan.',
        accText2:'Your plan now  is: ',
        Changetheplan:'Change the plan',
        Showchart:"Show main chart info",
        Hidechart:"Hide Chart Info",
        Maxmonth:'Max month',
        Minmonth:'Min month',
        selMonthChart:'Select a month',
        Name:'Name',
        Price:'Price',
        Time:'Time',
        NameProblem:' Name must be bigger 3 letters!',
        PriceProblem:'Price must be positive only!',
        typeSelect:'Select a type',
        purchaseType2: [
            { name: "Food" },
            { name: "Transport" },
            { name: "Medicine" },
            { name: "Internet" },
            { name: "Entertainment" },
          ],
          default:'Add',
          updatedVersion:'Update',
          typeFilter:'Filter by type',
          priceFilter:'Filter by price',
          pricesOption:[{name:'All'},{ name: "High" }, { name: "Moderate" }, { name: "Low" }],
          Totalsum:'Total sum',
          showfavourites:'Favourites',
           Close:'Close',
           monthChartsOption: [
            { name: "January" },
            { name: "February" },
            { name: "March"},
            { name: "April" },
            { name: "May" },
            { name: "June" },
            { name: "July" },
            { name: "August" },
            { name: "September" },
            { name: "October" },
            { name: "November" },
            { name: "December" },
          ],
          Nopurhases:'No purchases were found',
          typeatotalbudget:'type a total budget',
          changebudget:'change the budget'
    }, 

    'ru': {
        welcomeMsg: 'Bienvenido a tu aplicación Vue.js',
        selectedMonth2:'Выберите число',
        clearData:'Очистить',
        leftBudget:'Оставшийся бюджет ',
        Totalbudget:'Общий бюджет',
        Changebudget:'Изменить бюджет',
        som:'сом',
        Perdaymedium:'В среднем',
        accText:'Вы превысили средний план.',
        accText2:'Ваш план теперь: ',
        Changetheplan:'Изменить план',
        Showchart:'Показать общий график',
        Hidechart:'Скрыть график',
        Maxmonth:'Макс. месяц',
        Minmonth:'Миним. месяц',
        selMonthChart:'Выберите месяц',
        Name:'Имя',
        Price:'Цена',
        Time:'Дата',
        NameProblem:'Имя должно состоять больше 3 букв!',
        PriceProblem:'Цена должна быть больше 0!',
        typeSelect:'Выберите тип',
        purchaseType2: [
            { name: "Еда" },
            { name: "Транспорт" },
            { name: "Медицина" },
            { name: "Связь" },
            { name: "Другое" },
          ],
          default:'Добавить',
          updatedVersion:"Изменить",
          typeFilter:'Отфильтровать по типу',
          priceFilter:'Отфильтровать по цене',
          pricesOption:[{name:'Все'},{ name: "Высокий" }, { name: "Средний" }, { name: "Низкий" }],
          Totalsum:'Общая сумма',
          showfavourites:'Избранное',
          Close:'Закрыть',
          monthChartsOption: [
            { name: "Январь" },
            { name: "Февраль" },
            { name: "Март"},
            { name: "Апрель" },
            { name: "Май" },
            { name: "Июнь" },
            { name: "Июль" },
            { name: "Август" },
            { name: "Сентябрь" },
            { name: "Октябрь" },
            { name: "Ноябрь" },
            { name: "Декабрь" },
          ],
          Nopurhases:'Покупок не было найдено',
          typeatotalbudget:"общий бюджет",
          changebudget:'Изменить бюджете'
    }
};

const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'es', // set fallback locale
    messages, // set locale messages
});

export default i18n;