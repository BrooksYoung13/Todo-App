import axios from 'axios';

class HelloWorldService
{
    executeHelloWorldService()
    {
        //Type in path from java application
        //This is returning a 'promise'

        return axios.get('http://localhost:8080/hello-world');

    }

    executeHelloWorldBeanService()
    {
        //Type in path from java application
        //This is returning a 'promise'

        return axios.get('http://localhost:8080/hello-world-bean');

    }

    executeHelloWorldPathVariableService(name)
    {
        //Type in path from java application
        //This is returning a 'promise'
        //****************************************** */
        //IMPORTANT - Using 'tick character' (on tilde key) to allow us to return value that name represents
        
        let username = 'in28minutes'
        let password = 'dummy'

        //Creating basic authentication header, btoa performs base 64 encoding
        //Adding prefix Basic 
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        
        //Adding additional parameter to axios get call so we can send authorization header
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`,
        {
            headers : {
                authorization : basicAuthHeader
            }
        });

    }
}

export default new HelloWorldService()