package com.hotel.reservation.repository;

import com.hotel.reservation.entites.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
