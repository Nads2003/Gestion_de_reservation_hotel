package com.hotel.reservation.services;

import com.hotel.reservation.dto.DashboardStats;
import com.hotel.reservation.entites.ReservationStatus;
import com.hotel.reservation.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;

    public DashboardStats getStats() {

        long users = userRepository.count();
        long rooms = roomRepository.count();
        long reservations = reservationRepository.count();

        long confirmed = reservationRepository.countByStatus(ReservationStatus.CONFIRMED);
        long pending = reservationRepository.countByStatus(ReservationStatus.PENDING);
        long cancelled = reservationRepository.countByStatus(ReservationStatus.CANCELLED);

         DashboardStats stats= new DashboardStats();
        stats.setUsers(users);
        stats.setRooms(rooms);
        stats.setReservations(reservations);
        stats.setConfirmed(confirmed);
        stats.setPending(pending);
        stats.setCancelled(cancelled);

        return stats;
    }
}