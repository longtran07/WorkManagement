package com.longtran.workservice.models.entity;

import com.longtran.commons.models.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "WO_TYPE")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class WorkType extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "WO_TYPE_SEQ")
    @SequenceGenerator(name = "WO_TYPE_SEQ", sequenceName = "WO_TYPE_SEQ", allocationSize = 1)
    @Column(name = "WO_TYPE_ID", updatable = false, nullable = false)
    Long id;


    @Column(name = "WO_TYPE_CODE", length = 100)
    String woTypeCode;

    @Column(name = "WO_TYPE_NAME", columnDefinition = "NVARCHAR2(500)")
    String woTypeName;

    @Column(name = "PRIORITY_ID")
    Long priorityId;

    @Column(name = "PROCESS_TIME")
    Long processTime;

    @Column(name = "STATUS")
    Long status;
}

