package com.example.ShopApp.sevices.impl;

import com.example.ShopApp.dtos.CouponConditionDTO;
import com.example.ShopApp.exceptions.DataNotFoundException;
import com.example.ShopApp.response.CouponConditionResponse;

public interface CouponConditionServiceImpl {
    CouponConditionResponse createCouponCondition(CouponConditionDTO couponConditionDTO) throws DataNotFoundException;
    CouponConditionResponse updateCouponCondition(Long couponConditionId, CouponConditionDTO couponConditionDTO) throws DataNotFoundException;
    void deleteCouponCondition(Long couponConditionId);
}
