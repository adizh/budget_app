<template>
  <div>

    <div class="show_fav">
      <button
        type="button"
        class="btn btn-primary show_fav"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        {{ $t("showfavourites") }}
      </button>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ $t("showfavourites") }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table table-bordered border-primary today_tables">
              <tbody v-for="(purchase, index) in PURCHASES" :key="purchase.id">
                <tr
                  v-show="purchase.isFavourite"

                     :title="
            purchase.price > HIGH_PRICE_MAIN
              ? 'expensive' 
               : purchase.price >= MED_PRICE_MAIN &&  purchase.price <= HIGH_PRICE_MAIN
              ? 'moderate'
              : 'normal' 
          "
          :class="
          purchase.price > HIGH_PRICE_MAIN   ? 'expensiveRow' :
           purchase.price >= MED_PRICE_MAIN
           && purchase.price <= HIGH_PRICE_MAIN
              ? 'moderateRow'
              : 'normalRow'  
          "
                 
               
                >
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ purchase.name }}</td>
                  <td>{{ purchase.price }} {{ $t("som") }}</td>
                  <td>{{ purchase.dateInput | moment }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              {{ $t("Close") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from "../plugins/i18n";
import moment from "moment";
import {mapGetters} from 'vuex'
export default {
  name: "Favourites",
  filters: {
    moment(date) {
      return i18n.locale === "ru"
        ? moment(date).locale("ru").format("MMMM Do YYYY")
        : moment(date).locale("en").format("MMMM Do YYYY");
    },
  },

  methods: {
    moment() {
      return moment();
    },
  },
 computed: {
  ...mapGetters(['PURCHASES','HIGH_PRICE_MAIN',
    'MED_PRICE_MAIN','LOW_PRICE_MAIN'])
 }
};
</script>

<style  scoped>
.show_fav {
  text-align: center;
  width: 68%;
}

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
  max-width: 400px;
  margin: 20px auto;
}
td {
  padding: 7px 3px;
}
tr {
  text-align: center;
}
.show_fav {
  text-align: right;
  width: 25%;
  margin: 0 auto;
}
.show_fav button {
  width: 74%;
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
.show_fav {
  color: white;
}
@media (min-width: 250px) and (max-width: 450px) {
  .show_fav {
    font-size: 21px;
    margin: 10px auto;
    width: 56%;
  }
  .show_fav button {
    width: 100%;
    text-align: center;
  }
}
</style>