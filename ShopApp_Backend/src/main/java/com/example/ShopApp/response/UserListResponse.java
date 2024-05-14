package com.example.ShopApp.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserListResponse {
    @JsonProperty("users")
    private List<UserResponse> userResponseList;

    @JsonProperty("totalPages")
    private int totalPages;
}
