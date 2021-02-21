import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import TodoComponent from './TodoComponent.jsx'

class TodoApp extends Component
{
    render()
    {
        return(
            <div className="TodoApp">
                {/*Router library helps route you to different web pages i.e. localhost:3000/login*/}
                <Router>
                    {/*Router can only have 1 child element so put these two inside a fragment*/}
                    <>
                        <HeaderComponent/>
                        {/*Switch ensures only one of these are matched.  We had problems with multiple getting matched*/}
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
               {/* <LoginComponent/>*/}
                {/*<WelcomeComponent/>*/}
            </div>
        )
    }
}






//This function is called above to determine when to show the success or failure message
// function ShowInvalidCredentials(props)
// {
//     if(props.LoginFailed)
//     {
//         return <div>Invalid Credentials!</div>
//     }
//     else
//     {
//         return null
//     }
// }

// //This function is called above to determine when to show the success or failure message
// function ShowLoginSuccess(props)
// {
//     if(props.showSuccessMessage)
//     {
//         return <div>Login Success</div>
//     }
//     else
//     {
//         return null
//     }
// }

export default TodoApp
