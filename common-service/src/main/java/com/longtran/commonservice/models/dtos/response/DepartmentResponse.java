package com.longtran.commonservice.models.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.longtran.commonservice.models.entity.Department;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentResponse {

    private String departmentId;

    private String departmentCode;

    private String departmentName;

    private Long parentDepartmentId;

    private Integer status;
}
