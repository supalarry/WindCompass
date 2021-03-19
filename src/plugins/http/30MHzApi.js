import Axios from 'axios';
import Vue from 'vue';

const api = Axios.create({
  baseURL: process.env.VUE_APP_30MHZ_API_URL,
});

api.defaults.headers.common.Authorization = `Bearer ${process.env.VUE_APP_30MHZ_API_KEY}`;

export default {
  install() {
    Vue.prototype.$http30MHz = api;
  },
};
