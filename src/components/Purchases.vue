<template>
  <div class="expenses" v-show="filteredPro.length">
    <table class="table table-bordered border-primary today_tables">
      <thead>
        <tr class="rows_table">
          <th scope="col">#</th>
          <th scope="col">{{ $t("Name") }}</th>
          <th scope="col">{{ $t("Price") }}</th>
          <th scope="col">{{ $t("Time") }}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="(todo, index) in filteredPro" :key="todo.id">
        <tr
          :title="
            todo.price > 100
              ? 'expensive'
              : todo.price >= 50 && todo.price < 100
              ? 'moderate'
              : 'normal'
          "
          :class="
            todo.price > 100
              ? 'expensiveRow'
              : todo.price >= 50 && todo.price <= 100
              ? 'moderateRow'
              : 'normalRow'
          "
        >
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ todo.name }}</td>
          <td>{{ todo.price }} {{ $t("som") }}</td>
          <td>
            {{ todo.dateInput | moment }}
            <button @click="addToFav(todo)">
              <svg
                v-show="!todo.isFavourite"
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
                v-show="todo.isFavourite"
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
            <button class="btn editBtn" @click="editTodo(index)">
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
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
import i18n from "../plugins/i18n";
export default {
  name: "Purchases",
  props: {
    editName: {
      type: Boolean,
    },
    favourites: {
      type: Array,
    },
    arePurchasesVisible: {
      type: Boolean,
    },
    sortedPro: {
      type: Array,
    },
    filteredPro: Array,
  },
  methods: {
    addToFav(todo) {
      this.$emit("addToFav", todo);
    },
    moment() {
      return moment();
    },
    editTodo(index) {
      this.$emit("editTodo", index);
    },
  },
  filters: {
    moment(date) {
      return i18n.locale === "ru"
        ? moment(date).locale("ru").format("MMMM Do YYYY")
        : moment(date).locale("en").format("MMMM Do YYYY");
    },
  },
  computed: {
    beforeM() {
      let sm = [];
      if (this.purchases.length) {
        sm = this.purchases;
      }
      return sm;
    },
  },

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