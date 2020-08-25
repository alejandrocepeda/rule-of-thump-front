
function Auth(url = 'users/login'){
    
    return {
        
        Basic: (async (username,password) => {

            const login = {
                email: username,
                password: password
            }
            
            return await axios.post(`${url}`, login)
        })
    }
}

export default  {    
    Auth
}