import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    loading: false,
    sending: false,
    error: 'Relax! This is just a drill error message',
    user: {
      username: 'rparelkar',
      name: 'Rahul Parelkar'
    },
    reconnect: false,
    activeRoom: {
      id: '124'
    },
    rooms: [
      {
        id: '123',
        name: 'Rog'
      },
      {
        id: '124',
        name: 'Prem'
      }
    ],
    users: [
      {
        username: 'kdesai',
        name: 'Kimaya Desai',
        presence: 'online'
      },
      {
        username: 'rparelkar',
        name: 'Rahul Parelkar',
        presence: 'online'
      }
    ],
    messages: [
      {
        username: 'kdesai',
        date: '11/12/2020',
        text: 'Rahul, please marry me'
      },
      {
        username: 'rparelkar',
        date: '12/12/2020',
        text: 'Is this a hokar?'
      },
      {
        username: 'kdesai',
        date: '11/12/2020',
        text: 'yes Rahul muah muah muah'
      },
    ],
    userTyping: null
  },
  mutations,
  actions,
  getters: {
    hasError: state => state.error ? true : false
  },
  plugins: [vuexLocal.plugin],
  strict: debug
})
