package com.longtran.commonservice.repositories;

import com.longtran.commonservice.models.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends JpaRepository<Item, Long> {
    boolean existsByItemName(String itemName);
    boolean existsByItemCode(String itemCode);
    boolean existsByItemValue(String itemValue);

    Page<Item> findAll(Pageable pageable);//phân trang

    void deleteByItemCode(String itemCode);

    @Query("SELECT i FROM Item i WHERE "
            + "(:itemCode IS NULL OR LOWER(i.itemCode) LIKE LOWER(CONCAT('%', :itemCode, '%'))) AND "
            + "(:itemName IS NULL OR LOWER(i.itemName) LIKE LOWER(CONCAT('%', :itemName, '%'))) AND "
            + "(:categoryId IS NULL OR i.category.categoryId = :categoryId)")
    Page<Item> searchItems(@Param("itemCode") String itemCode,
                                    @Param("itemName") String itemName,
            @Param("categoryId") Long categoryId
            , Pageable pageable);
}
