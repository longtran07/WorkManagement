package com.longtran.commonservice.repositories;

import com.longtran.commonservice.models.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    boolean existsByItemName(String itemName);
    boolean existsByItemCode(String itemCode);
    List<Item> findItemByCategoryCategoryId(Long categoryId);
    List<Item> findItemByCategoryCategoryCode(String categoryCode);

    Page<Item> findAll(Pageable pageable);//phân trang

    void deleteByItemCode(String itemCode);

    @Query("SELECT i FROM Item i WHERE "
            + "(:itemCode IS NULL OR LOWER(i.itemCode) LIKE LOWER(CONCAT('%', :itemCode, '%'))) AND "
            + "(:itemName IS NULL OR LOWER(i.itemName) LIKE LOWER(CONCAT('%', :itemName, '%'))) AND "
            + "(:categoryCode IS NULL OR LOWER(i.category.categoryCode) LIKE LOWER(CONCAT('%', :categoryCode, '%')))")
    Page<Item> searchItems(
            @Param("itemCode") String itemCode,
            @Param("itemName") String itemName,
            @Param("categoryCode") String categoryCode
            , Pageable pageable);


    boolean existsByItemCodeAndItemIdNot(String itemCode, Long id);
    boolean existsByItemNameAndItemIdNot(String itemName, Long id);

}
