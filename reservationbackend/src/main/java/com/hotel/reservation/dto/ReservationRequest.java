package com.hotel.reservation.dto;

import com.hotel.reservation.entites.ReservationStatus;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
public class ReservationRequest {

    private Long userId;
    private Long roomId;

    private LocalDate startDate;
    private LocalDate endDate;


    private String paymentMethod;

    private MultipartFile proofImage;
}