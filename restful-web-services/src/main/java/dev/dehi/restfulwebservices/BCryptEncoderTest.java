package dev.dehi.restfulwebservices;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptEncoderTest {

	public static void main(String[] args) {
		
		BCryptPasswordEncoder endoder = new BCryptPasswordEncoder();
		
		System.out.println(endoder.encode("devdehi@123")); 

	}

}
