import axios from "axios";

class AuthenticationService
{
    //Calls basicauth from backend and returns token based on username and password
    executeBasicAuthenticationService(username, password)
    {
        //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        //call the API from the backend & pass in basicAuthHeader
        return axios.get('http://localhost:8080/basicauth', 
        {headers: {authorization: this.createBasicAuthToken(username, password)}})
    }

    //Method to return header
    createBasicAuthToken(username, password)
    {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password)
    {
        //Creating basic authentication header, btoa performs base 64 encoding
        //Adding prefix Basic 
        //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username);
        //call setup axios interceptors here
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    logout()
    {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn()
    {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user===null)return false
        else return true

    }

    getLoggedInUserName()
    {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user===null) return ' '
        return user
    }

    //Add authorization header to every request
    setupAxiosInterceptors(basicAuthHeader)
    {
        

        //we only want to do this when user is logged in
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn())
                {
                config.headers.authorization = basicAuthHeader
                }
                return config
            }
            
        )
    }

    

}

export default new AuthenticationService()