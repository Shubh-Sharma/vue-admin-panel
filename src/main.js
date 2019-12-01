import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as netlifyIdentityWidget from 'netlify-identity-widget';
import GoTrue from "gotrue-js";

// Initialize Netlify Identity
netlifyIdentityWidget.init();

// Initialize GoTrue JS for Netlify
export const auth = new GoTrue({
  APIUrl: "https://jadmin.netlify.com/.netlify/identity",
  setCookie: true
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
