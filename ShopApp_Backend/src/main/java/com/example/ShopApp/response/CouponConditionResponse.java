package com.example.ShopApp.response;

import com.example.ShopApp.entity.CouponCondition;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CouponConditionResponse {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("coupon_id")
    private Long couponId;

    @JsonProperty("attribute")
    private String attribute;

    @JsonProperty("operator")
    private String operator;

    @JsonProperty("value")
    private String value;

    @JsonProperty("discount_amount")
    private BigDecimal discountAmount;

    public static CouponConditionResponse fromCouponCondition(CouponCondition couponCondition) {
        return CouponConditionResponse.builder()
                .id(couponCondition.getId())
                .couponId(couponCondition.getCoupon().getId())
                .attribute(couponCondition.getAttribute())
                .value(couponCondition.getValue())
                .operator(couponCondition.getOperator())
                .discountAmount(couponCondition.getDiscountAmount())
                .build();
    }
}
