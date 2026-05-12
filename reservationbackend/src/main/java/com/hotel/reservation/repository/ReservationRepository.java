package com.hotel.reservation.repository;



import com.hotel.reservation.entites.Reservation;
import com.hotel.reservation.entites.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    boolean existsByRoomId(Long roomId);
    long countByStatus(ReservationStatus status);
    List<Reservation> findByUserId(Long userId);
    @Query("""
        SELECT COUNT(r)
        FROM Reservation r
        WHERE r.room.id = :roomId
        AND r.status != 'CANCELLED'
        AND r.endDate >= :today
    """)
    long countOccupiedRooms(Long roomId, LocalDate today);
    long countByRoomIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Long roomId,
            LocalDate endDate,
            LocalDate startDate
    );
}
