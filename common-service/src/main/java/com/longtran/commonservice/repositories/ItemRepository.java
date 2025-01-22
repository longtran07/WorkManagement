package com.longtran.commonservice.repositories;

import com.longtran.commonservice.models.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    boolean existsByItemName(String itemName);
    boolean existsByItemCode(String itemCode);
    boolean existsByItemValue(String itemValue);
}
