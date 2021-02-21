package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;


@Service
public class TodoHardcodedService 
{
	private static List<Todo> todos = new ArrayList();
	private static int idCounter = 0;
	
	static 
	{
		todos.add(new Todo(++idCounter, "in28minutes", "Learn to Dance!!!", new Date(), false));
		todos.add(new Todo(++idCounter, "in28minutes", "Learn about Microservices", new Date(), false));
		todos.add(new Todo(++idCounter, "in28minutes", "Learn about Angular", new Date(), false));
	}
	
	public List<Todo> findAll()
	{
		return todos;
	}
	
	/*
	 * if the id of the Todo is -1 we want to add it in with an ID 1 more than the most recent todo.getId()
	 * else, we want to update the current todo by deleting it and adding a new one
	 */
	public Todo save(Todo todo)
	{
		if(todo.getId()==-1 || todo.getId()==0)
		{
			todo.setId(++idCounter);
			todos.add(todo);
		}
		else
		{
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
	
	public Todo deleteById(long id)
	{
		Todo todo = findById(id);
		
		if(todo==null)
		{
			return null;
		}
		
		//Removal is done here inside if statement
		if(todos.remove(todo))
		{
			return todo;
		}
		else
			return null;
		
	}

	//Sort through todos list, return the one with matching ID
	public Todo findById(long id) 
	{
		// TODO Auto-generated method stub
		for(Todo todo:todos)
		{
			if(todo.getId() == id)
			{
				return todo;
			}
		}
		return null;
	}

}
