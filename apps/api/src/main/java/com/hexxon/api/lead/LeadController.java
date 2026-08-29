package com.hexxon.api.lead;
import com.hexxon.api.config.LeadRateLimiter; import com.hexxon.api.lead.LeadDtos.*; import jakarta.servlet.http.HttpServletRequest; import jakarta.validation.Valid; import java.util.*; import org.springframework.beans.factory.annotation.Value; import org.springframework.http.*; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/v1/marketing/leads") public class LeadController {
  private final LeadService service; private final LeadRateLimiter rateLimiter; private final String adminToken;
  public LeadController(LeadService service, LeadRateLimiter rateLimiter, @Value("${hexxon.marketing.admin-token}") String adminToken) { this.service = service; this.rateLimiter = rateLimiter; this.adminToken = adminToken; }
  @PostMapping public ResponseEntity<LeadResponse> create(@Valid @RequestBody CreateLeadRequest request, HttpServletRequest http) { if (!rateLimiter.allow(clientKey(http))) return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build(); return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request)); }
  @GetMapping public List<LeadResponse> list(@RequestHeader(value = "Authorization", required = false) String authorization) { requireAdmin(authorization); return service.list(); }
  @PatchMapping("/{id}") public LeadResponse update(@PathVariable UUID id, @Valid @RequestBody UpdateLeadRequest request, @RequestHeader(value = "Authorization", required = false) String authorization) { requireAdmin(authorization); return service.update(id, request); }
  private void requireAdmin(String authorization) { if (adminToken == null || adminToken.isBlank() || !Objects.equals("Bearer " + adminToken, authorization)) throw new org.springframework.web.server.ResponseStatusException(HttpStatus.UNAUTHORIZED); }
  private String clientKey(HttpServletRequest request) { String forwarded = request.getHeader("X-Forwarded-For"); return forwarded == null || forwarded.isBlank() ? request.getRemoteAddr() : forwarded.split(",")[0].trim(); }
}
