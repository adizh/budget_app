<template>
   <div class="filterByPrice">
      <p @click="arePricesVisible = !arePricesVisible">{{priceName}}</p>
      <div
        v-show="arePricesVisible"
        v-for="price in pricesOption"
        :key="price.name"
         @click="selectPrice(price)"
      >
        <p class='price_option'>{{ price.name }}</p>
      </div>
    </div>
</template>

<script>
    export default {
        name:'PriceFilter',
       data(){
           return{
                arePricesVisible:false,
        pricesOption:[{name:'All'},{ name: "High" }, { name: "Moderate" }, { name: "Low" }],
        priceName:'Filter by price'
           }
       },
       props:{
        sortedPro:{
            type:Array,
        }
       },
       computed: {

       },
       methods:{
           selectPrice(price){
               this.priceName=price.name
           this.$emit('selectPrice',price)
           },
             hideSelect() {
     
      this.arePricesVisible = false;
    },
       },
                mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
   
  },
  destroyed() {
    document.removeEventListener("click", this.hideSelect);
  },
    }
</script>

<style  scoped>
.filterByPrice{
    background: burlywood;
    margin: 10px auto;
    width: 31%;
    border-radius: 5px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.price_option{
     padding: 4px;
}
.price_option:hover{
    display: inline-block;
    border-radius: 4px;
    width: 100%;
    background: aliceblue;
    
}
@media (min-width:250px) and (max-width: 450px){
  .filterByPrice{
    width:80%;
  }
}
</style>