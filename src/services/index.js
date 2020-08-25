function Posts(url = 'posts'){
    return {        
        getAll: (async () => {
            return await axios.get(url)
        }),
        getOne: (async (id) => {
            return await axios.get(`${url}/${id}`)
        }),
        update: (async (id, toUpdate) => {
            return await axios.put(`${url}/${id}`,toUpdate)
        }),
    }
}

function Users(url = 'users'){
    return {        
        getAll: (async () => {
            return await axios.get(url)
        }),
        getOne: (async (id) => {
            return await axios.get(`${url}/${id}`)
        }),
        update: (async (id, toUpdate) => {
            return await axios.put(`${url}/${id}`,toUpdate)
        }),
        store: (async (toStore) => {
            return await axios.post(`${url}`,toStore)
        }),  
    }
}

export default  {    
    Posts,
    Users
}