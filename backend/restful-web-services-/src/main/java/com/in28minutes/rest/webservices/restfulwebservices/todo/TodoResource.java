package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
//Telling spring is ok to talk to something on port 4200, we need this
@CrossOrigin(origins="http://localhost:4200")
//@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", allowedHeaders = "*")
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
	//Return 1 specific Todo based on id ..
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
	
	//Edit or Update a Todo
	//PUT /users/{user_name}/todos/
	@PutMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(
			@PathVariable String username, @PathVariable long id, @RequestBody Todo todo)
	{
		Todo todoUpdated = todoService.save(todo);
		
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}
	
	//Create a new Todo
	//POST /users/{user_name}/todos/
	@PostMapping("/users/{username}/todos")
	public ResponseEntity<Void> updateTodo(
			@PathVariable String username, @RequestBody Todo todo)
	{
		//create a todo
		Todo createdTodo = todoService.save(todo);
		//Location
		//Get current resource url
		//{id}
		
		//"id" in path is being replaced with the ID of the created Todo
		//Take current requeset path and appending /id (
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		
		//return newly created uri
		return ResponseEntity.created(uri).build();
	}
}
