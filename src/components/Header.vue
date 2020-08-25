<template>
    <header class="position-relative">

        
        
        <div class="overlay-gradient position-absolute"></div>
        
        <div class="header p-5">
            
            <div class="container">
                
                
              
                <div class="row mb-5">
                    <div style="z-index: 2;" class="col-5 float-left pl-0">
                       
                        <router-link :to="{name:'home'}"><h2 class="text-white">Rule of Thump.</h2></router-link>
                    </div>
    
                    <div style="z-index: 2;" class="col-7 float-right pr-0">
                        
                        <div class="form-inline float-right">
                            <router-link :to="{name:'past-trials'}"><h5 class="ml-5 text-white">{{ $t('Past Trials')}}</h5></router-link>
                            <router-link :to="{name:'how-it-works'}"><h5 class="ml-5 text-white">{{ $t('How it Works')}}</h5></router-link>

                            <a class="cursor-pointer">

                                
                                <h5 v-show="isLogged" class="ml-5 text-white"> <span @click="logOut()">log Out</span></h5>

                                <h5 v-show="!isLogged" class="ml-5 text-white"> <span class="mr-2" @click="openLogin()">Log In</span> / <span class="ml-2" @click="openSignUp()">Sign Up</span> </h5>
                                
                            </a>
                            
                            
                            
                            <a href="">
                                <h5 class="ml-5 text-white">
                                    <i class="mdi mdi-28px mdi-magnify"></i>
                                </h5>
                            </a>
                        </div>                          
                    </div>                   

                    <HeaderPostVote/>
                </div>          
            </div> 

            
            <div style="left:0;right:0; bottom:0; !important;" class="row position-absolute">
                
                <div style="background: #000;opacity: 0.5;" class="col-4 p-2 text-right">
                    <small class="text-white">{{ $t('CLOSING IN')}}</small>
                </div>
                <div style="background: rgb(255 255 255);opacity: 0.5;" class="col-8 p-2 text-left">
                    <span style="color:#000" > <span class="font-weight-bold">22</span> {{ $t('days')}}</span>
                </div>
                
            </div>
        </div>

        
        <Modal v-show="_openModal">
           

            <template slot="top">      
                <button style="right:0;z-index: 5;"  type="button" @click="closeModal()" class="close float-right" aria-label="close">
                    <i class="mdi mdi-28px mdi-close"></i>
                </button> 
            </template>

            <div slot="body">        

                
                <Login v-show="_showLogIn"/>
                <Register v-show="_showSignUp"/>
                

               
            </div>

             
            
        </Modal>
    
       

    </header>

</template>

<script>
import HeaderPostVote from '@/components/HeaderPostVote'
import Modal from '@/components/Modal'
import Login from '@/pages/app/auth'
import Register from '@/pages/app/auth/register'
import { mapState } from 'vuex'


export default {
    components:{
        HeaderPostVote,Modal,Login,Register
    },
    name: 'header',   
    data(){
        return {
            _showSignUp:false,
            _showLogIn:false
        }
    },
    computed:{
        ...mapState(['posts','_openModal','isLogged','authUser'])
    },    
    methods:{
        closeModal(){
            this.$store.commit('SET_OPEN_MODAL', false)
        },
        openLogin(){            
            this._showLogIn = true
            this._showSignUp = false
            this.$store.commit('SET_OPEN_MODAL', true)
        },
        logOut(){
            this.$store.dispatch('logOut')
            
        },
        openSignUp(){            
            this._showSignUp = true
            this._showLogIn = false

            this.$store.commit('SET_OPEN_MODAL', true)
        }
    }
}

</script>


