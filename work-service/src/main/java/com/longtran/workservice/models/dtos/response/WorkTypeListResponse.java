package com.longtran.workservice.models.dtos.response;

import com.longtran.commons.models.dtos.response.PageableParam;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class WorkTypeListResponse extends PageableParam {
    List<WorkTypeResponse> workTypeResponse;
}
