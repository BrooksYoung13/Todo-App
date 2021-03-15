package com.in28minutes.rest.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//Controller - Tell spring this will handle rest requests
@RestController
//Telling spring is ok to talk to something on port 4200, we need this
@CrossOrigin(origins="http://localhost:4200")
//@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", allowedHeaders = "*")

public class BasicAuthenticationController 
{

	@GetMapping(path = "/basicauth")
	public AuthenticationBean helloWorldBean()
	{
		//Below is going to return a bean saying Hello world and subbing name variable for %s
		return new AuthenticationBean("This is hello world bean");
	}
}
