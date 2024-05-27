package com.example.ShopApp.components;

import com.example.ShopApp.entity.Category;
import com.example.ShopApp.response.CategoryResponse;
import org.springframework.kafka.annotation.KafkaHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@KafkaListener(id = "groupA", topics = {"insert-a-category"})
public class MyKafkaListener {
    @KafkaHandler
    public void listenCategory(CategoryResponse categoryResponse) {
        System.out.println("Received: " + categoryResponse);
    }

    @KafkaHandler(isDefault = true)
    public void unknown(Object object) {
        System.out.println("Received unknown: " + object);
    }
    @KafkaHandler
    public void listenListOfCategories(List<CategoryResponse> categories) {
        System.out.println("Received: " + categories);
    }
}
