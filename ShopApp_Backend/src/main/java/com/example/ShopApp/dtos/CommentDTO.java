package com.example.ShopApp.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
    @JsonProperty("user_id")
    private Long userId;
    @JsonProperty("product_id")
    private Long productId;

    @JsonProperty("content")
    private String content;
}
