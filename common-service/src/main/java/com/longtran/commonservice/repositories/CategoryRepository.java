package com.longtran.commonservice.repositories;

import com.longtran.commonservice.models.entity.Category;
import com.longtran.commonservice.models.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByCategoryCode(String categoryCode);
    Category findByCategoryCode(String categoryCode);

    Page<Category> findAll(Pageable pageable);//phân trang

    void deleteByCategoryCode(String categoryCode);

    @Query("SELECT c FROM Category c WHERE "
            + "(:categoryCode IS NULL OR LOWER(c.categoryCode) LIKE LOWER(CONCAT('%', :categoryCode, '%'))) AND "
            + "(:categoryName IS NULL OR LOWER(c.categoryName) LIKE LOWER(CONCAT('%', :categoryName, '%')))")
    Page<Category> searchCategories(@Param("categoryCode") String categoryCode,
                                    @Param("categoryName") String categoryName
            , Pageable pageable);

}
