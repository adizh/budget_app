<template>
<section>
      <div  @click="areOptionVisible = !areOptionVisible" id="range_date" >
      <p class='month_select'>{{ selectedMonth }}</p>
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
<!-- <p>{{width}}</p> -->
      <button class="btn btn-success clear_btn"  style='display:block; margin: 10px auto' @click="clearDate">clear</button>
      </section>
</template>

<script>
    export default {
        name:"CalendarRange",
        data(){
            return{
              width: window.innerWidth,
                areOptionVisible:false,
                 range: {
        start: new Date(2020, 0, 1),
        end: new Date(2020, 0, 5),
      },
            }
        },
        props:{
            selectedMonth:{
                type:String
            },
        },
        methods: {
            selectMonth(option){
                this.$emit('selectMonth',option)
            },hideSelect() {
      this.areOptionVisible = false;
    },
      clearDate() {
this.$emit('clearDate')
    },
     onResize() {
      this.width = window.innerWidth;
      
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
  }
  .clear_btn{
    padding: 12px 26px;
    font-size: 21px;
  }
}
</style>