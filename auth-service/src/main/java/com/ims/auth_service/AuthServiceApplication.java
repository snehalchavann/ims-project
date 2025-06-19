package com.ims.auth_service;

import com.ims.auth_service.model.Role;
import com.ims.auth_service.model.RoleName;
import com.ims.auth_service.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AuthServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner seedRoles(RoleRepository roleRepository) {
		return args -> {
			for (RoleName roleName : RoleName.values()) {
				roleRepository.findByName(roleName).orElseGet(() -> {
					return roleRepository.save(new Role(null, roleName));
				});
			}
		};
	}


}
