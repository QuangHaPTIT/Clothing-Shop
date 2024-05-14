package com.example.ShopApp.sevices.impl;

import com.example.ShopApp.dtos.UserDTO;
import com.example.ShopApp.entity.User;
import com.example.ShopApp.exceptions.DataNotFoundException;
import com.example.ShopApp.response.ResetPasswordResponse;
import com.example.ShopApp.response.UserResponse;
import org.springframework.data.domain.Page;

public interface UserSeviceImpl {
    UserResponse createUser(UserDTO userDTO) throws Exception;

    String login(String phoneNumber, String password, Long roleId) throws DataNotFoundException, Exception;

    User getUserDetailsFromToken(String token) throws Exception;

    UserResponse updateUser(Long userId, UserDTO userDTO) throws DataNotFoundException;

    ResetPasswordResponse resetPassword(Long userId) throws DataNotFoundException;

    Page<UserResponse> getAllUser(String keyword, int page, int limit);

    UserResponse blockOrEnable(Long userId, Boolean active) throws DataNotFoundException;
}
