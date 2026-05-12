package com.hotel.reservation.services;

import com.hotel.reservation.dto.RoomRequest;
import com.hotel.reservation.entites.Hotel;
import com.hotel.reservation.entites.Room;
import com.hotel.reservation.entites.RoomImage;
import com.hotel.reservation.repository.HotelRepository;
import com.hotel.reservation.repository.ReservationRepository;
import com.hotel.reservation.repository.RoomImageRepository;
import com.hotel.reservation.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;
    private final ReservationRepository reservationRepository;
    private final RoomImageRepository roomImageRepository;
    public Room createRoom(RoomRequest request) throws IOException {

        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel introuvable"));

        Room room = new Room();
        room.setType(request.getType());
        room.setDescription(request.getDescription());
        room.setPrice(request.getPrice());
        room.setCapacity(request.getCapacity());
        room.setAvailableRooms(request.getAvailableRooms());
        room.setHotel(hotel);

        List<RoomImage> images = request.getImages().stream().map(file -> {
            try {
                RoomImage img = new RoomImage();
                img.setName(file.getOriginalFilename());
                img.setType(file.getContentType());
                img.setImageData(file.getBytes()); // ✅ CORRECT
                img.setRoom(room);
                return img;
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).toList();

        room.setImages(images);

        return roomRepository.save(room);
    }
    public void deleteRoom(Long id) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room introuvable"));

        // ❌ 1. Vérifier s'il y a des réservations
        boolean hasReservations = reservationRepository.existsByRoomId(id);

        if (hasReservations) {
            throw new RuntimeException("Impossible de supprimer : chambre déjà réservée");
        }

        // 🧹 2. Supprimer images
        roomImageRepository.deleteAll(room.getImages());

        // 🧹 3. Supprimer room
        roomRepository.delete(room);
    }
    public Map<String, Long> getAvailability(Long roomId) {

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room introuvable"));

        long occupied = reservationRepository.countOccupiedRooms(
                roomId,
                LocalDate.now()
        );

        long free = room.getAvailableRooms() - occupied;

        return Map.of(
                "total", (long) room.getAvailableRooms(),
                "occupied", occupied,
                "free", free
        );
    }
}
