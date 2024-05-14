package com.example.ShopApp.sevices;

import com.example.ShopApp.dtos.CommentDTO;
import com.example.ShopApp.entity.Comment;
import com.example.ShopApp.entity.Product;
import com.example.ShopApp.entity.User;
import com.example.ShopApp.exceptions.DataNotFoundException;
import com.example.ShopApp.exceptions.UserNotMatchException;
import com.example.ShopApp.repositories.CommentRepository;
import com.example.ShopApp.repositories.ProductRepository;
import com.example.ShopApp.repositories.UserRepository;
import com.example.ShopApp.response.CommentResponse;
import com.example.ShopApp.response.UserResponse;
import com.example.ShopApp.sevices.impl.CommentServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService implements CommentServiceImpl {
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    @Override
    @Transactional
    public CommentResponse createComment(CommentDTO commentDTO) throws UserNotMatchException {
        validateComment(commentDTO);
        User user = userRepository.findById(commentDTO.getUserId()).orElse(null);
        Product product = productRepository.findById(commentDTO.getProductId()).orElse(null);
        if(user == null || product == null) {
            throw new IllegalArgumentException("User or product not found");
        }
        Comment comment = Comment.builder()
                .product(product)
                .user(user)
                .content(commentDTO.getContent())
                .build();
        commentRepository.save(comment);
        return CommentResponse.fromComment(comment);
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId) throws DataNotFoundException {
        commentRepository.deleteById(commentId);
    }

    @Override
    @Transactional
    public CommentResponse updateComment(Long id, CommentDTO commentDTO) throws UserNotMatchException, DataNotFoundException {
        validateComment(commentDTO);
        if(!checkMatchProductAndUser(commentDTO.getUserId(), commentDTO.getProductId())) {
            throw new DataNotFoundException("User or product not found");
        }
        Comment existingComment = commentRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Not existing comment"));
        existingComment.setContent(commentDTO.getContent());
        return CommentResponse.fromComment(existingComment);
    }

    @Override
    public List<CommentResponse> getCommentsByUserAndProduct(Long productId, Long userId) throws DataNotFoundException {
        if(!checkMatchProductAndUser(userId, productId)){
            throw new DataNotFoundException("User or product not found");
        }
        List<Comment> comments = commentRepository.findByUserIdAndProductId(userId, productId);
        List<CommentResponse> commentResponses = comments.stream().map(CommentResponse::fromComment).collect(Collectors.toList());
        return commentResponses;
    }

    @Override
    public List<CommentResponse> getCommentsByProduct(Long productId) throws DataNotFoundException {
        if(!checkMatchProductAndUser(null, productId)) {
            throw new DataNotFoundException("Product not found");
        }
        List<Comment> comments = commentRepository.findByProductId(productId);
        List<CommentResponse> commentResponses = comments.stream().map(CommentResponse::fromComment).collect(Collectors.toList());
        return commentResponses;
    }

    private void validateComment(CommentDTO commentDTO) throws UserNotMatchException{
        User userLogin = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(userLogin.getId() != commentDTO.getUserId()) {
            throw new UserNotMatchException("The logged in user does not match the commenting user");
        }
    }

    private boolean checkMatchProductAndUser(Long userId, Long productId) {
        User user = new User();
        if(userId != null) {
            user = userRepository.findById(userId).orElse(null);
        }
        Product product = productRepository.findById(productId).orElse(null);
        if(userId == null) {
            return product != null;
        }else{
            return product != null && user != null;
        }
    }
}
