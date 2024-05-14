package com.example.ShopApp.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResetPasswordResponse {
    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("password_reset")
    private String passwordReset;


}
