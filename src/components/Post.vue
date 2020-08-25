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

           
                
            <!--<PostVoteResults :post="post"/> -->

            <div style="bottom: 0;right: -1px;left: 0;" class="row position-absolute m-0">   

                <div :style="`width:${resultsLike}%`" class="overlay-follow-results"></div>

                <div style="bottom:10px; position:absolute; z-index:1;left:5px; top:5px" class="form-inline float-left">
                    <i class="ml-2 mr-2 mdi mdi-38px mdi-thumb-up"></i><h2>{{ resultsLike }} %</h2>
                </div>

                <div :style="`width:${resultsDisLike}%`" class="overlay-unfollow-results"></div>

                <div style="bottom:10px; position:absolute; z-index:1; right:5px; top:5px" class="form-inline float-right">
                    <h2 >{{ resultsDisLike }} %</h2><i class="ml-2 mr-2 mdi mdi-38px mdi-thumb-down"></i>
                </div>
            </div>

            
            
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
    props:{
        post:{
            type: Object,
            required: true
        }
    },
    data(){
        return {
            voteThisPost:{
                like: false,
                dislike: false,
            },
            resultsLike:0,
            resultsDisLike:0
        }
    },
    computed:{
        ...mapState(['isLogged','authUser']),
    },        
    mounted(){
        this.calcPorc(this.post.like_count,this.post.dislike_count)
    },
    methods:{    
        calcPorc(like_count,dislike_count){
            this.resultsLike = (like_count * 100 ) / (like_count + dislike_count)        
            this.resultsLike = Math.round(this.resultsLike)
        
            this.resultsDisLike = (dislike_count * 100 ) / (like_count + dislike_count)
            this.resultsDisLike = Math.round(this.resultsDisLike)        
        },
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

            try {
                const toPost = {
                    post_id: this.post.id,
                    user_id: this.authUser.id,
                    like_count: this.voteThisPost.like,
                    dislike_count: this.voteThisPost.dislike
                }

                await axios.post('users-votes',toPost)

                this.$swal({
                    title: this.$t('Good job!'),
                    text: this.$t("You can vote again whenever you want"),
                    type: 'success',
                    customClass: 'bg-body',                
                    confirmButtonText: this.$t('continue')
                })

                const post = await this.$store.dispatch('getPost',this.post.id)
                
                this.calcPorc(post.like_count,post.dislike_count)
                
            } catch (error) {
                console.log(error)                
            }
            
        }
    }
}
</script>

<style >
    .border-vote{
        border: 2px #fff solid !important;
    }

</style>