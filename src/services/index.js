function Posts(url = 'posts'){
    return {        
        getAll: (async () => {
            return await axios.get(url)
        })
    }
}

export default  {    
    Posts
}