package com.hexxon.api.config;
import java.util.Map; import org.springframework.http.*; import org.springframework.web.bind.annotation.*;
@RestControllerAdvice public class ApiExceptionHandler {
  @ExceptionHandler(IllegalArgumentException.class) ResponseEntity<Map<String, Object>> invalidRequest() { return ResponseEntity.badRequest().body(Map.of("code", "INVALID_REQUEST", "detail", "Não foi possível processar a solicitação.")); }
}
