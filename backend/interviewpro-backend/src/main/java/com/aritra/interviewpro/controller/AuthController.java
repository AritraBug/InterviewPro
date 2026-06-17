package com.aritra.interviewpro.controller;

import com.aritra.interviewpro.dto.AuthResponseDto;
import com.aritra.interviewpro.dto.LoginRequestDto;
import com.aritra.interviewpro.dto.RegisterRequestDto;
import com.aritra.interviewpro.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService
    ) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(
            @Valid @RequestBody
            RegisterRequestDto requestDto
    ) {

        return authService.register(
                requestDto
        );
    }

    @PostMapping("/login")
    public AuthResponseDto login(
            @Valid @RequestBody
            LoginRequestDto requestDto
    ) {

        return authService.login(
                requestDto
        );
    }
}