package com.aritra.interviewpro.controller;

import com.aritra.interviewpro.dto.DashboardResponseDto;
import com.aritra.interviewpro.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService
    ) {
        this.dashboardService = dashboardService;
    }
    @PreAuthorize(
            "hasRole('ADMIN') or hasRole('RECRUITER')"
    )
    @GetMapping("/stats")
    public DashboardResponseDto getDashboardStats() {

        return dashboardService
                .getDashboardStats();
    }

}