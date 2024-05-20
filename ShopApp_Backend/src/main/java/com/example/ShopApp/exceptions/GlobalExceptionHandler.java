package com.example.ShopApp.exceptions;


import com.example.ShopApp.response.BaseResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Nơi tập trung các Exception

@RestControllerAdvice // Bắt exception
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<BaseResponse> handleGeneralException(Exception exception) {
        return ResponseEntity.internalServerError().body(
                BaseResponse.builder()
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .message(exception.getMessage())
                        .build()
        );
    }

    @ExceptionHandler(DataNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<BaseResponse> handleDataNotFoundException(DataNotFoundException dataNotFoundException) {
        return ResponseEntity.badRequest().body(
                BaseResponse.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(dataNotFoundException.getMessage())
                        .build()
        );
    }

    @ExceptionHandler({InvalidParamException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<BaseResponse> handleInvalidParamException(InvalidParamException invalidParamException) {
        return ResponseEntity.badRequest().body(
                BaseResponse.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(invalidParamException.getMessage())
                        .build()
        );
    }
    @ExceptionHandler({ExpiredTokenException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<BaseResponse> handleInvalidParamException(ExpiredTokenException expiredTokenException) {
        return ResponseEntity.badRequest().body(
                BaseResponse.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(expiredTokenException.getMessage())
                        .build()
        );
    }

    @ExceptionHandler({PermissionDenyException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<BaseResponse> handleInvalidParamException(PermissionDenyException permissionDenyException) {
        return ResponseEntity.badRequest().body(
                BaseResponse.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(permissionDenyException.getMessage())
                        .build()
        );
    }

    @ExceptionHandler({UserNotMatchException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<BaseResponse> handleInvalidParamException(UserNotMatchException userNotMatchException) {
        return ResponseEntity.badRequest().body(
                BaseResponse.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .message(userNotMatchException.getMessage())
                        .build()
        );
    }
}
