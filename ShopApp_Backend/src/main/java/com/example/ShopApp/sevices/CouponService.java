package com.example.ShopApp.sevices;

import com.example.ShopApp.dtos.CouponDTO;
import com.example.ShopApp.entity.Coupon;
import com.example.ShopApp.entity.CouponCondition;
import com.example.ShopApp.exceptions.DataNotFoundException;
import com.example.ShopApp.repositories.CouponConditionRepository;
import com.example.ShopApp.repositories.CouponRepository;
import com.example.ShopApp.response.CouponResponse;
import com.example.ShopApp.sevices.impl.CouponServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CouponService implements CouponServiceImpl {
    private final CouponRepository couponRepository;
    private final CouponConditionRepository couponConditionRepository;
    private final ModelMapper modelMapper;
    @Override
    public List<CouponResponse> getAllCoupon() {
        List<Coupon> coupons = couponRepository.findAll();
        List<CouponResponse> couponResponses = coupons.stream().map(CouponResponse::fromCoupon)
                .collect(Collectors.toList());
        return couponResponses;
    }

    @Override
    @Transactional
    public CouponResponse createCoupon(CouponDTO couponDTO) {
        Coupon coupon = Coupon.builder()
                .active(couponDTO.isActive())
                .code(couponDTO.getCode())
                .build();
        couponRepository.save(coupon);
        return CouponResponse.fromCoupon(coupon);
    }

    @Override
    @Transactional
    public CouponResponse updateCoupon(Long couponId, CouponDTO couponDTO) throws DataNotFoundException {
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new DataNotFoundException("Coupon' id not found!"));
        modelMapper.map(couponDTO, coupon);
        return CouponResponse.fromCoupon(coupon);
    }

    @Override
    @Transactional
    public CouponResponse deleteOrActiveCoupon(Long couponId) throws DataNotFoundException {
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new DataNotFoundException("Coupon' id not found!"));
        coupon.setActive(!coupon.isActive());
        return CouponResponse.fromCoupon(coupon);
    }

    @Override
    public CouponResponse calculateCoupon(String couponCode, double totalAmount) {
        Coupon coupon = couponRepository.findByCode(couponCode).orElseThrow(() -> new IllegalArgumentException("Coupon not found"));
        if(!coupon.isActive()) {
            throw new IllegalArgumentException("Coupon is not active");
        }
        double discount = calculateDiscount(coupon, totalAmount);
        double finalAmount = totalAmount - discount;
        return CouponResponse.builder()
                .totalAmount(finalAmount)
                .code(couponCode)
                .active(coupon.isActive())
                .build();
    }

    private double calculateDiscount(Coupon coupon, double totalAmount) {
        List<CouponCondition> couponConditions = couponConditionRepository.findByCouponId(coupon.getId());
        double result = 0.0;
        double updateTotalAmount = totalAmount;
        for(CouponCondition couponCondition : couponConditions) {
            String attribute = couponCondition.getAttribute();
            String operator = couponCondition.getOperator();
            String value = couponCondition.getValue();
            Double percentDiscount = Double.parseDouble(String.valueOf(couponCondition.getDiscountAmount()));

            if(attribute.equals("minimum_amount")) {
                if(operator.equals(">") && updateTotalAmount > Double.parseDouble(value)){
                    result += updateTotalAmount * percentDiscount / 100;
                }
            }else if(attribute.equals("applicable_date")) {
                LocalDate applicableDate = LocalDate.parse(value);
                LocalDate currentDate = LocalDate.now();
                if(operator.equalsIgnoreCase("BETWEEN") && currentDate.isEqual(applicableDate)) {
                    result += updateTotalAmount * percentDiscount / 100;
                }else if(operator.equalsIgnoreCase("BEFORE") && currentDate.isBefore(applicableDate)) {
                    result += updateTotalAmount * percentDiscount / 100;
                }
            }
            updateTotalAmount = updateTotalAmount - result;
        }
        return result;
    }

//    INSERT INTO coupons(id, code) VALUES (1, 'HEAVEN');
//    INSERT INTO coupons(id, code) VALUES (2, 'DISCOUNT20');
//
//    INSERT INTO coupon_conditions (id, coupon_id, attribute, operator, value, discount_amount)
//    VALUES (1, 1, 'minimum_amount', '>', '100', 10);
//
//    INSERT INTO coupon_conditions (id, coupon_id, attribute, operator, value, discount_amount)
//    VALUES (2, 1, 'applicable_date', 'BETWEEN', '2023-12-25', 5);
//
//    INSERT INTO coupon_conditions (id, coupon_id, attribute, operator, value, discount_amount)
//    VALUES (3, 2, 'minimum_amount', '>', '200', 20);
//
//    Nếu đơn hàng có tổng giá trị là 120 đô la và áp dụng coupon 1
//    Giá trị sau khi áp dụng giảm giá 10%:
//            120 đô la * (1 - 10/100) = 120 đô la * 0.9 = 108 đô la
//
//    Giá trị sau khi áp dụng giảm giá 5%:
//            108 đô la * (1 - 5/100) = 108 đô la * 0.95 = 102.6 đô la

}
