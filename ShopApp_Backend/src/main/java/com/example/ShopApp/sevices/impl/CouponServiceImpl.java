package com.example.ShopApp.sevices.impl;

import com.example.ShopApp.dtos.CouponDTO;
import com.example.ShopApp.exceptions.DataNotFoundException;
import com.example.ShopApp.response.CouponResponse;

import java.util.List;

public interface CouponServiceImpl {
    List<CouponResponse> getAllCoupon();
    CouponResponse createCoupon(CouponDTO couponDTO);
    CouponResponse updateCoupon(Long couponId, CouponDTO couponDTO) throws DataNotFoundException;
    CouponResponse deleteOrActiveCoupon(Long couponId) throws DataNotFoundException;
    CouponResponse calculateCoupon(String couponCode, double totalAmount);
}
