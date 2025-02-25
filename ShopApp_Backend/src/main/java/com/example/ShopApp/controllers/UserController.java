package com.example.ShopApp.controllers;

import com.example.ShopApp.dtos.RefreshTokenDTO;
import com.example.ShopApp.dtos.UserDTO;
import com.example.ShopApp.dtos.UserLoginDTO;
import com.example.ShopApp.entity.BaseEntity;
import com.example.ShopApp.entity.Role;
import com.example.ShopApp.entity.User;
import com.example.ShopApp.exceptions.DataNotFoundException;
import com.example.ShopApp.response.*;
import com.example.ShopApp.sevices.impl.TokenServiceImpl;
import com.example.ShopApp.sevices.impl.UserSeviceImpl;
import com.example.ShopApp.components.LocalizationUtils;
import com.example.ShopApp.utils.MessageKeys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;

import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.LocaleResolver;


import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor

public class UserController {
    private final UserSeviceImpl userSevice;
    private final MessageSource messageSource;
    private final LocaleResolver localeResolver;
    private final LocalizationUtils localizationUtils;
    private final TokenServiceImpl tokenService;
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO, BindingResult result) throws Exception {
        if(result.hasErrors()){
            List<String> errorMessage = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errorMessage);
        }

        if(!userDTO.getPassword().equals(userDTO.getRetypePassword())){
            return ResponseEntity.badRequest().body(localizationUtils.getLocalizedMessage(MessageKeys.PASSWORD_NOT_MATCH));
        }

        UserResponse userResponse = userSevice.createUser(userDTO);
        return ResponseEntity.ok(userResponse);
    }
    private boolean isMobileDevice(String userAgent) {
        // Kiểm tra User-Agent header để xác định thiết bị di động
        // Ví dụ đơn giản:
        return userAgent.toLowerCase().contains("mobile");
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody UserLoginDTO userLoginDTO, HttpServletRequest request) throws Exception {
        String userAgent = request.getHeader("User-Agent");
        String token = userSevice.login(userLoginDTO.getPhoneNumber(), userLoginDTO.getPassword(), userLoginDTO.getRoleId()==null? 1 : userLoginDTO.getRoleId());
        User user = userSevice.getUserDetailsFromToken(token);
        TokenResponse tokenResponse = tokenService.addToken(user.getId(), token, isMobileDevice(userAgent));
        return ResponseEntity.ok(LoginResponse.builder()
                .message(localizationUtils.getLocalizedMessage("user.login.login_successfully"))
                .token(token)
                .username(user.getUsername())
                .tokenType(tokenResponse.getTokenType())
                .refreshToken(tokenResponse.getRefreshToken())
                .roles(user.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList()))
                .id(user.getId())
                .build());
    }
    @PostMapping("/details")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.substring(7); //Loại bỏ "Bearer "
        User user = userSevice.getUserDetailsFromToken(token);
        return ResponseEntity.ok(UserResponse.fromUser(user));
    }

    @PutMapping("/details/{userId}") // Use the appropriate URL mapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<UserResponse> updateUserDetails(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long userId,
            @RequestBody UserDTO userDTO) throws Exception {
        String token = authorizationHeader.substring(7);
        User user = userSevice.getUserDetailsFromToken(token);
        if(user.getId() != userId){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        UserResponse updateUser = userSevice.updateUser(userId, userDTO);
        return ResponseEntity.ok(updateUser);
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenDTO refreshTokenDTO) throws Exception {
        User user = userSevice.getUserDetailsFromToken(refreshTokenDTO.getRefreshToken());
        TokenResponse tokenResponse = tokenService.refreshToken(refreshTokenDTO.getRefreshToken(), user);
        LoginResponse loginResponse = LoginResponse.builder()
                .id(user.getId())
                .token(tokenResponse.getToken())
                .refreshToken(tokenResponse.getRefreshToken())
                .roles(user.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList()))
                .build();
        return ResponseEntity.ok(loginResponse);
    }

    @PutMapping("/resetPassword/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> resetPassword(@PathVariable Long userId) throws Exception{
        ResetPasswordResponse resetPasswordResponse = userSevice.resetPassword(userId);
        return ResponseEntity.ok(resetPasswordResponse);
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllUser(
            @RequestParam(defaultValue = "", required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit
    ){
        Page<UserResponse> userResponsePage = userSevice.getAllUser(keyword, page, limit);
        return ResponseEntity.ok(
                BaseResponse.builder()
                        .data(UserListResponse
                                .builder()
                                .userResponseList(userResponsePage.getContent())
                                .totalPages(userResponsePage.getTotalPages())
                                .build()
                        )
                        .build()
        );

    }

    @PutMapping("/block/{userId}/{active}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> blockOrEnable(@PathVariable long userId,@PathVariable long active) throws DataNotFoundException {
        UserResponse userResponse = userSevice.blockOrEnable(userId, active > 0);
        return ResponseEntity.ok(BaseResponse
                .builder()
                .data(userResponse)
                .message("Block user successful")
                .build()
        );
    }
}
