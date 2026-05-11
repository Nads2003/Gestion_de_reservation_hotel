package com.hotel.reservation.controllers;

import com.hotel.reservation.dto.ReservationRequest;
import com.hotel.reservation.entites.Reservation;
import com.hotel.reservation.services.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public Reservation create(
            @ModelAttribute ReservationRequest request
    ) throws Exception {

        return reservationService.createReservation(request);
    }

    @GetMapping
    public List<Reservation> getAll() {
        return reservationService.getAll();
    }
    @GetMapping("/{id}")
    public Reservation getById(@PathVariable Long id) {
        return reservationService.getById(id);
    }
}
