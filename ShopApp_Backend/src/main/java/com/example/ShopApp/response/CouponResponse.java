package com.example.ShopApp.response;

import com.example.ShopApp.entity.Coupon;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CouponResponse {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("code")
    private String code;

    @JsonProperty("active")
    private boolean active;

    @JsonProperty("total_amount")
    private Double totalAmount;
    public static CouponResponse fromCoupon(Coupon coupon) {
        return CouponResponse.builder()
                            .id(coupon.getId())
                            .code(coupon.getCode())
                            .active(coupon.isActive())
                            .build();
    }
}
