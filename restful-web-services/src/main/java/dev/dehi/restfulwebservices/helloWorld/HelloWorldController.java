package dev.dehi.restfulwebservices.helloWorld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("http://localhost:4200")
public class HelloWorldController {

	@GetMapping("/hello-world")
	public String helloWorld() {
		return "Hellp World";
	}
	
	@GetMapping("hello-world-bean/path-variable/{name}")
	public HelloWorld helloWorldBean(@PathVariable String name) {
		return new  HelloWorld("Hello " + name);
	}
}
