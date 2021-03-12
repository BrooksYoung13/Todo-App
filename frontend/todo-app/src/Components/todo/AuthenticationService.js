import axios from "axios";

class AuthenticationService
{
    registerSuccessfulLogin(username, password)
    {
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username);
        //call setup axios interceptors here
        this.setupAxiosInterceptors()
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
    setupAxiosInterceptors()
    {
        let username = 'in28minutes'
        let password = 'dummy'

        //Creating basic authentication header, btoa performs base 64 encoding
        //Adding prefix Basic 
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

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