<template>
    <div>
        <div class="align-items-center auth-login">
            <h3 class="text-center page-title">Sign Up</h3>  
            <div class="row w-100 mx-auto">
                        
                <div class="col-md-12 mx-auto p-5">
                            
                    <div class="auto-form-wrapper"> 
                            
            
                                <div class="form-group">
                                    
                                    <div class="input-group" :class="{'is-danger': errors.name }">                                        
                                        <input class="form-control input-border" v-model="form.name" type="text" placeholder="Full name">
                                    </div>
                                    <span v-if="errors.name" class="text-danger float-left small">{{ errors.name }}</span>
                                </div>

                                <div class="form-group">                                    
                                    <div class="input-group" :class="{'is-danger': errors.email }">
                                        
                                        <input class="form-control input-border" v-model="form.email" type="email" placeholder="Email address">
                                    </div>
                                    <span v-if="errors.email" class="text-danger float-left small">{{ errors.email }}</span>
                                </div>

                                <div class="form-group">                                    
                                    <div class="input-group" :class="{'is-danger': errors.years_old }">
                                        
                                        <input class="form-control input-border" v-model="form.years_old" type="number" placeholder="Years_old">
                                    </div>
                                    <span v-if="errors.email" class="text-danger float-left small">{{ errors.years_old }}</span>
                                </div>


                                <div class="form-group">                                    
                                    <b-form-checkbox v-model="form.married" switch size="lg">
                                        <span class="form-inline" style="cursor:pointer; font-size:18px">{{ $t("Married")}}</span>
                                    </b-form-checkbox>
                                </div>


                                 


                                 

                                <div class="form-group ">
                                    
                                    <div class="input-group" :class="{'is-danger': errors.password }">
                                        <input class="form-control input-border" v-model="form.password" type="password" placeholder="Password">
                                    </div>
                                    
                                    <span v-if="errors.password" class="text-danger float-left small">{{ errors.password }}</span>
                                </div>

                                <div class="form-group ">
                                    <button  @click="create()" type="button" class="mt-4 btn btn-success btn-lg btn-block full_rounded">
                                        
                                        Create
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
                credentials: false
            },
            loading: false,            
        }
    },
    watch: {
        'form.email': function (value) {
            let app = this
            app.errors.credentials = false

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
            app.errors.credentials = false
            if (value) {
                app.errors.password = false
            } else {
                app.errors.password = 'Pasword required.'
            }
        }
    },    
    methods : {    
        validform() {
            let app = this

            if (!app.form.password) {
                app.errors.password = 'Pasword is required.'
            }

            if (!app.form.email) {
                app.errors.email = 'Email is required.'
            }

            if (!app.form.name) {
                app.errors.name = 'Name is required.'
            }

            if (!app.form.years_old) {
                app.errors.name = 'Years old is required.'
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
        async create(){
            
            
            if (this.validform()) {

                this.loading = true
                const app = this

                const toCreate = {
                    email: this.form.email,
                    name: this.form.name,
                    years_old: this.form.years_old,
                    married: this.form.married,
                    password: this.form.password
                }
                
                
                const response = await axios.post('/users/register',toCreate)

                const payload = {
                    username: this.form.email,
                    password: this.form.password
                }
                
                this.$store.dispatch('AuthBasic',payload)
                .then((response) => {
                    
                    this.loading = false
                    this.$store.commit('SET_OPEN_MODAL',false)                    
                })
                .catch((error) => {

                    this.loading = false
                    
                    this.errors.credentials = 'Incorrect email or password'
                    
                    setTimeout(() => {
                        this.errors.credentials = false
                    },3000)
                    
                })
                
                
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
