package com.hotel.reservation.services;

import com.hotel.reservation.dto.ReservationRequest;
import com.hotel.reservation.entites.*;
import com.hotel.reservation.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final PaymentRepository paymentRepository;

    public Reservation createReservation(
            ReservationRequest request
    ) throws Exception {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User introuvable"));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room introuvable"));

        long days = ChronoUnit.DAYS.between(
                request.getStartDate(),
                request.getEndDate()
        );

        double total = days * room.getPrice();

        Reservation reservation = new Reservation();

        reservation.setUser(user);
        reservation.setRoom(room);
        reservation.setStartDate(request.getStartDate());
        reservation.setEndDate(request.getEndDate());
        reservation.setTotalPrice(total);
        reservation.setStatus(ReservationStatus.PENDING);

        Reservation savedReservation =
                reservationRepository.save(reservation);

        Payment payment = new Payment();

        payment.setPaymentMethod(request.getPaymentMethod());

        // IMAGE
        payment.setProofName(
                request.getProofImage().getOriginalFilename()
        );

        payment.setProofType(
                request.getProofImage().getContentType()
        );

        payment.setProofImage(
                request.getProofImage().getBytes()
        );

        payment.setReservation(savedReservation);

        paymentRepository.save(payment);

        savedReservation.setPayment(payment);

        return reservationRepository.save(savedReservation);
    }

    public List<Reservation> getAll() {
        return reservationRepository.findAll();
    }
    public Reservation getById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }
}