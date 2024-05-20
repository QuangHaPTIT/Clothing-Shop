package com.example.ShopApp.controllers;

import com.example.ShopApp.dtos.CouponDTO;
import com.example.ShopApp.exceptions.DataNotFoundException;
import com.example.ShopApp.response.BaseResponse;
import com.example.ShopApp.response.CouponResponse;
import com.example.ShopApp.sevices.impl.CouponServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/coupons")
@RequiredArgsConstructor
public class CouponController {
    private final CouponServiceImpl couponService;

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> getAllCoupon() {
        List<CouponResponse> couponResponseList = couponService.getAllCoupon();
        return ResponseEntity.ok(BaseResponse.builder()
                .data(couponResponseList)
                .message("Get all coupon success")
                .build());
    }

    @GetMapping("/calculate")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<BaseResponse> calculateCoupon(@RequestParam("coupon_code") String couponCode,
                                                        @RequestParam("total_amount") double totalAmount
                                                        ){
        CouponResponse couponResponse = couponService.calculateCoupon(couponCode, totalAmount);
        return ResponseEntity.ok(BaseResponse.builder()
                .message("Apply discount code successfully")
                .data(couponResponse)
                .build());

    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> createCoupon(@Valid @RequestBody CouponDTO couponDTO) {
        CouponResponse couponResponse = couponService.createCoupon(couponDTO);
        return ResponseEntity.ok(BaseResponse.builder()
                .data(couponResponse)
                .message("Create coupon success")
                .build());

    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> updateCoupon(@PathVariable(value = "id") Long couponId,
                                                     @Valid @RequestBody CouponDTO couponDTO) throws DataNotFoundException {
        CouponResponse couponResponse = couponService.updateCoupon(couponId, couponDTO);
        return ResponseEntity.ok(
                BaseResponse.builder()
                        .message("Update coupon success")
                        .data(couponResponse)
                        .build());

    }

    //xóa mềm
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> deleteCoupon(@PathVariable(value = "id") Long couponId) throws DataNotFoundException {
        CouponResponse couponResponse = couponService.deleteOrActiveCoupon(couponId);
        return ResponseEntity.ok(BaseResponse.builder().build());
    }
}
