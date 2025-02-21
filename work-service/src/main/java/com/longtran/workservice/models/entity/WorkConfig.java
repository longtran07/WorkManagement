package com.longtran.workservice.models.entity;

import com.longtran.commons.models.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "WO_CONFIG_BUSINESS")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class WorkConfig extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "WO_CONFIG_BUSINESS_SEQ")
    @SequenceGenerator(name = "WO_CONFIG_BUSINESS_SEQ", sequenceName = "WO_CONFIG_BUSINESS_SEQ", allocationSize = 1)
    @Column(name = "CONFIG_BUSINESS_ID", updatable = false, nullable = false)
    Long id;

    @Column(name = "WO_TYPE_ID")
    Long woTypeId;

    @Column(name = "PRIORITY_ID")
    Long priorityId;

    @Column(name = "OLD_STATUS")
    Long oldStatus;

    @Column(name = "NEW_STATUS")
    Long newStatus;

}
