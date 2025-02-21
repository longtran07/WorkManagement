package com.longtran.commonservice.services.address;

import com.longtran.commons.exceptions.DataNotFoundException;
import com.longtran.commonservice.models.dtos.request.AddressRequest;
import com.longtran.commonservice.models.entity.Address;
import com.longtran.commonservice.models.entity.User;
import com.longtran.commonservice.repositories.AddressRepository;
import com.longtran.commonservice.repositories.UsersRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressServiceImpl implements AddressService {
    AddressRepository addressRepository;
    UsersRepository userRepository;
    ModelMapper modelMapper;
    @Override
    public Address saveAddress(AddressRequest addressRequest) {
        Address address = new Address();
        Optional<User> user = userRepository.findById(addressRequest.getUserId());
        if (!user.isPresent()) {
            throw new DataNotFoundException("User not found");
        }
        else {
            address.setUser(user.get());
            address.setCity(addressRequest.getCity());
            address.setWard(addressRequest.getWard());
            address.setStreet(addressRequest.getStreet());
            address.setDistrict(addressRequest.getDistrict());
            return addressRepository.save(address);
        }

    }

    @Override
    public Address updateAddress(AddressRequest addressRequest) {
        Address address = addressRepository.findByUserUserId(addressRequest.getUserId());
        if (address != null) {
                address.setStreet(addressRequest.getStreet());
                address.setDistrict(addressRequest.getDistrict());
                address.setCity(addressRequest.getCity());
                address.setWard(addressRequest.getWard());

            // Kiểm tra sự tồn tại của người dùng trước khi thiết lập
            Optional<User> userOpt = userRepository.findById(addressRequest.getUserId());
            if (userOpt.isPresent()) {
                address.setUser(userOpt.get());
                return addressRepository.save(address);
            } else {
                throw new DataNotFoundException("User with ID " + addressRequest.getUserId() + " not found");
            }
        } else {
            throw new DataNotFoundException("Address for user with ID " + addressRequest.getUserId() + " not found");
        }
    }


    @Override
    public Address getAddressByUserId(Long userId) {

        return addressRepository.findByUserUserId(userId);
    }


}
