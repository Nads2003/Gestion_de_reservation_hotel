package com.hotel.reservation.controllers;


import com.hotel.reservation.dto.UserDTO;
import com.hotel.reservation.entites.Role;
import com.hotel.reservation.entites.User;
import com.hotel.reservation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    @GetMapping
    //User list
    public List<UserDTO> getUsers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() != Role.ADMIN)
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole().name()
                ))
                .toList();
    }
}
