<template>
  <div>
    <FormMode  
  
      />

  </div>
</template>

<script>
import FormMode from "./components/FormMode.vue";



export default {
  data() {
    return {
      name: "App",
      
 
    };
  },
  components: {
    FormMode,
    
    
  },
 
  
 
};
</script>

<style  scoped>
@media (min-width:250px) and (max-width: 450px){
  *{
    font-size: 20px;
  }
}
</style>