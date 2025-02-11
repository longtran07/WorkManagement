package com.longtran.commonservice.controllers;

import com.longtran.commonservice.models.dtos.request.DeleteRequest;
import com.longtran.commonservice.models.dtos.request.ItemRequest;
import com.longtran.commonservice.models.dtos.response.*;
import com.longtran.commonservice.models.entity.Item;
import com.longtran.commonservice.services.items.ItemService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/item")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true , level = AccessLevel.PRIVATE)
public class ItemController {
    ItemService itemService;
    ModelMapper modelMapper;
    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size ) {
        Pageable pageable = PageRequest.of(page, size);

        Page<ItemResponse> itemResponsePage = itemService.getAllItems(pageable);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Get all Departments")
                .result(
                        ItemListResponse.builder()
                                .itemResponses(itemResponsePage.getContent())
                                .totalPages(itemResponsePage.getTotalPages())
                                .currentPage(itemResponsePage.getNumber())
                                .pageSize(itemResponsePage.getSize())
                                .totalItems(itemResponsePage.getTotalElements())
                                .isFirst(itemResponsePage.isFirst())
                                .isLast(itemResponsePage.isLast())
                                .hasNext(itemResponsePage.hasNext())
                                .hasPrevious(itemResponsePage.hasPrevious())
                                .build()
                ) // Sử dụng content của Page object
                .build());

    }

    @GetMapping("/search")
    public ResponseEntity<ResponseObject> searchCategories(
            @RequestParam(required = false) String itemCode,
            @RequestParam(required = false) String itemName,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size  ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ItemResponse> itemResponsePage = itemService.searchItems(
                itemCode,itemName,categoryId,pageable
        );
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Get all Departments")
                .result(
                        ItemListResponse.builder()
                                .itemResponses(itemResponsePage.getContent())
                                .totalPages(itemResponsePage.getTotalPages())
                                .currentPage(itemResponsePage.getNumber())
                                .pageSize(itemResponsePage.getSize())
                                .totalItems(itemResponsePage.getTotalElements())
                                .isFirst(itemResponsePage.isFirst())
                                .isLast(itemResponsePage.isLast())
                                .hasNext(itemResponsePage.hasNext())
                                .hasPrevious(itemResponsePage.hasPrevious())
                                .build()
                ) // Sử dụng content của Page object
                .build());

    }


    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getItemById(@PathVariable Long id){
        Item item = itemService.getItemById(id);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Item with id: "+id)
                        .result(modelMapper.map(item, ItemResponse.class))
                        .build()
        );
    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> createItem(@RequestBody ItemRequest itemRequest){
        Item item= itemService.createItem(itemRequest);
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.CREATED)
                        .message("Item created")
                        .result(item)
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateItem(@PathVariable Long id, @RequestBody ItemRequest itemRequest){
        Item item = itemService.updateItem(id, itemRequest);
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Update Success")
                        .result(modelMapper.map(item, ItemResponse.class))
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteItem(@PathVariable Long id){
        itemService.deleteItem(id);
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Delete item success")
                        .build()
        );
    }

    @DeleteMapping("/delete-by-item-code/{itemCode}")
    public ResponseEntity<ResponseObject> deleteByItemCode(@PathVariable("itemCode") String itemCode) {
        itemService.deleteByItemCode(itemCode);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Item deleted successfully")
                .build());
    }

    @DeleteMapping("/batch")
    public ResponseEntity<ResponseObject> deleteCategories(@RequestBody DeleteRequest request) {

        itemService.deleteItems(request);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Deleted Item "+ request.getIds().toString() +" successfully")
                .build());
    }
}
