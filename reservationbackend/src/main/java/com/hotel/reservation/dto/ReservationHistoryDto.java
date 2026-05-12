package com.hotel.reservation.dto;

import com.hotel.reservation.entites.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ReservationHistoryDto {

    private Long id;

    private String roomType;
    private String roomDescription;

    private LocalDate startDate;
    private LocalDate endDate;

    private double totalPrice;

    private ReservationStatus status;

    private String paymentMethod;

    private String proofType;
    private byte[] proofImage;
}