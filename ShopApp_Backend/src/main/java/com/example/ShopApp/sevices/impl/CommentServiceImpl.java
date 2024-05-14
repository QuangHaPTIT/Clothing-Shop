package com.example.ShopApp.sevices.impl;

import com.example.ShopApp.dtos.CommentDTO;
import com.example.ShopApp.exceptions.DataNotFoundException;
import com.example.ShopApp.exceptions.UserNotMatchException;
import com.example.ShopApp.response.CommentResponse;

import java.util.List;

public interface CommentServiceImpl {
    CommentResponse createComment(CommentDTO commentDTO) throws UserNotMatchException;
    void deleteComment(Long commentId) throws DataNotFoundException;
    CommentResponse updateComment(Long id, CommentDTO commentDTO) throws UserNotMatchException, DataNotFoundException;
    List<CommentResponse> getCommentsByUserAndProduct(Long productId, Long userId) throws DataNotFoundException;
    List<CommentResponse> getCommentsByProduct(Long productId) throws DataNotFoundException;
}
