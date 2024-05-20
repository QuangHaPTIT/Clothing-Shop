package com.example.ShopApp.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CouponDTO {
    @JsonProperty("code")
    private String code;

    @JsonProperty("active")
    private boolean active = true;
}
