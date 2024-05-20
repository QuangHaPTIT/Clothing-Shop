package com.example.ShopApp.components.converters;
import com.example.ShopApp.entity.Category;
import com.example.ShopApp.response.CategoryResponse;
import org.springframework.kafka.support.converter.JsonMessageConverter;
import org.springframework.kafka.support.mapping.DefaultJackson2JavaTypeMapper;
import org.springframework.kafka.support.mapping.Jackson2JavaTypeMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component
public class CategoryMessageConverter extends JsonMessageConverter {
    public CategoryMessageConverter() {
        super();
        DefaultJackson2JavaTypeMapper typeMapper = new DefaultJackson2JavaTypeMapper();
        typeMapper.setTypePrecedence(Jackson2JavaTypeMapper.TypePrecedence.TYPE_ID);
        typeMapper.addTrustedPackages("com.project.ShopApp", "com.example.ShopApp.response");
        Map<String, Class<?>> idClassMapping = new HashMap<>();
        idClassMapping.put("category", Category.class);
        idClassMapping.put("categoryResponse", CategoryResponse.class);
        typeMapper.setIdClassMapping(idClassMapping);
        this.setTypeMapper(typeMapper);
    }
}
