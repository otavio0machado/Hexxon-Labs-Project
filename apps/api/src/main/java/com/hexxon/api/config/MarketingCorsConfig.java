package com.hexxon.api.config;
import java.util.Arrays; import org.springframework.beans.factory.annotation.Value; import org.springframework.context.annotation.Configuration; import org.springframework.web.servlet.config.annotation.*;
@Configuration public class MarketingCorsConfig implements WebMvcConfigurer {
  private final String allowedOrigins; public MarketingCorsConfig(@Value("${hexxon.marketing.allowed-origins}") String allowedOrigins) { this.allowedOrigins = allowedOrigins; }
  @Override public void addCorsMappings(CorsRegistry registry) { registry.addMapping("/v1/marketing/**").allowedOrigins(Arrays.stream(allowedOrigins.split(",")).map(String::trim).toArray(String[]::new)).allowedMethods("POST", "GET", "PATCH").allowedHeaders("Content-Type", "Authorization").maxAge(3600); }
}
