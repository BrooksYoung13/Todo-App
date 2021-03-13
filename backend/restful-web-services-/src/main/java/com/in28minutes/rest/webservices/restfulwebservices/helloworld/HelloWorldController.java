package com.in28minutes.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

//Controller - Tell spring this will handle rest requests
@RestController
//Telling spring is ok to talk to something on port 4200, we need this
@CrossOrigin(origins="http://localhost:4200")
//@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", allowedHeaders = "*")

public class HelloWorldController 
{
	//GET
	
	//URI - /hello-world
	
	//method = "Hello World
	@GetMapping(path = "/hello-world")
	public String helloWorld()
	{
		return "Hello Wkkkkkld";
				
	}
	
	//hello-world-bean
		@GetMapping(path = "/hello-world-bean")
		public HelloWorldBean helloWorldBean()
		{
			//Below is going to return a bean saying Hello world and subbing name variable for %s
			return new HelloWorldBean("This is hello world bean");
		}
	
	//hello-world-bean/path-variable/Brooks
	//@GetMapping(path = "/hello-world/path-variable/{name}")
	//public HelloWorldBean helloWorldPathVariable(@PathVariable String name)
	//{
		//Below is going to return a bean saying Hello world and subbing name variable for %s
	//	return new HelloWorldBean(String.format("Hello-world, %s", name));
	//}
	
	///hello-world/path-variable/in28minutes
		@GetMapping(path = "/hello-world/path-variable/{name}")
		public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
			return new HelloWorldBean(String.format("Hello World, %s", name));
		}
}