<template>
    <div>
        <div class="align-items-center auth-login">
            <h3 class="text-center page-title">Update Profile</h3>  
            <div class="row w-100 mx-auto">
                        
                <div class="col-md-12 mx-auto p-5">
                            
                    <div class="auto-form-wrapper"> 
                            
                        <div class="form-group">    
                            
                            <label >Full Name</label>  
                            <input class="form-control input-border" v-model="form.name" type="text" placeholder="Full name">
                            <span v-if="errors.name" class="text-danger  small">{{ errors.name }}</span>
                        </div>

                        <div class="form-group">                                   
                            <label>Email Address</label>  
                            <input class="form-control input-border" v-model="form.email" type="email" placeholder="Email address">
                            <span v-if="errors.email" class="text-danger small">{{ errors.email }}</span>
                        </div>

                        <div class="form-group">                                    
                            <label>Years Old</label>                                  
                            <input class="form-control input-border" v-model="form.years_old" type="number" placeholder="Years_old">
                            <span v-if="errors.email" class="text-danger  small">{{ errors.years_old }}</span>
                        </div>

                        <div class="form-group">                                    
                            
                            <b-form-checkbox v-model="form.married" switch size="lg">
                                <span class="form-inline" style="cursor:pointer; font-size:18px">{{ $t("Married")}}</span>
                            </b-form-checkbox>
                        </div>

                        <div class="form-group">
                            <label>Password</label>  
                            <input class="form-control input-border" v-model="form.password" type="password" placeholder="Password">
                            <span v-if="errors.password" class="text-danger float-left small">{{ errors.password }}</span>
                        </div>

                        <div class="form-group ">
                            <button  @click="update()" type="button" class="mt-4 btn btn-success btn-lg btn-block full_rounded">
                                Update
                            </button>

                            <transition name="fade">                                
                                <b-alert v-show="errors.credentials" show class="mt-4" variant="danger">
                                    {{ errors.credentials }}
                                </b-alert>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    data () {
        return {
            form: {
                email: '',
                name: '',
                years_old: 0,
                married: 0,
                password: ''
            },
            errors: {
                email: false,
                password: false,
                name:false,                
            },
            
        }
    },
    computed :{
        ...mapState(['isLogged','authUser'])
    },
    created(){
        this.getUser()
    },
    watch: {
        'form.email': function (value) {
            let app = this            

            if (!value) {
                app.errors.email = 'Email required.'
            } else if (!app.validEmail(value)) {
                app.errors.email = 'Valid email required.'
            } else {
                app.errors.email = false
            }
        },
        'form.password': function (value) {
            let app = this
            
            if (value) {
                app.errors.password = false
            } else {
                app.errors.password = 'Pasword required.'
            }
        },
        'form.name': function (value) {
            let app = this            
            if (value) {
                app.errors.name = false
            } else {
                app.errors.name = 'Pasword required.'
            }
        }
    },    
    methods : {    
        async getUser(){
            const response = await this.$store.dispatch('getUser',this.authUser.id)
            this.form.email = response.email
            this.form.name = response.name
            this.form.married = response.married
            this.form.years_old = response.years_old  
        },
        validform() {
            let app = this

            

            if (!app.form.email) {
                app.errors.email = 'Email is required.'
            }

            if (!app.form.name) {
                app.errors.name = 'Name is required.'
            }

            if (!app.form.years_old) {
                app.errors.years_old = 'Years old is required.'
            }

            if (!app.errors.email && !app.errors.password && app.validEmail(app.form.email)) {
                return true
            }

            return false
        },
        validEmail (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email)
        },           
        async update(){
            
            
            if (this.validform()) {

                
                const app = this

                const toUpdate = {
                    id: this.authUser.id,
                    email: this.form.email,
                    name: this.form.name,
                    years_old: this.form.years_old,
                    married: this.form.married,
                    password: this.form.password || null
                }
                
                await this.$store.dispatch('setUser',toUpdate)
                

                this.$store.commit('SET_OPEN_MODAL',false)
            }
            
        },
        
    }
}
</script>

<style scope>

.ml-3, .mx-3{
    margin-left: 0 !important;
}

.btn-fb {
    color: #fff;
    background-color: #3b5998 !important;
}
</style>
