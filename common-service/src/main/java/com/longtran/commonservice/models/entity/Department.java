package com.longtran.commonservice.models.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "department")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Department extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "department_seq")
    @SequenceGenerator(name = "department_seq", sequenceName = "DEPARTMENT_SEQ", allocationSize = 1)
    @Column(name = "department_id", nullable = false, updatable = false)
    private Long departmentId;

    @Column(name = "department_code",length = 100)
    private String departmentCode;
    @Column(name = "department_name",length = 500)
    private String departmentName;
    @Column(name = "parent_department_id")
    private Long parentDepartmentId;

    @Column(name = "status")
    private Integer status;

    @OneToMany(mappedBy = "department",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<User> users;

}
