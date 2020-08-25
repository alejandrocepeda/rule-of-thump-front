<template>
    <div class="container mt-5 pl-0 pr-0">
        
        <Alert/> 

        <div class="row mt-4">
          <div class="col">
            <h1 style="font-weight: lighter;">{{ $t('Votes')}}</h1>
          </div>
          
        </div>
        
       
        <div class="row mt-4">
          <Post :post="post" :key="index" v-for="(post, index) in posts" />
        </div>
        
        

      </div>
</template>

<script>

import Alert from '@/components/Alert'
import Post from '@/components/Post'
import { mapState } from 'vuex'

export default {
    components:{
      Alert, Post
    },
    name: 'Home',
    data(){
      return {
        
      }
    },    
    created(){
      this.$store.dispatch('getPots')            
    },
    computed:{        
      ...mapState([      
        'posts'
      ])
    }
}
</script>