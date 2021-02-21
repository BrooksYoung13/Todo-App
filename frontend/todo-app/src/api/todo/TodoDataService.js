import axios from 'axios'

class TodoDataService
{
    retrieveAllTodos(name)
    {
        //Type in path from java application
        //This is returning a 'promise'

        //Using tics here so I Can pass in username variable
        return axios.get(`http://localhost:8080//users/${name}/todos`);

    }

    retrieveTodo(name, id)
    {
        return axios.get(`http://localhost:8080//users/${name}/todos/${id}`)
    }

    deleteTodo(name, id)
    {
        //Type in path from java application
        //This is returning a 'promise'

        //Using tics here so I Can pass in username variable
        return axios.delete(`http://localhost:8080//users/${name}/todos/${id}`);

    }

}

export default new TodoDataService()