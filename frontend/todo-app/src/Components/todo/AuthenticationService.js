import axios from "axios";

class AuthenticationService
{
    registerSuccessfulLogin(username, password)
    {
        //Creating basic authentication header, btoa performs base 64 encoding
        //Adding prefix Basic 
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username);
        //call setup axios interceptors here
        this.setupAxiosInterceptors(basicAuthHeader)
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