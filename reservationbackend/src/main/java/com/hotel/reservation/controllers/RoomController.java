package com.hotel.reservation.controllers;
import com.hotel.reservation.dto.RoomRequest;
import com.hotel.reservation.entites.Room;
import com.hotel.reservation.entites.RoomImage;
import com.hotel.reservation.repository.RoomImageRepository;
import com.hotel.reservation.repository.RoomRepository;
import com.hotel.reservation.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;
    private final RoomRepository roomRepository;
    private final RoomImageRepository roomImageRepository;

    // 🔥 CREATE ROOM + IMAGES
    @PostMapping
    public Room createRoom(@ModelAttribute RoomRequest request) throws IOException {
        return roomService.createRoom(request);
    }

    // 🔥 GET ALL ROOMS
    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // 🔥 GET ROOM BY ID
    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room introuvable"));
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {

        RoomImage img = roomImageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image introuvable"));

        return ResponseEntity
                .ok()
                .header("Content-Type", img.getType())
                .body(img.getImageData());
    }
    // 🔥 DELETE ROOM
    @DeleteMapping("/{id}")
    public String deleteRoom(@PathVariable Long id) {
        roomRepository.deleteById(id);
        return "Room supprimée";
    }
}