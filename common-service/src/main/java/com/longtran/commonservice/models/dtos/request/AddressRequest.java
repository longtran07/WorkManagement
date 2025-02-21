package com.longtran.commonservice.models.dtos.request;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AddressRequest {
    private Long userId;

    private String city;

    private String district;

    private String ward;

    private String street;
}
