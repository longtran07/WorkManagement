package com.longtran.commonservice.models.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.longtran.commonservice.models.dtos.response.ItemResponse;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "item")
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor

public class Item extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_seq")
    @SequenceGenerator(name = "item_seq", sequenceName = "ITEM_SEQ", allocationSize = 1)
    @Column(name = "item_id", nullable = false, updatable = false)
    private Long itemId;

    @Column(name = "item_name", length = 500)
    private String itemName;

    @Column(name = "item_code", length = 100)
    private String itemCode;

    @Column(name = "item_value", length = 500)
    private String itemValue;

    @Column(name = "parent_item_id")
    private Long parentItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private Category category;

    private Integer status;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "item-reference")
    private Set<UserRole> userRoles = new HashSet<>();

}
