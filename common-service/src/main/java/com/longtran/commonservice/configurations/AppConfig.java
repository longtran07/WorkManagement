package com.longtran.commonservice.configurations;

import com.longtran.commons.exceptions.GlobalExceptionHandler;
import com.longtran.commonservice.models.dtos.response.ItemResponse;
import com.longtran.commonservice.models.entity.Item;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AppConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        // Tùy chỉnh mapping cho Item -> ItemResponse
        modelMapper.typeMap(Item.class, ItemResponse.class)
                .addMappings(mapper -> {
                    mapper.map(Item::getItemName, ItemResponse::setItemName);
                    mapper.map(Item::getItemCode, ItemResponse::setItemCode);
                    mapper.map(Item::getItemValue, ItemResponse::setItemValue);
                    mapper.map(Item::getParentItemId, ItemResponse::setParentItemId);
                    mapper.map( src -> src.getCategory().getCategoryCode(), ItemResponse::setCategory_code);
                    mapper.map(Item::getStatus, ItemResponse::setStatus);
                });
        return new ModelMapper();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {return new BCryptPasswordEncoder();}

    @Bean
    public GlobalExceptionHandler globalExceptionHandler() {
        return new GlobalExceptionHandler();
    }



}
