package com.example.ShopApp.response;

import com.example.ShopApp.entity.Comment;
import com.example.ShopApp.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponse {
    @JsonProperty("content")
    private String content;

    @JsonProperty("user")
    private UserResponse userResponse;

    public static CommentResponse fromComment(Comment comment) {
        return CommentResponse.builder()
                .content(comment.getContent())
                .userResponse(UserResponse.fromUser(comment.getUser()))
                .build();
    }
}
