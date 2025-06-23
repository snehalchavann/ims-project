package com.ims.auth_service.configuration;

import com.ims.auth_service.model.Role;
import com.ims.auth_service.model.RoleName;
import com.ims.auth_service.model.User;
import com.ims.auth_service.repository.RoleRepository;
import com.ims.auth_service.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class InitialDataConfig implements CommandLineRunner {
     private final UserRepository userRepo;
     private final RoleRepository roleRepo;
     private final PasswordEncoder encoder;

    @Override
    public void run(String... args) {
        Role adminRole = roleRepo.findByName(RoleName.valueOf("ADMIN")).orElseGet(() ->
                roleRepo.save(new Role(2L, RoleName.ADMIN))
        );

        if (!userRepo.existsByEmail("admin@example.com")) {
            User admin = new User(1, "admin", "admin@example.com", encoder.encode("admin123"), adminRole);
            userRepo.save(admin);
            System.out.println("Admin is created.");
        }
    }
}
