import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService'
import { Route, Redirect } from 'react-router-dom'

class AuthenticatedRoute extends Component
{
    render()
    {
        if(AuthenticationService.isUserLoggedIn())
        {
            //the '...' is called a spread operator and it is a fancy way of passing in all parameters associated with a variable
            return <Route {...this.props}/>
        }
        else
        {
            return <Redirect to="/login"/>
        }
    }
}

export default AuthenticatedRoute