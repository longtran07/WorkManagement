package com.longtran.commonservice.controllers;

import com.longtran.commonservice.models.dtos.request.CategoryRequest;
import com.longtran.commonservice.models.dtos.request.DeleteRequest;
import com.longtran.commonservice.models.dtos.response.*;
import com.longtran.commonservice.models.entity.Category;
import com.longtran.commonservice.services.category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final ModelMapper modelMapper;

    @GetMapping("/page")
    public ResponseEntity<ResponseObject> getAllCategoriesPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<CategoryResponse> categoryResponsePage = categoryService.getAllCategoriesPage(page, size);

        int totalPages= categoryResponsePage.getTotalPages();
        List<CategoryResponse>categoryResponses=categoryResponsePage.getContent();
        return ResponseEntity.ok().body(ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Get all categories")
                        .result(CategoryListResponse.builder()
                                .categoryResponses(categoryResponses)
                                .totalPages(totalPages).build()) // Sử dụng content của Page object

                .build());
    }

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllCategories() {
        List<CategoryResponse>categoryResponses=categoryService.getAllCategories();
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Get all categories")
                .result(categoryResponses)
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseObject> searchCategories(
            @RequestParam(required = false) String categoryCode,
            @RequestParam(required = false) String categoryName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size ) {
        Page<CategoryResponse> categoryResponsesPages = categoryService.searchCategories(
                categoryCode,
                categoryName,
                page,
                size);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Get all Departments")
                .result(
                        CategoryListResponse.builder()
                                .categoryResponses(categoryResponsesPages.getContent())
                                .totalPages(categoryResponsesPages.getTotalPages())
                                .currentPage(categoryResponsesPages.getNumber())
                                .pageSize(categoryResponsesPages.getSize())
                                .totalItems(categoryResponsesPages.getTotalElements())
                                .isFirst(categoryResponsesPages.isFirst())
                                .isLast(categoryResponsesPages.isLast())
                                .hasNext(categoryResponsesPages.hasNext())
                                .hasPrevious(categoryResponsesPages.hasPrevious())
                                .build()
                ) // Sử dụng content của Page object
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getCategoryById(@PathVariable("id") Long id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok().body(com.longtran.commonservice.models.dtos.response.ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Get category information successfully")
                        .result(modelMapper.map(category, CategoryResponse.class))
                .build());
    }
    @GetMapping("/categoryCode/{categoryCode}")
    public ResponseEntity<ResponseObject> getCategoryByCategoryCode(
            @RequestParam("categoryCode") String categoryCode) {
        CategoryResponse categoryByCategoryCode = categoryService.getCategoryByCategoryCode(categoryCode);
        return ResponseEntity.ok().body(com.longtran.commonservice.models.dtos.response.ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Get category information successfully")
                .result(categoryByCategoryCode)
                .build());
    }
    @PostMapping("")
    public ResponseEntity<?> createCategory(@RequestBody CategoryRequest categoryRequest) {
        Category category=categoryService.addCategory(categoryRequest);
        return ResponseEntity.ok().body(ResponseObject.builder()
                        .status(HttpStatus.CREATED)
                        .message("Create category successfully")
                        .result(category)
                        .build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateCategory(
            @PathVariable("id") Long id,
            @RequestBody CategoryRequest categoryRequest) {
        Category category = categoryService.updateCategory(id, categoryRequest);
        return ResponseEntity.ok().body(ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Update category successfully")
                        .result(category)
                .build());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().body(
                    ResponseObject.builder()
                            .status(HttpStatus.OK)
                            .message("Deleted Category with id : " + id + "successfully")
                        .build());
    }

    @DeleteMapping("/delete-by-category-code/{categoryCode}")
    public ResponseEntity<ResponseObject> deleteByCategoryCode(@PathVariable("categoryCode") String categoryCode) {
        categoryService.deleteByCategoryCode(categoryCode);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Category deleted successfully")
                .build());
    }

    @DeleteMapping("/batch")
    public ResponseEntity<ResponseObject> deleteCategories(@RequestBody DeleteRequest request) {

        categoryService.deleteCategories(request);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Deleted Category "+ request.getIds().toString() +" successfully")
                .build());
    }

}
