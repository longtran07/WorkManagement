package com.longtran.commonservice.controllers;

import com.longtran.commonservice.models.dtos.request.ItemRequest;
import com.longtran.commonservice.models.dtos.response.ItemResponse;
import com.longtran.commonservice.models.dtos.response.ResponseObject;
import com.longtran.commonservice.models.entity.Item;
import com.longtran.commonservice.services.items.ItemService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
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
    public ResponseEntity<ResponseObject> getAllItems(){
        List<Item> items = itemService.getAllItems();
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("List of items")
//                        .result(items
//                                .stream()
//                                .map(item -> modelMapper.map(item, ItemResponse.class)
//                        ))

                        .result(items
                                .stream()
                                .map(ItemResponse::fromItem)
                                .collect(Collectors.toList())
                        )
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getItemById(@PathVariable Long id){
        Item item = itemService.getItemById(id);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Item with id: "+id)
//                        .result(modelMapper.map(item, ItemResponse.class))

                        .result(ItemResponse.fromItem(item))
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
}
