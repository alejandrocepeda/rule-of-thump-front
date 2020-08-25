<template>
    <div style="padding-bottom: 35px;" class="text-white col-md-6">
        <div class="position-relative" >
        

            <img height="620" :src="post.image_url"  style="width:100%; object-fit: cover;">
                
            <div class="overlay-post"></div>

            <a style="left:0; top:57%;" class="cursor-pointer position-absolute mr-3 rounded-0 btn-sm btn btn-success" href="#" >                
                <i class="mdi mdi-18px mdi-thumb-up"></i>
            </a>
            
            <div class="centered pl-5">

                <div class="row">
                    <div class="col">
                        
                        <h1 style="line-height: 25px;font-weight: 700;">{{ post.title }} <br>
                            <small class="text-white" style="font-size: 35%;"> <span class="font-weight-bold">{{ post.date | fromNow  }} </span> in {{ post.category.name }}</small>
                        </h1>

                        <p class="pt-2" style="color:#E8E8E7">{{ post.description }}</p>
                        <p>

                            <a :class="{'border-vote':voteThisPost.like}" @click.prevent="voteLike()" class="mr-3 rounded-0 btn-sm btn btn-success" >
                                <i class="mdi mdi-18px mdi-thumb-up"></i>
                            </a>

                            <a :class="{'border-vote':voteThisPost.dislike}" @click.prevent="voteDisLike()" class="mr-3 rounded-0 btn-sm btn btn-warning">
                                <i class="mdi mdi-18px mdi-thumb-down"></i>
                            </a>

                            <a v-show="voteThisPost.dislike || voteThisPost.like"  @click.prevent="voteNow()" class="rounded-0 btn border btn-outline" href="#" role="button">{{ $t('Vote now')}}</a>
                        </p>
                        
                    </div>
                </div>   
            </div>          

           
                
            <PostVoteResults :post="post"/> 

            
            
        </div>
    </div>
</template>

<script>
import PostVoteResults from '@/components/PostVoteResults'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
    components:{
        PostVoteResults
    },
    name: 'Post',
    data(){
        return {
            voteThisPost:{
                like: false,
                dislike: false,
            }
        }
    },
    computed:{
        ...mapState(['isLogged','authUser'])
    },    
    props:{
        post:{
            type: Object,
            required: true
        }
    },
    methods:{
        voteDisLike(){
            this.voteThisPost.dislike = !this.voteThisPost.dislike
            this.voteThisPost.like = false
        },
        voteLike(){
            this.voteThisPost.like = !this.voteThisPost.like
            this.voteThisPost.dislike = false
        },
        async voteNow(){

            if(!this.isLogged){
                this.$store.commit('SET_OPEN_MODAL', true)
                return 
            }

            const toPost = {
                post_id: this.post.id,
                user_id: this.authUser.user.id,
                like_count: this.voteThisPost.like,
                dislike_count: this.voteThisPost.dislike
            }

            const response = await axios.post('users-votes',toPost)

            this.$swal({
                title: this.$t('Good job!'),
                text: this.$t("You can vote again whenever you want"),
                type: 'success',
                customClass: 'bg-body',                
                confirmButtonText: this.$t('continue')
            })


            
            this.$store.dispatch('getPots')
        }
    }
}
</script>

<style >
    .border-vote{
        border: 2px #fff solid !important;
    }

</style>