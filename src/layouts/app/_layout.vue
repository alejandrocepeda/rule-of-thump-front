<template>
    <div class="pb-5 mb-5">    
            
        <Header/>
                                
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>

        <Footer/>
                         
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
    components:{
        Header, Footer
    }
}

</script>