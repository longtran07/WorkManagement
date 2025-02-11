package com.longtran.commonservice.services.category;

import com.longtran.commonservice.models.dtos.request.CategoryRequest;
import com.longtran.commonservice.models.dtos.request.DeleteRequest;
import com.longtran.commonservice.models.dtos.request.department.DepartmentRequest;
import com.longtran.commonservice.models.dtos.response.CategoryResponse;
import com.longtran.commonservice.models.dtos.response.DepartmentResponse;
import com.longtran.commonservice.models.entity.Category;
import com.longtran.commonservice.models.entity.Department;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {
    Page<CategoryResponse> getAllCategories(int page, int size );
    Category getCategoryById(Long id);
    Category addCategory(CategoryRequest categoryRequest);
    Category updateCategory(Long categoryId, CategoryRequest categoryRequest);
    void deleteCategory(Long id);


    void deleteByCategoryCode(String categoryCode);
    void deleteCategories(DeleteRequest deleteRequest);
    Page<CategoryResponse> searchCategories(String categoryCode, String categoryName, int page, int size);
}
