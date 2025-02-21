package com.longtran.commonservice.services.address;

import com.longtran.commonservice.models.dtos.request.AddressRequest;
import com.longtran.commonservice.models.entity.Address;
import com.longtran.commonservice.models.entity.User;

public interface AddressService {

     Address saveAddress(AddressRequest addressRequest);

     Address updateAddress(AddressRequest addressRequest) ;

     Address getAddressByUserId(Long userId) ;

}






