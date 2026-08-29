package com.hexxon.api.analytics;
import com.hexxon.api.config.LeadRateLimiter; import jakarta.servlet.http.HttpServletRequest; import jakarta.validation.Valid; import jakarta.validation.constraints.*; import org.jsoup.Jsoup; import org.jsoup.safety.Safelist; import org.springframework.http.*; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/v1/marketing/events") public class MarketingEventController {
  private final MarketingEventRepository repository; private final LeadRateLimiter rateLimiter;
  public MarketingEventController(MarketingEventRepository repository, LeadRateLimiter rateLimiter) { this.repository = repository; this.rateLimiter = rateLimiter; }
  public record EventRequest(@NotNull MarketingEventType eventType, @NotBlank @Size(max = 300) String pagePath, @Size(max = 48) String productSlug, @Size(max = 80) String anonymousId, @Size(max = 80) String source) { }
  @PostMapping public ResponseEntity<Void> create(@Valid @RequestBody EventRequest request, HttpServletRequest http) { String key = "event:" + clientKey(http); if (!rateLimiter.allow(key, 120, java.time.Duration.ofMinutes(15))) return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build(); repository.save(new MarketingEvent(request.eventType(), clean(request.pagePath()), clean(request.productSlug()), clean(request.anonymousId()), clean(request.source()))); return ResponseEntity.accepted().build(); }
  private String clean(String value) { return value == null ? null : Jsoup.clean(value, Safelist.none()).replaceAll("\\s+", " ").trim(); }
  private String clientKey(HttpServletRequest request) { String forwarded = request.getHeader("X-Forwarded-For"); return forwarded == null || forwarded.isBlank() ? request.getRemoteAddr() : forwarded.split(",")[0].trim(); }
}
