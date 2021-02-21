import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'
import { Route, Redirect } from 'react-router-dom'
import TodoDataService from '../../api/todo/TodoDataService.js'
import moment from 'moment'

class ListTodosComponent extends Component
{
    //when component is initialized, constructor us used
    constructor(props)
    {
        console.log('constructor')
        super(props)
        this.state =
        {
            //Creating array
            todos : [] , message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
    }

    //Called before component is unmounted
    componentWillUnmount()
    {
        console.log('componentWillUnmount')
    }

    //this has to return a boolean
    //Allows developer to pick when to update the view
    //purpose is to help performance
    shouldComponentUpdate(nextProps, nextState)
    {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)

        return true


    }

    //built in, hover over for description
    componentDidMount()
    {
        console.log('componentDidMount')
        this.refreshTodos();
        console.log(this.state)
    }

    refreshTodos()
    {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            //Success case
            .then(
                response => 
                {
                   // console.log(response)
                   //The 'todos' name below comes from the 'todos' array defined above (line 15 right now)
                   this.setState({todos : response.data})
                }
            )
    }

    // getTodo(id)
    // {
    //     let username = AuthenticationService.getLoggedInUserName()
    //     TodoDataService.retrieveTodo(username, id)
    //         //Success case
    //         .then(
    //             response => 
    //             {
    //                // console.log(response)
    //                //The 'todos' name below comes from the 'todos' array defined above (line 15 right now)
    //                this.setState({todos : response.data})
    //             }
    //         )
    // }

    deleteTodoClicked(id)
    {
        //Gets username by using AuthenticationService
        let username = AuthenticationService.getLoggedInUserName()
        console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
        .then(
            response =>
            {
                //Tics in message so you can use var
                this.setState({message : `Delete of todo ${id} was successful`})
                //refresh todo list when response was successful
                this.refreshTodos()

            }
        )
    }

    addTodoClicked()
    {
        //Giving this todo an id of -1 to signify new todo - Backend is expecting this
        console.log('Add todo clicked')
        this.props.history.push(`/todos/-1`)
    }


    updateTodoClicked(id)
    {
        console.log('update' + id)
        this.props.history.push(`/todos/${id}`)
        // /todos/${id}
        //Gets username by using AuthenticationService
        // let username = AuthenticationService.getLoggedInUserName()
        // console.log(id + " " + username);
        // TodoDataService.deleteTodo(username, id)
        // .then(
        //     response =>
        //     {
        //         //Tics in message so you can use var
        //         this.setState({message : `Delete of todo ${id} was successful`})
        //         //refresh todo list when response was successful
        //         this.refreshTodos()

        //     }
        // )
    }

    //when a state in component is changed, and the view needs to be updated, render is called
    render()
    {
        console.log('render..')
        //We use "name" below because it matches "Route path="/welcome/:name" from above
        return (
            <div>
                <h1>List Todos</h1>
                {/*Show div only when this.state.message isnt null*/ }
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Is completed?</th>
                                    <th>Target Date</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    //This is kind of like a for each method, looks through the array showing id and description for each one
                                this.state.todos.map (
                                    todo => 
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                        <div className="row">
                            <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>

                        </div>
                    </div>
            </div>
        )
    }
}

export default ListTodosComponent