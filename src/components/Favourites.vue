<template>
    <div>
  
<!-- Button trigger modal -->
 <div class='show_fav'>
<button type="button" class="btn btn-primary show_fav" data-toggle="modal" data-target="#exampleModal">
    show favourites
</button>
 </div>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Favourites</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
  <table class="table table-bordered border-primary today_tables">

        <tbody v-for="(todo, index) in purchases " :key="todo.id">
          <tr v-show="todo.isFavourite"
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
            <td >{{todo.name}}</td>
            <td>{{ todo.price }} сом</td>
            <td>{{ todo.dateInput | moment }}    
       </td>
          </tr>
        </tbody>
      </table>









      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script>
import moment from 'moment'
    export default {
        name:'Favourites',
        components:{
             
        },
             filters: {
    moment(date) {
      return moment(date).format("MMMM Do YYYY");
    },
    
  },
        data(){
            return{

            }
        },
        methods:{
        moment() {
      return moment();
    },
        },
        props:{
           
            purchases:{
              type:Array,
            }
        }
    }
</script>

<style  scoped>
.show_fav{
    text-align:right;
    width:68%;
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
.editBtn{
  color: white;
    border: 1px solid;
}
.editBtn:hover{
  background:#ffffff30
}

.today_tables {
  max-width: 400px;
  margin: 20px auto;
}
td {
  padding: 7px 3px;
}
tr{
    text-align: center;
}
.show_fav{
text-align: right;
    width: 25%;
    margin: 0 auto;
}
.show_fav button{
  width:52%
}
.expenses{
  position:relative;
}
#alert_fav{
    margin: 0 auto;
    top: 50%;
    position: absolute;
    left: 0;
    right: 0;
    width: 13%;
    padding: 9px;
}
.show_fav{
  color:white;
}
@media (min-width:250px) and (max-width: 450px){
  .show_fav{
    font-size:21px;
     margin: 10px auto;
    width: 56%;
  }
  .show_fav button{
    width:100%;
    text-align:center;
  }

}
</style>