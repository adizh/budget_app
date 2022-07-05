<template>
    <div>
        <form @submit.prevent="addPurchases" class="main_form" id='editThisPage'>
           <label for="name"
        >{{ $t("Name") }}
        <input
          required
          id="name"
          class="form-control inputs"
          type="text"
          v-model="nameInput"
        
        />
      </label>
 <p
        class="alert alert-danger err alerts_dan"
        role="alert"
        v-if="IS_NAME_SMALL"
      >
        {{ $t("NameProblem") }}
      </p>

        <label for="price" name="price"
        >{{ $t("Price") }}
        <input
          required
          id="price"
          class="form-control inputs"
          type="number"
          v-model="numberInput"
        />
      </label>

  <p
        class="alert alert-danger err alerts_dan"
        role="alert"
        v-if="IS_PRICE_NEG"
      >
        {{ $t("PriceProblem") }}
      </p>
         <label for="date">
        {{ $t("Time") }}
        <input
          required
          class="form-control inputs"
          v-model="dateNow"
          type="date"
          name="date"
          id="date"
        />
      </label>
        <div class="typesArea">
        <button
          @click="areTypesVisible = !areTypesVisible"
          class="btn btn-info selBtn"
          type="button"
        >
    {{ IS_TYPE_SEL ? $t("typeSelect") : typeSelection }}  
        </button>
        <div class="types">
     
            <ul
             v-show="areTypesVisible "
            v-for="types in PURCHASE_TYPES"
            :key="types.name"
           @click="selectTypeOfPurchase(types)"
          >
            <li>{{ types.name }}</li>
          </ul>

       </div>
          <p
        class="alert alert-danger err alerts_dan"
        role="alert"
        v-if="IS_TYPE_SELEC"
      >
        {{ $t("TypeProblem") }}
      </p>


           <button
        v-if="!EDIT_NAME"
        :disabled="nameInput.length && numberInput.length  && dateNow.length ? false : true"
        class="btn btn-primary addBtn"
        type="submit"
      >
        {{ $t("default") }}
      </button>
      <button
        
        class="btn btn-primary addBtn"
        type="submit"
        v-else
      >
        {{ $t("updatedVersion") }}
      </button>
      </div>
        </form>
 

<div id="myModal" :class='PRICE_ACC_MED ? "modal_show" :"modal"'>
  <div class="modal-content">
    <span class="close" @click='closeThePrice'>&times;</span>
      <div
      v-if="PRICE_ACC_MED"
      class="alert alert-danger d-flex align-items-center "
      role="alert"   
      id='alert_med_price'
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
      <div>{{ $t("accText") }} {{PER_DAY_MED }} {{ $t('som')}}</div>
      <a class="btn btn-danger" href="#budgetInfo" @click="changePerDayMed">
        {{ $t("Changetheplan") }}
      </a>
    </div>
  </div>

</div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
    export default {
        name:'CreatePurchase',
        data(){
            return{
areTypesVisible:false,
isNewOneAdded:false,
            }
        },
        methods:{
             ...mapActions(['SELECT_TYPE_PUR','ADD_PURCHASES',
             'CLOSE_PRICE_WARN',
             'GET_TOTAL_SUM','CHANGE_PER_DAY']), 
          selectTypeOfPurchase(type){
            this.areTypesVisible = false;
            this.SELECT_TYPE_PUR(type)
          },
          addPurchases(){
            this.ADD_PURCHASES()
            this.GET_TOTAL_SUM()
            console.log(this.$store.state.purchases)
          },
          changePerDayMed(){
            this.CHANGE_PER_DAY()
            
          },
          closeThePrice(){
            this.CLOSE_PRICE_WARN()
          },
       
        },
        computed:{
            ...mapGetters(['IS_TYPE_SEL','SELECTED_TYPE_ADD',
            'IS_NAME_SMALL','IS_PRICE_NEG','IS_TYPE_SELEC','EDIT_NAME',
            'PRICE_ACC_MED','PER_DAY_MED','PURCHASE_TYPES'
            ]),
            newTypeOptions(){
              let obj=[{  name:'Food'}]
                return obj
            },
typeSelection(){
    return this.SELECTED_TYPE_ADD
},

            nameInput:{
                get () {
      return this.$store.state.nameInput
    },
                set (value) {
      this.$store.commit('updateNameInput', value)
    }
            },
                
              numberInput:{
                get () {
      return this.$store.state.numberInput
    },
    set (value) {
      this.$store.commit('updateNumberInput', value)
    }
            },
              dateNow:{
                get () {
      return this.$store.state.dateNow
    },
    set (value) {
      this.$store.commit('updateDateInput', value)
    }
            },
        },
      
    }
</script>

<style  scoped>
.show_all_btn{
  color:white;
}
.show_all_btn:hover{
  color:white
}
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.modal_show{
  display:block;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4);
}
/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
 padding: 1px 10px 32px 12px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  text-align:right

}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.show_all{
  margin: 20px 0 10px;
}
.main_form {
  margin: 20px auto;
  display: flex;
  flex-direction: column;
}
.customPagination > li > span .page-link {
  color: red;
}

.customPagination > li.active > button,
.customPagination > li > button:hover
{
  color: white;
  background-color: red!important;
}

.dark_theme {
  color: white;
}
.light_theme {
  color: #000000;
}
.typesArea {
  margin: 10px auto;
}
.alerts_dan {
  width: 70%;
  margin: 0 auto;
}
.types {
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 11px auto;
  color: #000;
  background: #25cff2;
  border-radius: 4px;
}
.selBtn {
  width: 100%;
  display: block;
}
ul {
  margin: 2px 8px;
}
.inputs {
  margin: 5px auto;
  display: block;
  width: 25%;
}
label {
  text-align: center;
}
ul {
  display: flex;
}
li {
  list-style: none;
  display: block;
}
.addBtn {
  min-width: 10%;
  margin: 10px auto;
}
.paganate {
  display:flex;
  justify-content: center;
  margin: 20px 0;
}
#alert_med_price{
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px auto;
}
@media (min-width: 250px) and (max-width: 450px) {
  #alert_med_price {
    padding-bottom: 21px;
    flex-direction: column;
    width:100%;
    gap: 2px;
  }
  #alert_med_price div {
    margin-top: -15px;
    padding-bottom: 10px;
  }
  .inputs {
    width: 80%;
  }
  .modal-content{
width:100%;

  }
}
</style>