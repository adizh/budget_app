


<template>
  <div   v-if="IS_CATEGORY_VISIBLE">
    <pie-chart :data="categoryOptions"></pie-chart>

 <div class='selectType'>
  <p @click='isTypeNameSelected = !isTypeNameSelected' class="select_type">{{ IS_DEFAULT_TYPE_SEL ? $t('typeFilter'):TYPE_SELECTED_FILTER}}</p>
<div :class="isTypeNameSelected ? 'types':''">
<div v-show='isTypeNameSelected'  @click='filterType(type)' v-for='type in  newTypeOptions' :key='type.name'>
  <p>{{type.name}}</p>
</div>
</div>
</div>
<p   v-show="!SORTED_PRO.length" class='no_purchases'>{{$t('Nopurhases')}}</p>

  </div>
</template>


<script>
import {mapGetters,mapActions} from 'vuex'
import i18n from '../plugins/i18n.js'
export default {
  name: "CategoryChart",
  data() {
    return {
isTypeNameSelected:false,
canvas:null,
    };
  },
  methods: {
    ...mapActions(['CAT_VISIBLE','FILTER_TYPE']),
    

  

     
filterType(type){
this.FILTER_TYPE(type)
  this.isTypeNameSelected=false
},

          hideSelect() {
     
      this.isTypeNameSelected = false;
    },
   
  },

                  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true)
        if (this.$store.state.purchases.length) {
          this.CAT_VISIBLE()
    }
 
  },
  destroyed() {
    document.removeEventListener("click", this.hideSelect);
  },
  computed: {
  ...mapGetters(['IS_CATEGORY_VISIBLE','FOOD_SUM','TRANSPORT_SUM','MEDICINE_SUM','INTERNET_SUM',
  'ENTERN_SUM',
  'CREDIT_SUM','IS_DEFAULT_TYPE_SEL','TYPE_SELECTED_FILTER','SORTED_PRO']),

newTypeOptions(){
  let newObj=[]
  for(let i=0;i<this.$t('purchaseType2').length;i++){
newObj.push(this.$t('purchaseType2')[i])
  }
 
if(i18n.locale ===  'en'){
newObj.unshift({name:'All'})
}else{
newObj.unshift({name:'Все'})
}

return newObj
},


   
    categoryOptions() {
     

      

       let catObj={}
  
   
       if(i18n.locale ==='en'){
      catObj = {
        Food: this.FOOD_SUM,
        Internet: this.INTERNET_SUM,
        Medicine: this.MEDICINE_SUM,
        Transport: this.TRANSPORT_SUM,
        Credit:this.CREDIT_SUM,
        Entertainment: this.ENTERN_SUM,
      }
    }else if(i18n.locale ==='ru'){
          catObj = {
        Еда: this.FOOD_SUM,
        Интернет: this.INTERNET_SUM,
        Медицина: this.MEDICINE_SUM,
        Транспорт: this.TRANSPORT_SUM,
        Кредит:this.CREDIT_SUM,
        Другое: this.ENTERN_SUM,
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
width: 86%;
    padding: 6px;
    font-size: 22px;
  }
  .types{
    width: 97%;
    max-height:130px;
    
    
  }
}
</style>