package com.longtran.commonservice.repositories;

import com.longtran.commonservice.models.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByCategoryCode(String categoryCode);

    Page<Category> findAll(Pageable pageable);//phân trang


}
