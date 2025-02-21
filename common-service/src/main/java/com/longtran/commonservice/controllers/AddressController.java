package com.longtran.commonservice.controllers;

import com.longtran.commons.models.dtos.response.ResponseObject;
import com.longtran.commonservice.models.dtos.request.AddressRequest;
import com.longtran.commonservice.models.dtos.response.AddressResponse;
import com.longtran.commonservice.models.entity.Address;
import com.longtran.commonservice.services.address.AddressService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/address")
@RequiredArgsConstructor
public class AddressController {


    private final AddressService addressService;
    private final ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<ResponseObject> addAddress(@RequestBody AddressRequest addressRequest) {
        Address address = addressService.saveAddress(addressRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ResponseObject.builder()
                        .status(HttpStatus.CREATED)
                        .message("Address created successfully")
                        .result(address)
                        .build()
        );
    }

    @PutMapping("")
    public ResponseEntity<ResponseObject> updateAddress(
            @RequestBody AddressRequest addressRequest) {
        try {
            Address address = addressService.updateAddress( addressRequest);
            return ResponseEntity.ok().body(
                    ResponseObject.builder()
                            .status(HttpStatus.OK)
                            .message("Updated")
                            .result(modelMapper.map(address,AddressResponse.class))
                            .build()
            );
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .message(e.getMessage())
                            .build());
        }
    }


    @GetMapping("/{userId}")
    public ResponseEntity<ResponseObject> getAddressByUsername(
            @PathVariable("userId") Long userId) {
        Address address = addressService.getAddressByUserId(userId);
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Address for username " + userId)
                        .result(modelMapper.map(address, AddressResponse.class))
                        .build()
        );
    }

}
