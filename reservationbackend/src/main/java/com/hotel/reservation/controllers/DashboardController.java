package com.hotel.reservation.controllers;

import com.hotel.reservation.dto.DashboardStats;
import com.hotel.reservation.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
//statis
    @GetMapping("/stats")
    public DashboardStats getStats() {
        return dashboardService.getStats();
    }
}