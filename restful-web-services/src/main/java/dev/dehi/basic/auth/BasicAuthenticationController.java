package dev.dehi.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:4200")
public class BasicAuthenticationController {

	
	@GetMapping("/basicauth")
	public AuthenticationBean basicauth() {
		return new AuthenticationBean("you are authenticated");
	}
}
