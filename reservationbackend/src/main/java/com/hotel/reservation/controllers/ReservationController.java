package com.hotel.reservation.controllers;

import com.hotel.reservation.dto.ReservationHistoryDto;
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
//create a reservation
    @PostMapping
    public Reservation create(
            @ModelAttribute ReservationRequest request
    ) throws Exception {

        return reservationService.createReservation(request);
    }
//reservation List
    @GetMapping
    public List<Reservation> getAll() {
        return reservationService.getAll();
    }
    @GetMapping("/{id}")
    public Reservation getById(@PathVariable Long id) {
        return reservationService.getById(id);
    }
    //reservation of a client
    @GetMapping("/user/{userId}")
    public List<ReservationHistoryDto> getByUser(@PathVariable Long userId) {
        return reservationService.getReservationsByUser(userId);
    }
    //confirm reservation
    @PutMapping("/{id}/confirm")
    public Reservation confirm(@PathVariable Long id) {
        return reservationService.confirmReservation(id);
    }
// cancel reservation
    @PutMapping("/{id}/cancel")
    public Reservation cancel(@PathVariable Long id) {
        return reservationService.cancelReservation(id);
    }
}
