package com.longtran.commonservice.models.dtos.request;

import lombok.Data;

import java.util.List;

@Data
public class DeleteRequest {
    private List<Long> ids;
}
