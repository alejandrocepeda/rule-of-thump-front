import Vue from 'vue'
import Vuex from 'vuex'
import Service from '@/services'
import AuthService from '@/services/auth'
import createPersistedState  from  'vuex-persistedstate'
import SecureLS from "secure-ls"
const ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

const state = {
  posts:[],
  _openModal: false,  
  isLogged: false,
  authUser:null,
  authToken:null,
}

const actions = {
  AuthBasic({ commit, state }, payload){
      const { username,password } = payload
      
      return new Promise((resolve, reject) => {
          
          AuthService
          .Auth()
          .Basic(username,password)
          .then(response => {
              commit('SET_IS_LOGGED',true)
              commit('SET_USER_AUTH',response.data.user)
              commit('SET_AUTH_TOKEN',response.data.token)

              window.axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
              resolve(response.data)  
          })                      
          .catch(err => {
              reject(err)
          })
      
      })
  },
  logOut({ commit } ){        
    commit('SET_IS_LOGGED',false)
    commit('SET_USER_AUTH',null)    
    commit('SET_AUTH_TOKEN',null)        
    
    window.axios.defaults.headers.common['Authorization'] = ''
  },
  async getPosts({ commit }){
        
    return new Promise((resolve, reject) => {
        Service.Posts().getAll().then((response) => {    
          
            
            commit('SET_POSTS',response.data.data)
            resolve(response.data.data)
        })
        .catch(error => {
            reject(error)
        })
    })
  },
  async setUser({ commit },payload){
    return new Promise((resolve, reject) => {
      
      Service.Users().update(payload.id,payload).then((response)=>{

          
          resolve(response.data.data)
      })
      .catch(error => {
          reject(error)
      })
    })  
  },
  async setPost({ commit },payload){
    return new Promise((resolve, reject) => {
      
      Service.Posts().update(payload.id,payload).then((response)=>{

          
          resolve(response.data)
      })
      .catch(error => {
          reject(error)
      })
    })  
  },
  async getPost({ commit },payload){
        
    return new Promise((resolve, reject) => {
        Service.Posts().getOne(payload).then((response) => {    
          
            resolve(response.data)
        })
        .catch(error => {
            reject(error)
        })
    })
  },
  async getUser({ commit },payload){
    return new Promise((resolve, reject) => {

      
      Service.Users().getOne(payload).then((response)=>{
        
          resolve(response.data)
      })
      .catch(error => {
          reject(error)
      })
    })  
  },
  async addUser({ commit },payload){
    return new Promise((resolve, reject) => {
      
      Service.Users().store(payload).then((response)=>{
          resolve(response.data.data)
      })
      .catch(error => {
          reject(error)
      })
    })  
  },
}

const mutations = {
  SET_POSTS(state, data){
    state.posts = data
  },
  SET_OPEN_MODAL(state, data){
    state._openModal = data
  },  
  SET_IS_LOGGED(state, data){
    state.isLogged = data
  },
  SET_USER_AUTH(state, user){
    state.authUser = user
  },
  SET_AUTH_TOKEN(state,token){
    state.authToken = token
},
}

export const store = new Vuex.Store({    
  state,
  actions,
  mutations,
  plugins: [
    createPersistedState({
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        },
    })
]
})

