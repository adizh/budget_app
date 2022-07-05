
<template>
<section>
  <div  @click="areOptionVisible = !areOptionVisible" id="range_date">
<p class='month_select'>{{  isDateSelected ? SELECTED_MONTH_CALENDAR :  $t('selectedMonth2') }}</p>
      <v-date-picker
        mode="date"
        id="date_picker"
        @input="selectMonth"
        v-show="areOptionVisible"
        v-model="range"
        is-range
        color="gray"
        is-dark
      />
  </div>
    <button class="btn btn-success clear_btn"  style='display:block; margin: 10px auto' @click="clearDate">{{$t('clearData')}}</button>

</section>

</template>

<script>
import i18n from "../plugins/i18n"
import {mapGetters,mapActions} from 'vuex'
    export default {
        name:"CalendarRange",
        data(){
            return{
                areOptionVisible:false,
                isDateSelected:false,
                 range: {
        start: new Date(2020, 0, 1),
        end: new Date(2020, 0, 5),
      },
            }
        },
        methods: {
            ...mapActions(['SELECT_MONTH','CLEAR_DATE']),
            selectMonth(option){
                this.isDateSelected = true;
this.SELECT_MONTH(option)
            },
            hideSelect() {
      this.areOptionVisible = false;
    },
      clearDate() {
this.CLEAR_DATE(i18n)
    },
        },
         created() {
    window.addEventListener("resize", this.onResize);
  },
      mounted(){
             document.addEventListener("click", this.hideSelect.bind(this), true);
        } ,
      destroyed() {
       document.removeEventListener("click", this.hideSelect);
         window.removeEventListener("resize", this.onResize);
  },
  computed:{
...mapGetters(['SELECTED_MONTH_CALENDAR'])
  }
    }
</script>

<style  scoped>
#range_date{
    margin: 20px auto;
    width: 17%;
}
.month_select{
    padding: 8px;
    background: #1a202c;
    text-align: center;
    border-radius: 15px;
    color: white;
}

@media (min-width:250px) and (max-width: 450px){
  #range_date{
       width: 43%;
  }  .clear_btn{
    padding: 2px 19px;
    font-size: 16px;
  }
}
</style>