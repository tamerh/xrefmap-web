// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Notifications from 'vue-notification'
import VueScrollTo from 'vue-scrollto'

Vue.config.productionTip = false

import Fetch from './data/Fetch.js'
import Model from './data/Model.js'
import XrefConf from './conf/DomainConf.js'
import AppConf from './conf/AppConf.js'

Vue.use(Notifications)
Vue.use(VueScrollTo, {
     container: "body",
     duration: 500,
     easing: "ease",
     offset: -50,
     cancelable: true,
     onStart: false,
     onDone: false,
     onCancel: false,
     x: false,
     y: true
 })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
      return {
         fetcher:null,
         xref_conf:null,
         model:null,
         app_conf:null,
      }
  },
  components: { App },
  template: '<App/>',
  beforeMount () {
      this.fetcher = new Fetch()
      this.xref_conf= XrefConf;
      this.app_conf= AppConf;
      this.model= new Model(this.xref_conf,this.app_conf);
  }
})
