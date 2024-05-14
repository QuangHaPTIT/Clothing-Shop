package com.example.ShopApp.controllers;

import com.example.ShopApp.dtos.CommentDTO;
import com.example.ShopApp.entity.BaseEntity;
import com.example.ShopApp.entity.User;
import com.example.ShopApp.exceptions.DataNotFoundException;
import com.example.ShopApp.exceptions.UserNotMatchException;
import com.example.ShopApp.response.BaseResponse;
import com.example.ShopApp.response.CommentResponse;
import com.example.ShopApp.sevices.CommentService;
import com.example.ShopApp.sevices.impl.CommentServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentServiceImpl commentService;

    @GetMapping("")
    public ResponseEntity<BaseResponse> getAllComments(@RequestParam(value = "user_id", required = false) Long userId,
                                                                @RequestParam(value = "product_id") Long productId) throws DataNotFoundException {
        List<CommentResponse> commentResponses;
        if(userId == null) {
            commentResponses = commentService.getCommentsByProduct(productId);
        }else{
            commentResponses = commentService.getCommentsByUserAndProduct(productId, userId);
        }
        return ResponseEntity.ok(
                BaseResponse.builder()
                            .message("Get comment success")
                            .data(commentResponses)
                            .build()
        );
    }


    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<BaseResponse> createComment(@Valid @RequestBody CommentDTO commentDTO) throws UserNotMatchException {
        //Insert the new comment
        CommentResponse commentResponse = commentService.createComment(commentDTO);
        return ResponseEntity.ok(
                BaseResponse.builder()
                .message("Create comment successful")
                .data(commentResponse)
                .build()
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> updateComment(@PathVariable(value = "id") Long commentId,
                                                      @Valid @RequestBody CommentDTO commentDTO) {
        try{
            CommentResponse commentResponse = commentService.updateComment(commentId, commentDTO);
            return ResponseEntity.ok(
                    BaseResponse.builder()
                            .message("Update comment success")
                            .data(commentResponse)
                            .build()
            );
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(BaseResponse
                    .builder()
                    .message(e.getMessage())
                    .data(null)
                    .build()
            );
        }
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<BaseResponse> deleteComment(@PathVariable(value = "id") Long commentId) {
        try{
            commentService.deleteComment(commentId);
            return ResponseEntity.ok(
                    BaseResponse.builder()
                                .message("Delete comment success")
                                .data(null)
                                .build()
            );
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    BaseResponse.builder()
                            .message(e.getMessage())
                            .data(null)
                            .build()
            );
        }
    }
}
