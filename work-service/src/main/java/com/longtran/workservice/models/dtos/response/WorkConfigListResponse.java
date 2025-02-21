package com.longtran.workservice.models.dtos.response;

import com.longtran.commons.models.dtos.response.PageableParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class WorkConfigListResponse extends PageableParam {
    List<WorkConfigResponse> workConfigResponses;
}
