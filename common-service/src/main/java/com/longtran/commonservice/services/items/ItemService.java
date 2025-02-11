package com.longtran.commonservice.services.items;

import com.longtran.commonservice.models.dtos.request.DeleteRequest;
import com.longtran.commonservice.models.dtos.request.ItemRequest;
import com.longtran.commonservice.models.dtos.response.CategoryResponse;
import com.longtran.commonservice.models.dtos.response.ItemResponse;
import com.longtran.commonservice.models.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ItemService {
    Item createItem(ItemRequest item);
    Item updateItem(Long id,ItemRequest item);
    void deleteItem(Long id);
//    List<Item> getAllItems();
    Item getItemById(Long id);
    Page<ItemResponse> getAllItems(Pageable pageable);


    void deleteByItemCode(String itemCode);
    void deleteItems(DeleteRequest deleteRequest);
    Page<ItemResponse> searchItems(
            String itemCode, String itemName,Long categoryId, Pageable pageable);
}
