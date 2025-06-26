package com.ims.incident_service.controller;

import com.ims.incident_service.dto.DashboardDTO;
import com.ims.incident_service.service.DashboardService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping("/v1/dashboard")
@AllArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public DashboardDTO getAdminDashBoardMetrics(){
        log.info("Received metrics for admin");
        return dashboardService.getDashBoardMetrics();
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public DashboardDTO getUserDashBoardMetrics(Authentication authentication){
        log.info("Received metrics for user");
        return dashboardService.getUserDashboardMetrics(authentication.getName());
    }
}
