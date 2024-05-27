package com.example.ShopApp.controllers;

import com.example.ShopApp.components.converters.CategoryMessageConverter;
import com.example.ShopApp.dtos.CategoryDTO;
import com.example.ShopApp.entity.Category;
import com.example.ShopApp.exceptions.DataNotFoundException;
import com.example.ShopApp.response.BaseResponse;
import com.example.ShopApp.response.CategoryResponse;
import com.example.ShopApp.sevices.impl.CategorySeviceImpl;
import com.example.ShopApp.components.LocalizationUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.LocaleResolver;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/categories")
@RequiredArgsConstructor
//@Validated
public class CategoryController {
    private final CategorySeviceImpl categorySeviceimpl;
    private final LocalizationUtils localizationUtils;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryDTO categoryDTO, BindingResult result){
        if(result.hasErrors()){
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        }
        Category category = categorySeviceimpl.createCategory(categoryDTO);
        CategoryResponse categoryResponse = CategoryResponse.fromCategory(category);
        BaseResponse baseResponse = BaseResponse.builder()
                .message("Create category successfully")
                .data(categoryResponse)
                .build();
//        this.kafkaTemplate.send("insert-a-category", categoryResponse);//producer
//        this.kafkaTemplate.setMessageConverter(new CategoryMessageConverter());
        return ResponseEntity.ok(baseResponse);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllCategories(){
        List<CategoryResponse> categoryResponses = categorySeviceimpl.getAllCategories();
        BaseResponse baseResponse = BaseResponse.builder()
                .data(categoryResponses)
                .build();
//        this.kafkaTemplate.send("get-all-categories", categoryResponses);

        return ResponseEntity.ok(baseResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getCategoryById(@PathVariable(value = "id") Long categoryId) throws DataNotFoundException {
        CategoryResponse categoryResponse = categorySeviceimpl.getCategoryById(categoryId);
        return ResponseEntity.ok(
                BaseResponse.builder()
                        .message("Get category by id success")
                        .status(HttpStatus.OK.value())
                        .data(categoryResponse)
                        .build()
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryDTO categoryDTO) throws DataNotFoundException {
        CategoryResponse categoryResponse = categorySeviceimpl.updateCategory(id, categoryDTO);
        BaseResponse baseResponse = BaseResponse.builder()
                .message(localizationUtils.getLocalizedMessage("category.update_category.update_successfully"))
                .data(categoryResponse)
                .build();
        return ResponseEntity.ok(baseResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> deleteCategory(@PathVariable Long id){
        categorySeviceimpl.deleteCategory(id);
        BaseResponse baseResponse = BaseResponse.builder()
                .message("Delete category successfully")
                .build();
        return ResponseEntity.ok(baseResponse);
    }
}
