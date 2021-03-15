import axios from "axios";
import { API_URL } from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService
{
    //Calls basicauth from backend and returns token based on username and password
    executeBasicAuthenticationService(username, password)
    {
        //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        //call the API from the backend & pass in basicAuthHeader
        return axios.get(`${API_URL}/basicauth`, 
        {headers: {authorization: this.createBasicAuthToken(username, password)}})
    }

    //Calls authenticate from backend and returns token based on username and password
    executeJwtAuthenticationService(username, password)
    {
        //Sends post request to the URL containing username and pw so works with rest services
        return axios.post(`${API_URL}/authenticate`, {username, password})
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
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        //call setup axios interceptors here
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token)
    {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    //Method to return jwt token
    createJWTToken(token)
    {
        return 'Bearer ' + token
    }

    logout()
    {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn()
    {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user===null)return false
        else return true

    }

    getLoggedInUserName()
    {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user===null) return ' '
        return user
    }

    //Send authorization token into every request after logging in
    setupAxiosInterceptors(token)
    {
        //we only want to do this when user is logged in
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn())
                {
                config.headers.authorization = token
                }
                return config
            }
            
        )
    }

    

}

export default new AuthenticationService()