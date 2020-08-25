<template>
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
</template>

<script>
export default {
    name : 'PostVoteResults',
   
    props:{
        post:{
            type: Object,
            required: true
        }
    },
    computed:{
        resultsLike(){
            const result = (this.post.like_count * 100 ) / (this.post.like_count + this.post.dislike_count)
            return Math.round(result)
        },
        resultsDisLike(){
            const result = (this.post.dislike_count * 100 ) / (this.post.like_count + this.post.dislike_count)

            return Math.round(result)
        }
    }
    
}
</script>

