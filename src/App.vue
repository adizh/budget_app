

<template>
    <div id="app">
        <div class="section container">

            <div class="columns ">
              
                <div class="column">
                    <!-- theme switcher -->
                    <input type="checkbox" id='theme-switch' class='theme-switch' v-model="darkMode"/>
                    <label for='theme-switch'>
                        <span v-if="darkMode === true">
                           

                           <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="yellow" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
</svg>
                        </span>
                        <span v-else>
                            

                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="darkblue" class="bi bi-moon-fill" viewBox="0 0 16 16">
  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
</svg>
                        </span>
                    </label>
                </div>
            </div>

            <section >
<!--                   <v-google-translate
      :defaultLanguageCode="defaultLanguageCode"
      @select="languageSelectedHandler"
      style='width:13%'
      class="translator_comp"
      ref='lang'
    />  -->
<div>
    <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
        <flag :iso="entry.flag" v-bind:squared=false /> <span  class="lan_title">{{entry.title}}</span>
    </button>
</div>
   
             <FormMode :languages='languages'/> 
            </section>
        </div>
    </div>
</template>
<script>

import FormMode from "./components/FormMode"
import i18n from './plugins/i18n.js';
    export default {
        name: 'app',
          components:{
FormMode         
        },
        data() {
            return {
                darkMode: false,
             lan:'',
              languages: [
            { flag: 'us', language: 'en', title: 'English' },
            { flag: 'ru', language: 'ru', title: 'Russian' }
        ]           
            }
        },
      methods:{
          saveLan(){
                  localStorage.lan = this.lan;
          },

        changeLocale(locale) {
        i18n.locale = locale;
 this.lan = i18n.locale;
this.saveLan()
    }
      },
        mounted() {
              if (localStorage.lan) {
      i18n.locale = localStorage.lan;
    }
            let bodyElement = document.body;
            bodyElement.classList.add("app-background");
            let htmlElement = document.documentElement;
            let theme = localStorage.getItem("theme");
            if (theme === 'dark') {
                htmlElement.setAttribute('theme', 'dark')
                this.darkMode = true
            } else {
                htmlElement.setAttribute('theme', 'light');
                this.darkMode = false
            }
        },
        computed:{
            defaultLanguageCode(){
                return  this.lan
            } 
        },
        watch: {
            darkMode: function () {
                let htmlElement = document.documentElement;
                if (this.darkMode) {
                    localStorage.setItem("theme", 'dark');
                    htmlElement.setAttribute('theme', 'dark');
                } else {
                    localStorage.setItem("theme", 'light');
                    htmlElement.setAttribute('theme', 'light');
                }
            }
        },
      
    }
</script>
*c6
12
<style>
.columns{
    position:relative;
}
.column{
    position:absolute;
    top:12px;
    right:12%;
}

@media (min-width: 250px) and (max-width: 450px){
.column{
    right:30px;
    top:5px;
}
}
    </style>