package com.longtran.workservice.models.entity;

import com.longtran.commons.models.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "WO_HISTORY")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class WorkOrderHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "WO_HISTORY_SEQ")
    @SequenceGenerator(name = "WO_HISTORY_SEQ", sequenceName = "WO_HISTORY_SEQ", allocationSize = 1)
    @Column(name = "WO_HISTORY_ID", updatable = false, nullable = false)
    Long id;

    @Column(name = "WO_ID")
    Long woId;

    @Column(name = "WO_CODE", length = 100)
    String woCode;

    @Column(name = "WO_CONTENT", columnDefinition = "CLOB")
    String woContent;

}

