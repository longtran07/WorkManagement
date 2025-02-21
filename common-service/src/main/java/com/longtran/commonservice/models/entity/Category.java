package com.longtran.commonservice.models.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;


import java.util.Set;

@Entity
@Table(name = "category")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder

public class Category extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "category_seq")
    @SequenceGenerator(name = "category_seq",sequenceName = "CATEGORY_SEQ")
    @Column(name = "category_id", updatable = false, nullable = false)
    Long categoryId;

    @Column(name = "category_code",length = 100)
    String categoryCode;

    @Column(name="category_name",length=500)
    String categoryName;

    @Column(name = "status")
    Long status;

    @OneToMany(mappedBy ="category" )
    @JsonManagedReference
    Set<Item> items;

}
