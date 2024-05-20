package com.example.ShopApp.controllers;

import com.example.ShopApp.dtos.CouponConditionDTO;
import com.example.ShopApp.exceptions.DataNotFoundException;
import com.example.ShopApp.response.BaseResponse;
import com.example.ShopApp.response.CouponConditionResponse;
import com.example.ShopApp.sevices.impl.CouponConditionServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/coupon_conditions")
@RequiredArgsConstructor
public class CouponConditionController {
    private final CouponConditionServiceImpl couponConditionService;
    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> createCouponCondition(@Valid @RequestBody CouponConditionDTO couponConditionDTO) throws DataNotFoundException {
        CouponConditionResponse couponConditionResponse = couponConditionService.createCouponCondition(couponConditionDTO);
        return ResponseEntity.ok(BaseResponse.builder()
                .data(couponConditionResponse)
                .message("Create coupon condition success")
                .build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> updateCouponCondition(@PathVariable(value = "id") Long couponConditionId,
                                                              @Valid @RequestBody CouponConditionDTO couponConditionDTO) throws DataNotFoundException {
        CouponConditionResponse couponConditionResponse = couponConditionService.updateCouponCondition(couponConditionId, couponConditionDTO);
        return ResponseEntity.ok(BaseResponse.builder()
                .data(couponConditionResponse)
                .message("Update coupon condition success")
                .build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> deleteCouponCondition(@PathVariable(value = "id") Long couponConditionId) {
        couponConditionService.deleteCouponCondition(couponConditionId);
        return ResponseEntity.ok(BaseResponse.builder()
                .data(null)
                .message("Delete coupon condition success")
                .build());
    }
}
