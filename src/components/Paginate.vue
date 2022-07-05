<template>
 <div>
   <div class='show_all'>
      <button class='btn btn-warning show_all_btn'  @click='showALL'>
 {{ !IS_ALL_VISIBLE ? $t('showAll') : $t('hideAll')}}
  </button>
  </div> 
<div class='paganate'>

     <b-pagination
      v-model="page"
      :total-rows="rows"
      :per-page="PER_PAGE"
        first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
      pills 
    ></b-pagination> 
</div>
    </div>
</template>

<script>
import {mapGetters,mapActions}from 'vuex'
    export default {
        name:'Paginate',
        components:{},
        data(){
            return{
          
            }
        },
          methods: {
            ...mapActions(['SHOW_ALL']),
   showALL(){
    this.SHOW_ALL()
     
  
    },
          },
    computed:{
      ...mapGetters(['PER_PAGE','PAGE','PURCHASES','IS_ALL_VISIBLE']),
rows(){
return this.PURCHASES.length
},

   page:{
                get () {
      return this.$store.state.page
    },
                set (value) {
      this.$store.commit('updatePageNum', value)
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
.show_all{
  margin: 20px 0 10px;
}
.paganate {
  display:flex;
  justify-content: center;
  margin: 20px 0;
}
</style>