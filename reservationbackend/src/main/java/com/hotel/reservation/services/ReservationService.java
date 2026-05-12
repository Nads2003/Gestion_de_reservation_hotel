package com.hotel.reservation.services;

import com.hotel.reservation.dto.ReservationHistoryDto;
import com.hotel.reservation.dto.ReservationRequest;
import com.hotel.reservation.entites.*;
import com.hotel.reservation.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        long occupied = reservationRepository
                .countByRoomIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                        room.getId(),
                        request.getEndDate(),
                        request.getStartDate()
                );

        if (occupied >= room.getAvailableRooms()) {
            throw new RuntimeException(
                    "Toutes les chambres sont déjà réservées pour ces dates"
            );
        }

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
        payment.setProofName(request.getProofImage().getOriginalFilename());
        payment.setProofType(request.getProofImage().getContentType());
        payment.setProofImage(request.getProofImage().getBytes());

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
    @Transactional(readOnly = true)
    public List<ReservationHistoryDto> getReservationsByUser(Long userId) {

        List<Reservation> reservations = reservationRepository.findByUserId(userId);

        return reservations.stream()
                .map(r -> new ReservationHistoryDto(
                        r.getId(),
                        r.getRoom().getType(),
                        r.getRoom().getDescription(),
                        r.getStartDate(),
                        r.getEndDate(),
                        r.getTotalPrice(),
                        r.getStatus(),

                        r.getPayment() != null
                                ? r.getPayment().getPaymentMethod()
                                : null,

                        r.getPayment() != null
                                ? r.getPayment().getProofType()
                                : null,

                        r.getPayment() != null
                                ? r.getPayment().getProofImage()
                                : null
                ))
                .toList();
    }
    public Reservation confirmReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable"));

        reservation.setStatus(ReservationStatus.CONFIRMED);

        return reservationRepository.save(reservation);
    }
    public Reservation cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable"));

        reservation.setStatus(ReservationStatus.CANCELLED);

        return reservationRepository.save(reservation);
    }
}