import Vue from "vue";
import axios from "axios";


Vue.use({
    install(Vue){
       
        Vue.prototype.$http = axios.create({
            baseURL: 'https://lojapreco-b1990-default-rtdb.firebaseio.com/',
            headers: {
                get:{
                "Authorization": "abc123"
            }
          }
        
        }
        )}
})
