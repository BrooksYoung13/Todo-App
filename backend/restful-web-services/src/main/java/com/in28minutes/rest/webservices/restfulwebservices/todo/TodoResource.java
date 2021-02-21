package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
//Telling spring is ok to talk to something on port 4200, we need this
@CrossOrigin(origins="http://localhost:4200")
public class TodoResource 
{
	//@Autowired below tells spring to manage dependencies for us
	@Autowired
	private TodoHardcodedService todoService;
	
	//@GetMapping is the url this info is going to go to
	//Return a list of all the Todos
	@GetMapping("/users/{username}/todos")
	//The parameter we are passing in is a path variable meaning we can use it on front end
	public List<Todo> getAllTodos(@PathVariable String username) 
	{
		//Thread.sleep(5000);
		return todoService.findAll();
	}
	
	//@GetMapping is the url this info is going to go to
	//Return 1 specific Todo based on id
	@GetMapping("/users/{username}/todos/{id}")
	//The parameter we are passing in is a path variable meaning we can use it on front end
	public Todo getTodo(@PathVariable String username, @PathVariable long id) 
	{
		//Thread.sleep(5000);
		return todoService.findById(id);
	}
	
	//Delete method
	//DELETE /users/{username}/todos/{id}
	
	//Response Entity helps build specific requests with specific statuses
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(
			@PathVariable String username, @PathVariable long id)
	{
		Todo todo = todoService.deleteById(id);
		if(todo!=null)
		{
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}
