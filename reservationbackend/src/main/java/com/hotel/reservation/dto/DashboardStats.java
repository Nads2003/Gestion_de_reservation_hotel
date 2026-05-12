package com.hotel.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data


public class DashboardStats {
    private long users;
    private long rooms;
    private long reservations;
    private long confirmed;
    private long pending;
    private long cancelled;
}
