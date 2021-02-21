import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService'

//This is considered a 'Controlled Component' because everything is dictated by the state of the component
//This means that whenever a change is made, the state is updated and when the state is updated, the change is reflected back in the element
class LoginComponent extends Component
{
    //Adding state to be the source of truth for username and password
    constructor(props)
    {
        //Ensures any properties are passed down to super class constructor
        //************This part is just like a constructor in java, you define initial variables your methods will use */
        super(props)
        this.state = {
            username: 'in28minutes',
            password: '',
            LoginFailed: false,
            showSuccessMessage: false

        }

        //bind the event to update username change
        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // //bind the event to update password change
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);

    }

    /*
    //Method to handle someone typing into the username text box
    handleUsernameChange(event)
    {
        //prints value to console for debugging
        console.log(event.target.value);
        //Updating the state of username everytime a new value gets typed in
        //passing in object which is new value
        this.setState({username:event.target.value})
    }

    //Method to handle someone typing into the password text box
    handlePasswordChange(event)
    {
        //prints value to console for debugging
        console.log(event.target.value);
        //Updating the state of password everytime a new value gets typed in
        //passing in object which is new value
        this.setState({password:event.target.value})
    }
    */
    /*
    Instead of hard coding specific change functions like the 2 above, we can write 1 generic change function

    */

   handleChange(event)
   {
       //prints value to console for debugging
       //console.log(event.target.value);
       //console.log(this.state);
       //Creating an object with username as a specific value and setting it into the state.  The value is event.target.name
       this.setState
       (
           {
               //The lefthand side is the name of the object member variable
               //This can work with username or password, because we are not hardcoding the name since it is changing
               [event.target.name]:event.target.value
            }
        )
   }


   loginClicked()
   {
       //in28minutes, dummy are valid in this scenario
       if(this.state.username==='in28minutes' && this.state.password==='dummy')
       {
           AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
           //These below arent single quotes they are accent things, same key as tilde
           this.props.history.push(`/welcome/${this.state.username}`)
            console.log('Success!');
           // this.forceUpdate;
            //I believe you have to set both values here because I think the state persists so if you succeeded one time idk if youd need 
            //to set it to false again if you failed
            //when we redirect like above, we dont need to save the state of the component, so commenting these out
           // this.setState({showSuccessMessage:true})
            //this.setState({LoginFailed:false})
       }

       else
       {
            console.log('Fail!')
            this.setState({showSuccessMessage:false})
            this.setState({LoginFailed:true})
       }

       //console.log(this.state)

   }


    render()
    {
        return(
            //Basic HTML here used to make login page
            <div>
            {/*
            
            We set a state above for username so 'value={this.state.username}' is setting the value of the box when the page loads
            to the state set above which is 'in28minutes.

            onChange={this.handleUsernameChange} is calling a method we created called 'handleUsernameChange' that will update
            the state of username based on what the user inputs
            
            */}

            {/*This is the showInvalidCredentials function we created below.  IT is formatted differently than java function but the parameter
            being passed in is={this.stat}'.  That will be either true or false */}

            {/*
            <ShowInvalidCredentials LoginFailed={this.state.LoginFailed}></ShowInvalidCredentials>
            <ShowLoginSuccess showSuccessMessage={this.state.showSuccessMessage}></ShowLoginSuccess>
            */}

            {/**Instead of using the 2 functions below, we can actually use a built in jsx function that will show
             * strings based on certain conditions, so the below code actually does the same thing as the above function
             */}

             <h1>Login</h1>
                <div className="container">
                    {/*If the condition before the '&&' is true, display the div on the right*/}
                    {this.state.LoginFailed && <div className="alert alert-warning">Invalid Credentials!</div>}
                    {this.state.showSuccessMessage && <div>Login Success!</div>}
                    {/* <div>Invalid Credentials</div>
                    <div>Login Successful</div> */}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    {/*Tying loginClicked function to this button*/}
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }

}

export default LoginComponent