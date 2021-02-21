import React, {Component} from 'react'
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component
{

    constructor(props)
    {
        super(props)
        this.state = {
            id : this.props.match.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount()
    {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveTodo(username, this.state.id)
           // .then(response => console.log(response))

           //Here we are setting the state of the specific components of a Todo based on the axios response
           //test comment
           .then(response => this.setState({

                description : response.data.description,
                targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')

           }))
    }

    validate(values)
    {
        let errors = {}
        //If theres nothing in the description textbox
        if(!values.description)
        {
            errors.description = 'Enter a Description'
        }
        else if(values.description.length < 5)
        {
            errors.description = 'Enter at least 5 characters in Description'
        }

        if(!moment(values.targetDate).isValid())
        {
            errors.targetDate = 'Enter at least 5 characters in Description'
        }

        return errors

    }

    onSubmit(values)
    {
        //set username value
        let username = AuthenticationService.getLoggedInUserName()
        //call updateTodo method passing in username, id, and todo values
        //the '.then' is what to do on success case --> in our case we want to put user back on the Todos page
        TodoDataService.updateTodo(username, this.state.id, {
            id: this.state.id,
            description: values.description, 
            targetDate: values.targetDate
        }).then(() => this.props.history.push('/todos'))
        
        console.log(values);
    }
    render()
    {
        //Using 'destructuring' to set these to the state defined in constructor
        let {description, targetDate} = this.state
       return   (
                <div>
                    <h1>Todo</h1>
                    <div className ="container">
                        {/*Define method that returns the form*/}
                        <Formik 
                            initialValues={{description, targetDate}}
                            onSubmit={this.onSubmit}
                            validate={this.validate}
                            //These 2 below are set to false so they dont try to validate as user is entering information
                            //instead they are waiting for user to hit save button before validating
                            validateOnChange={false}
                            validateOnBlur={false}
                            //Enable reinitialization will update the page with new data
                            enableReinitialize={true}


                            >
                            {
                                (props)=> (
                                    <Form>
                                        <ErrorMessage name="description" component="div"
                                                                                className="alert alert-warning"/>
                                        <ErrorMessage name="targetDate" component="div"
                                                                                className="alert alert-warning"/>
                                        <fieldset className="form-group">
                                            <label>Description</label>
                                            <Field className="form-control" type="text" name="description"></Field>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label>TargetDate</label>
                                            <Field className="form-control" type="date" name="targetDate"/>
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Save</button>

                                    </Form>

                                    )

                            }
                        </Formik>

                    </div>
                </div>
       )
    }
}

export default TodoComponent