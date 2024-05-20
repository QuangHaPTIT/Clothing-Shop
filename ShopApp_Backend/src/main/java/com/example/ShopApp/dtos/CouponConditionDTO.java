package com.example.ShopApp.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CouponConditionDTO {

    @JsonProperty("coupon_id")
    private Long couponId;

    @NotBlank(message = "attribute is required")
    @JsonProperty("attribute")
    private String attribute;

    @NotBlank(message = "operator is required")
    @JsonProperty("operator")
    private String operator;

    @NotBlank(message = "value is required")
    @JsonProperty("value")
    private String value;

    @JsonProperty("discount_amount")
    private BigDecimal discountAmount;

}
