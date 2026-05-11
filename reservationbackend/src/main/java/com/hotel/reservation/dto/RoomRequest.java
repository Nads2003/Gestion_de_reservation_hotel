package com.hotel.reservation.dto;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data

public class RoomRequest {

    private String type;
    private String description;
    private double price;
    private int capacity;

    private Long hotelId;

    private List<MultipartFile> images;
}
