package com.example.ShopApp.sevices;

import com.example.ShopApp.dtos.CouponConditionDTO;
import com.example.ShopApp.entity.Coupon;
import com.example.ShopApp.entity.CouponCondition;
import com.example.ShopApp.exceptions.DataNotFoundException;
import com.example.ShopApp.repositories.CouponConditionRepository;
import com.example.ShopApp.repositories.CouponRepository;
import com.example.ShopApp.response.CouponConditionResponse;
import com.example.ShopApp.sevices.impl.CouponConditionServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CouponConditionService implements CouponConditionServiceImpl {
    private final CouponRepository couponRepository;
    private final CouponConditionRepository couponConditionRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public CouponConditionResponse createCouponCondition(CouponConditionDTO couponConditionDTO) throws DataNotFoundException {
        Coupon coupon = couponRepository.findById(couponConditionDTO.getCouponId())
                .orElseThrow(() -> new DataNotFoundException("Coupon's id not found"));
        CouponCondition couponCondition = CouponCondition.builder()
                .coupon(coupon)
                .attribute(couponConditionDTO.getAttribute())
                .discountAmount(couponConditionDTO.getDiscountAmount())
                .operator(couponConditionDTO.getOperator())
                .value(couponConditionDTO.getValue())
                .build();
        couponConditionRepository.save(couponCondition);
        return CouponConditionResponse.fromCouponCondition(couponCondition);
    }

    @Override
    @Transactional
    public CouponConditionResponse updateCouponCondition(Long couponConditionId, CouponConditionDTO couponConditionDTO) throws DataNotFoundException {
        CouponCondition couponCondition = couponConditionRepository.findById(couponConditionId)
                .orElseThrow(() -> new DataNotFoundException("Coupon Condition not found"));
        Coupon coupon = couponRepository.findById(couponConditionDTO.getCouponId())
                .orElseThrow(() -> new DataNotFoundException("Coupon not found"));
        modelMapper.map(couponConditionDTO, couponCondition);
        couponConditionRepository.save(couponCondition);
        return CouponConditionResponse.fromCouponCondition(couponCondition);
    }

    @Override
    @Transactional
    public void deleteCouponCondition(Long couponConditionId) {
        couponConditionRepository.deleteById(couponConditionId);
    }
}
