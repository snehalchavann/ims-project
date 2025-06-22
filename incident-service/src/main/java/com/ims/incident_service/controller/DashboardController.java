package com.ims.incident_service.controller;

import com.ims.incident_service.dto.DashboardDTO;
import com.ims.incident_service.service.DashboardService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/dashboard")
@AllArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public DashboardDTO getAdminDashBoardMetrics(){
        return dashboardService.getDashBoardMetrics();
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public DashboardDTO getUserDashBoardMetrics(Authentication authentication){
        return dashboardService.getUserDashboardMetrics(authentication.getName());
    }
}
