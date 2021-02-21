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

        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`);

    }
}

export default new HelloWorldService()