package com.longtran.commonservice.services.items;

import com.longtran.commonservice.models.dtos.request.ItemRequest;
import com.longtran.commonservice.models.dtos.response.ItemResponse;
import com.longtran.commonservice.models.entity.Item;

import java.util.List;

public interface ItemService {
    Item createItem(ItemRequest item);
    Item updateItem(Long id,ItemRequest item);
    void deleteItem(Long id);
    List<Item> getAllItems();
    Item getItemById(Long id);
}
