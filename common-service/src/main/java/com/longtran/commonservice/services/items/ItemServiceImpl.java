package com.longtran.commonservice.services.items;

import com.longtran.commonlibrary.exceptions.DataNotFoundException;
import com.longtran.commonservice.models.dtos.request.ItemRequest;
import com.longtran.commonservice.models.dtos.response.ItemResponse;
import com.longtran.commonservice.models.entity.Category;
import com.longtran.commonservice.models.entity.Item;
import com.longtran.commonservice.repositories.CategoryRepository;
import com.longtran.commonservice.repositories.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
@RequiredArgsConstructor

public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    @Override
    public Item createItem(ItemRequest itemRequest) {
        if(itemRepository.existsByItemCode(itemRequest.getItemCode())){
            throw new DataNotFoundException("Item code already exists");
        }
        if(itemRepository.existsByItemName(itemRequest.getItemName())){
            throw new DataNotFoundException("Item name already exists");
        }
        Category category=categoryRepository.findById(itemRequest.getCategoryId()).orElseThrow(
                () -> new DataNotFoundException("Category not found")
        );
        Item item=Item.builder()
                .itemName(itemRequest.getItemName())
                .itemCode(itemRequest.getItemCode())
                .itemValue(itemRequest.getItemValue())
                .parentItemId(itemRequest.getParentItemId())
                .category(category)
                .status(itemRequest.getStatus())
                .build();
        return itemRepository.save(item);
    }

    @Override
    public Item updateItem(Long id,ItemRequest itemRequest) {
        Item item = itemRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Item with id " + id + " not found")
        );
        if(itemRepository.existsByItemCode(itemRequest.getItemCode())){
            throw new DataNotFoundException("Item code already exists");
        }
        item.setItemCode(itemRequest.getItemCode());
        if(itemRepository.existsByItemName(itemRequest.getItemName())){
            throw new DataNotFoundException("Item name already exists");
        }
        item.setItemName(itemRequest.getItemName());

        Category category=categoryRepository.findById(itemRequest.getCategoryId()).orElseThrow(
                () -> new DataNotFoundException("Category not found")
        );
        item.setItemValue(itemRequest.getItemValue());
        item.setParentItemId(itemRequest.getParentItemId());
        item.setCategory(category);
        item.setStatus(itemRequest.getStatus());

        return itemRepository.save(item);
    }

    @Override
    public void deleteItem(Long id) {
        Item item = itemRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Item with id " + id + " not found")
        );
        itemRepository.delete(item);

    }


    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public Item getItemById(Long id) {
        return itemRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Item with id " + id + " not found")
        );
    }
}
