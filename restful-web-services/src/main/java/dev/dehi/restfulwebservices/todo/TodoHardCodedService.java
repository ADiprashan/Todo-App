package dev.dehi.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoHardCodedService {

	
	private static List<Todo> todos = new ArrayList<Todo>();
	private static long idCounter =0;
	static {
		todos.add (new Todo(++idCounter,"dehi","learn react", new Date(), false));
		todos.add (new Todo(++idCounter,"dehi","learn java", new Date(), false));
		todos.add (new Todo(++idCounter,"dehi","learn Spring", new Date(), false));
		todos.add (new Todo(++idCounter,"dehi","learn redux", new Date(), false));
	}
	
	
	public List<Todo> findAll () {
		return todos;
	}
	
	
	public Todo save (Todo todo) {
		if (todo.getId()==-1 || todo.getId()==0) {
			todo.setId(++idCounter);
			todos.add(todo);
		} else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
	
	public Todo deleteById(long id) {
		Todo todo = findByid(id);
		if (todo == null) return null;
		todos.remove(todo);
		return todo;
	}

	public Todo findByid(long id) {
		Todo todo = todos.stream().filter(x ->  id == x.getId())
				.findAny()
				.orElse(null);      
		return todo;
	}
}
