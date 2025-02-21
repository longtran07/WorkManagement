package com.longtran.workservice.models.entity;
import com.longtran.commons.models.entity.BaseEntity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "WO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class WorkOrder extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "WO_SEQ")
    @SequenceGenerator(name = "WO_SEQ", sequenceName = "WO_SEQ", allocationSize = 1)
    @Column(name = "WO_ID", updatable = false, nullable = false)
    Long id;

    @Column(name = "WO_CODE", length = 100)
    String woCode;

    @Column(name = "WO_CONTENT", columnDefinition = "CLOB")
    String woContent;

    @Column(name = "WO_TYPE_ID")
    Long woTypeId;

    @Column(name = "PRIORITY_ID")
    Long priorityId;

    @Column(name = "STATUS")
    Long status;

    @Column(name = "START_TIME")
    LocalDateTime startTime;

    @Column(name = "END_TIME")
    LocalDateTime endTime;

    @Column(name = "FINISH_TIME")
    LocalDateTime finishTime;

    @Column(name = "ASSIGN_USER_ID")
    Long assignUserId;

}
