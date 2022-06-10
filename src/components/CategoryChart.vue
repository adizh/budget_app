<template>
  <div   v-if="isCatVisible">
    <pie-chart :data="categoryOptions"></pie-chart>

<div class='selectType'>
  <p @click='isTypeNameSelected = !isTypeNameSelected' class="select_type">{{ isDefault ? $t('typeFilter'):typeSelected}}</p>
<div :class="isTypeNameSelected ? 'types':''">
<div v-show='isTypeNameSelected'  @click='filterType(type)' v-for='type in  newTypeOptions' :key='type.name'>
  <p>{{type.name}}</p>
</div>
</div>
</div>
<p   v-show="!this.sortedPro.length" class='no_purchases'>no  purchases were found  with this type</p>

  </div>
</template>

<script>
import i18n from '../plugins/i18n.js'
export default {
  name: "CategoryChart",
  data() {
    return {
isTypeNameSelected:false,
   
    };
  },
  props: {
    purchaseType2: Array,
    isCatVisible: Boolean,
    typeSelected:String,
    purchases:Array,
    sortedPro:Array,
    isDefault:Boolean
  },
  methods: {
filterType(type){

  this.$emit('filterType',type)
  this.isTypeNameSelected=false
  console.log('types',type)
  console.log('sortedPro',this.sortedPro)
},
          hideSelect() {
     
      this.isTypeNameSelected = false;
    },
   
  },

                  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
 



   
  },
  destroyed() {
    document.removeEventListener("click", this.hideSelect);
  },
  computed: {
  

newTypeOptions(){
  let newObj=[]
  for(let i=0;i<this.purchaseType2.length;i++){
newObj.push(this.purchaseType2[i])
  }
if(i18n.locale==='en'){
newObj.unshift({name:'All'})
}else{
newObj.unshift({name:'Все'})
}

  
  return newObj
},

    foodSum() {
      let count = [];
      this.purchases.map((e) => {
        if (e.types === "Food") {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => acc + rec, 0);
      return count
    },

    transportSum() {
      let count = [];
      this.purchases.map((e) => {
        if (e.types === "Transport") {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => acc + rec, 0);
      return count;
    },

    medicintSum() {
      let count = [];
      this.purchases.map((e) => {
        if (e.types === "Medicine") {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => acc + rec, 0);
      return count;
    },
    internSum() {
      let count = [];
      this.purchases.map((e) => {
        if (e.types === "Internet") {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => acc + rec, 0);
      return count;
    },

    entertainSum() {
      let count = [];
      this.purchases.map((e) => {
        if (e.types === "Entertainment") {
          count.push(e.price);
        }
      });
      count = count.reduce((acc, rec) => acc + rec, 0);
      return count;
    },

    categoryOptions() {
      let catObj={}
      if(i18n.locale ==='en'){
      catObj = {
        Food: this.foodSum,
        Internet: this.internSum,
        Medicine: this.medicintSum,
        Transport: this.transportSum,
        Entertainment: this.entertainSum,
      }

    }else{
          catObj = {
        Еда: this.foodSum,
        Интернет: this.internSum,
        Медицина: this.medicintSum,
        Транспорт: this.transportSum,
        Другое: this.entertainSum,
      }
    }
    return catObj
  },
  }
};
</script>

<style  scoped>
.select_type{
  text-align: center;
    background: cornflowerblue;
    padding: 6px;
    border-radius: 9px;
    width: 24%;
    margin: 45px auto 14px;
    color: white
}
.types{
      width: 36%;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 105px;
    color:white;
    text-align:center;
    margin: 10px auto;
    padding:6px;
    border-radius:7px;
     background: cornflowerblue;

}
.no_purchases{
  text-align:center;
  font-weight:300;
}
.types div p:hover{
  opacity:.8;
  cursor:pointer;
}
@media (min-width:250px) and (max-width: 450px){
  .selectType{
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .select_type{
width: 56%;
    padding: 13px;
    font-size: 22px;
  }
  .types{
    width: 97%;
    max-height:130px;
    
    
  }
}
</style>