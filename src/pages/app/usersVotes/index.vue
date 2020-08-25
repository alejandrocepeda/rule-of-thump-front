<template>
    <div class="container mt-5 pl-0 pr-0">
        <h1>Users Votes</h1>
        
        
        <table class="table mt-5 table-condensed nowrap" cellspacing="0" width="100%">
            <thead>
                
                <th>Post Id</th>                
                <th>Post Title</th>                
                <th>Post Date</th>                
                <th>User Name</th>                
                
            </thead>
            <tbody>
                <tr :key="index" v-for="(vote,index) in usersVotes">
                    <td>{{ vote.post_id }}</td>
                    <td>{{ vote.post.title }}</td>
                    <td>{{ vote.post.date | formatDate('LLL') }}</td>
                    <td>{{ vote.user.name }}</td>
                    
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name :'usersVotes',    
    computed:{
        ...mapState(['usersVotes'])
    },
    created(){
        this.$store.dispatch('getUsersVotes')
    }
}
</script>