<template>
    <div>
        <div class="align-items-center auth-login">
            <h3 class="text-center page-title">Log In</h3>  
            <div class="row w-100 mx-auto">
                        
                <div class="col-md-12 mx-auto p-5">
                            
                    <div class="auto-form-wrapper"> 
                            
            

                                <div class="form-group">
                                    
                                        <label for="exampleInputEmail1">Username or email</label>  
                                        
                                        <input class="form-control input-border" v-model="form.email" type="email" placeholder="Username or email">
                                   
                                    <span v-if="errors.email" class="text-danger small">{{ errors.email }}</span>
                                </div>

                                <div class="form-group ">
                                    
                                    <label>Password</label>  
                                    <input class="form-control input-border" v-model="form.password" type="password" placeholder="Password">
                                    
                                    
                                    <span v-if="errors.password" class="text-danger small">{{ errors.password }}</span>
                                </div>

                                <div class="form-group ">
                                    <button  @click="Login()" type="button" class="mt-4 btn btn-success btn-lg btn-block full_rounded">
                                        
                                        Sign in
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
                password: ''
            },
            errors: {
                email: false,
                password: false,
                credentials: false
            },
            
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
                app.errors.password = 'Pasword required.'
            }

            if (!app.form.email) {
                app.errors.email = 'Email required.'
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
        async Login(){
            
            
            if (this.validform()) {

                
                const app = this

                const payload = {
                    username: this.form.email,
                    password: this.form.password
                }
                
                try {
                    const response = await this.$store.dispatch('AuthBasic',payload)    

                    this.$store.commit('SET_OPEN_MODAL',false)                    
                } catch (error) {
                    this.errors.credentials = 'Incorrect email or password'
                    
                    setTimeout(() => {
                        this.errors.credentials = false
                    },3000)
                }                
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
