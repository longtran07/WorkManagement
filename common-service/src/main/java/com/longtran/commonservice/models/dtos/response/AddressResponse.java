package com.longtran.commonservice.models.dtos.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AddressResponse {
    private String city;

    private String district;

    private String ward;

    private String street;
}
