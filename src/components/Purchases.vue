
 <template>
  <div class="expenses" v-show="filteredPro.length">
    <table class="table table-bordered border-primary today_tables"  
   :per-page="PER_PAGE"
      :current-page="PAGE"    >
      <thead>
        <tr class="rows_table">
          <th scope="col">#</th>
          <th scope="col">{{ $t("Name") }}</th>
          <th scope="col">{{ $t("Price") }}</th>
          <th scope="col">{{ $t("Time") }}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="(purchases,index) in filteredPro" :key="purchases.id">
        <tr


           :title="
            purchases.price > HIGH_PRICE_MAIN
              ? 'expensive' 
               : purchases.price >= MED_PRICE_MAIN &&  purchases.price <= HIGH_PRICE_MAIN
              ? 'moderate'
              : 'normal' 
          "
          :class="
          purchases.price > HIGH_PRICE_MAIN   ? 'expensiveRow' :
           purchases.price >= MED_PRICE_MAIN
           && purchases.price <= HIGH_PRICE_MAIN
              ? 'moderateRow'
              : 'normalRow'  
          "
        >
          <th scope="row">{{purchases.numOfPur}}</th>
          <td>{{ purchases.name }}</td>
          <td>{{ purchases.price }} {{ $t("som") }}</td>
          <td>{{ purchases.dateInput | moment }}
            <button @click="addToFav(purchases)">
              <svg
                v-show="!purchases.isFavourite"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-star"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                />
              </svg>
              <svg
                v-show="purchases.isFavourite"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                />
              </svg>
            </button>
          </td>
          <td>
            <a href="#editThisPage" class="btn editBtn" @click="editPurchase(index)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                />
              </svg>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
 </template>
<script>
import moment from "moment";
import i18n from "../plugins/i18n";
import {mapGetters,mapActions} from 'vuex'
export default {
  name: "Purchases",
  methods: {
    ...mapActions(['EDIT_PURCHASE','SET_SORTED_ONES','ADD_TO_FAV','GET_TOTAL_SUM']),
    addToFav(purchase) {
     this.ADD_TO_FAV(purchase)
    },
    moment() {
      return moment();
    },
    editPurchase(index){
      this.EDIT_PURCHASE(index)
      this.GET_TOTAL_SUM()
    },

  },
  filters: {
    moment(date) {
      return i18n.locale === "ru"
        ? moment(date).locale("ru").format("MMMM Do YYYY")
        : moment(date).locale("en").format("MMMM Do YYYY");
    },
  },
  computed:{
    ...mapGetters(['SORTED_PRO','PURCHASES','HIGH_PRICE_MAIN',
    'MED_PRICE_MAIN','LOW_PRICE_MAIN','PAGE','PER_PAGE','IS_ALL_VISIBLE']),
    filteredPro(){
if(this.SORTED_PRO.length && !this.IS_ALL_VISIBLE){
   let page = this.PAGE
    return this.SORTED_PRO.slice( (page - 1) * this.PER_PAGE,
      page * this.PER_PAGE) 
}
  else if (this.IS_ALL_VISIBLE){
    return this.SORTED_PRO
   }
else{
  return []
}

    },
    
  },
 mounted(){
if(this.PURCHASES.length){
 this.SET_SORTED_ONES()
}
  } 
};
</script>

<style  scoped>

.expensiveRow {
  background: #dc3545;
  border: 1px solid #000;
  color: white;
}
.moderateRow {
  border: 1px solid #000;
  background: #ffc107;
}
.normalRow {
  background: #198754;
  border: 1px solid #000;
  color: white;
}

.inputs {
  margin: 5px auto;
  display: block;
  width: 25%;
}
.editBtn {
  color: white;
  border: 1px solid;
}
.editBtn:hover {
  background: #ffffff30;
}

.today_tables {
  max-width: 513px;
  margin: 20px auto;
}
td {
  padding: 7px 3px;
}
tr {
  text-align: center;
}
.show_fav {
  width: 69%;
  text-align: right;
}

#alert_fav {
  margin: 0 auto;
  top: 50%;
  position: absolute;
  left: 0;
  right: 0;
  width: 13%;
  padding: 9px;
}
</style>