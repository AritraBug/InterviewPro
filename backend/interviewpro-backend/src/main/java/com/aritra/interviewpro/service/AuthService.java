package com.aritra.interviewpro.service;

import com.aritra.interviewpro.dto.AuthResponseDto;
import com.aritra.interviewpro.dto.LoginRequestDto;
import com.aritra.interviewpro.dto.RegisterRequestDto;
import com.aritra.interviewpro.entity.User;
import com.aritra.interviewpro.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String register(
            RegisterRequestDto requestDto
    ) {

        if (userRepository
                .findByEmail(requestDto.getEmail())
                .isPresent()) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }

        User user = User.builder()
                .name(requestDto.getName())
                .email(requestDto.getEmail())
                .password(
                        passwordEncoder.encode(
                                requestDto.getPassword()
                        )
                )
                .role(requestDto.getRole())
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }

    public AuthResponseDto login(
            LoginRequestDto requestDto
    ) {

        User user = userRepository
                .findByEmail(requestDto.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid credentials"
                        ));

        if (!passwordEncoder.matches(
                requestDto.getPassword(),
                user.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid credentials"
            );
        }

        return new AuthResponseDto(
                "LOGIN_SUCCESS"
        );
    }
}