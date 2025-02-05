package com.longtran.commonservice.services.category;

import com.longtran.commonservice.models.dtos.request.CategoryRequest;
import com.longtran.commons.exceptions.DataNotFoundException;
import com.longtran.commonservice.models.dtos.response.CategoryResponse;
import com.longtran.commonservice.models.entity.Category;
import com.longtran.commonservice.repositories.CategoryRepository;
import jakarta.persistence.EntityExistsException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(makeFinal = true,level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    CategoryRepository categoryRepository;
    ModelMapper modelMapper;

    @Override
    public Page<CategoryResponse> getAllCategories(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Category> categoryPage;
        categoryPage=categoryRepository.findAll(pageable);
        return categoryPage.map(category -> modelMapper.map(category, CategoryResponse.class));
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Category not found by Id"));
    }

    @Override
    public Category addCategory(CategoryRequest categoryRequest) {
        if(categoryRepository.existsByCategoryCode(categoryRequest.getCategoryCode())) {
            throw new EntityExistsException("Category already exists");
        }
        Category category=new Category();
        category.setCreatedUser(categoryRequest.getCreatedUser());
        category.setUpdatedUser(categoryRequest.getUpdatedUser());
        category.setCategoryCode(categoryRequest.getCategoryCode());
        category.setCategoryName(categoryRequest.getCategoryName());
        category.setStatus(categoryRequest.getStatus());
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long categoryId, CategoryRequest categoryRequest) {
        Category category= getCategoryById(categoryId);
        category.setUpdatedUser(categoryRequest.getUpdatedUser());
        category.setCategoryCode(categoryRequest.getCategoryCode());
        category.setCategoryName(categoryRequest.getCategoryName());
        category.setStatus(categoryRequest.getStatus());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category= getCategoryById(id);
        categoryRepository.deleteById(id);
    }
}
