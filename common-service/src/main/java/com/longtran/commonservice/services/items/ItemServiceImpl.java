package com.longtran.commonservice.services.items;

import com.longtran.commons.exceptions.DataNotFoundException;
import com.longtran.commonservice.models.dtos.request.DeleteRequest;
import com.longtran.commonservice.models.dtos.request.ItemRequest;
import com.longtran.commonservice.models.dtos.request.SearchItemRequest;
import com.longtran.commonservice.models.dtos.response.CategoryResponse;
import com.longtran.commonservice.models.dtos.response.ItemListResponse;
import com.longtran.commonservice.models.dtos.response.ItemResponse;
import com.longtran.commonservice.models.dtos.response.ListItemNameResponse;
import com.longtran.commonservice.models.entity.Category;
import com.longtran.commonservice.models.entity.Item;
import com.longtran.commonservice.repositories.CategoryRepository;
import com.longtran.commonservice.repositories.ItemRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class ItemServiceImpl implements ItemService {
    ItemRepository itemRepository;
    CategoryRepository categoryRepository;
    ModelMapper modelMapper;

    @Override
    public Item createItem(ItemRequest itemRequest) {
        if(itemRepository.existsByItemCode(itemRequest.getItemCode())){
            throw new DataNotFoundException("Item code already exists");
        }
        Optional<Category> category= Optional.ofNullable(categoryRepository.findByCategoryCode(itemRequest.getCategoryCode()));
        if(category.isPresent()){
            Item item=Item.builder()
                    .itemName(itemRequest.getItemName())
                    .itemCode(itemRequest.getItemCode())
                    .itemValue(itemRequest.getItemValue())
                    .parentItemId(itemRequest.getParentItemId())
                    .category(category.get())
                    .status(itemRequest.getStatus())
                    .build();
            return itemRepository.save(item);
        }
        else throw new DataNotFoundException("Category not found");

    }

    @Override
    public Item updateItem(Long id,ItemRequest itemRequest) {
        Item item = itemRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Item with id " + id + " not found")
        );
        // Check if item code already exists, excluding the current item
        if(itemRepository.existsByItemCodeAndItemIdNot(itemRequest.getItemCode(), id)){
            throw new DataNotFoundException("Item code already exists");
        }
        item.setItemCode(itemRequest.getItemCode());
        item.setItemName(itemRequest.getItemName());

        Optional<Category> category= Optional.ofNullable(categoryRepository.findByCategoryCode(itemRequest.getCategoryCode()));
        if(category.isPresent()){
            item.setCategory(category.get());
        }else throw new DataNotFoundException("Category not found");
        item.setItemValue(itemRequest.getItemValue());
        item.setParentItemId(itemRequest.getParentItemId());
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
    public List<ItemResponse> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items.stream()
                .map(item -> modelMapper.map(item, ItemResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemResponse> getItemByCategoryId(Long categoryId) {
        return itemRepository.findItemByCategoryCategoryId(categoryId)
                .stream()
                .map(item -> modelMapper.map(item,ItemResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ItemResponse> getItemByCategoryCode(String categoryCode) {
        return itemRepository.findItemByCategoryCategoryCode(categoryCode)
                .stream()
                .map(item -> modelMapper.map(item,ItemResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public Item getItemById(Long id) {
        return itemRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Item with id " + id + " not found")
        );
    }

    @Override
    public Page<ItemResponse> getAllItemsPage(Pageable pageable) {
        Page<Item> itemPage;
        itemPage=itemRepository.findAll(pageable);
        return itemPage.map(item -> modelMapper.map(item, ItemResponse.class));
    }

    @Override
    @Transactional
    public void deleteByItemCode(String itemCode) {
        itemRepository.deleteByItemCode(itemCode);

    }

    @Override
    public void deleteItems(DeleteRequest deleteRequest) {
        List<Long> ids = deleteRequest.getIds();
        for (Long id : ids) {
            itemRepository.findById(id).orElseThrow(
                    () -> new DataNotFoundException("Item with id " + id + " not found")
            );
            deleteItem(id);

        }
    }

        @Override
        public ItemListResponse searchItems (SearchItemRequest searchItemRequest){
            Page<Item> itemPage = itemRepository.searchItems(
                    searchItemRequest.getItemCode(),
                    searchItemRequest.getItemName(),
                    searchItemRequest.getCategoryCode(),
                    PageRequest.of(searchItemRequest.getPage(),searchItemRequest.getSize())
            );

            Page<ItemResponse> itemResponsePage=itemPage.map(
                    item -> modelMapper.map(item, ItemResponse.class));

            return ItemListResponse.builder()
                    .itemResponses(itemResponsePage.getContent())
                    .totalPages(itemResponsePage.getTotalPages())
                    .currentPage(itemResponsePage.getNumber())
                    .pageSize(itemResponsePage.getSize())
                    .totalItems(itemResponsePage.getTotalElements())
                    .isFirst(itemResponsePage.isFirst())
                    .isLast(itemResponsePage.isLast())
                    .hasNext(itemResponsePage.hasNext())
                    .hasPrevious(itemResponsePage.hasPrevious())
                    .build();
        }


}
