

import React, {Component} from 'react'
import {BrowserRouter as Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component 
{

    constructor(props)
    {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        //setting the state of variable 'welcomeMessage' to ''
        this.state = {welcomeMessage : ''}
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
    
    }

    render()
    {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    {/*a href refreshes entire page, Link to only refreses component it is pointing to...here is todos...can use 'a href' to refresh whole page}*/}
                    Welcome {this.props.match.params.name} You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div className="container">
                    Click here to get a customized message: 
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get welcome message</button>
                </div>
                <div className="container">
                    Welcome, {this.state.welcomeMessage}

                </div>
            </>
        )
    }

    retrieveWelcomeMessage()
    {
        //Here we are getting a promise back from hello world service
        //The following structure should be read as
            //Return something from this url
            //IF successful, then do something
            //If unsuccessful, then catch something
       // HelloWorldService.executeHelloWorldService()
       // .then(response => this.handleSuccessfulResponse(response))
        //.catch()

        //HelloWorldService.executeHelloWorldBeanService()
        //.then(response => this.handleSuccessfulResponse(response))
        //.catch()

       // console.log('Name var: ')
       // console.log(this.props.children)
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
       .then(response => this.handleSuccessfulResponse(response))
       .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response)
    {
        console.log(response);
        //response.data will return a json message, have to add .message at the end to return in usable format
        this.setState({welcomeMessage: response.data.message})

    }

    handleError(error)
    {
        console.log(error.response);
        let errorMessage = '';

        //if there is an error message, append it to errorMessage
        if(error.message)
        {
            errorMessage += error.message
        }

        //Is there anything in the response data, if so add it.
        if(error.response && error.response.data)
        {
            errorMessage += error.response.data.message
        }

        this.setState({welcomeMessage: errorMessage})
        //response.data will return a json message, have to add .message at the end to return in usable format
        //this.setState({welcomeMessage: response.data.message})

    }
}

export default WelcomeComponent