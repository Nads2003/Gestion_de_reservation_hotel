package com.hotel.reservation.services;

import com.hotel.reservation.dto.RoomRequest;
import com.hotel.reservation.entites.Hotel;
import com.hotel.reservation.entites.Room;
import com.hotel.reservation.entites.RoomImage;
import com.hotel.reservation.repository.HotelRepository;
import com.hotel.reservation.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;

    public Room createRoom(RoomRequest request) throws IOException {

        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel introuvable"));

        Room room = new Room();
        room.setType(request.getType());
        room.setDescription(request.getDescription());
        room.setPrice(request.getPrice());
        room.setCapacity(request.getCapacity());
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
}
