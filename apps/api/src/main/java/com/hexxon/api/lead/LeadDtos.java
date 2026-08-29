package com.hexxon.api.lead;
import jakarta.validation.constraints.*;
import java.time.Instant;
import java.util.UUID;

public final class LeadDtos {
  private LeadDtos() { }
  public record CreateLeadRequest(@NotBlank @Size(max = 160) String name, @NotBlank @Email @Size(max = 254) String businessEmail, @Size(max = 40) String phone, @NotBlank @Size(max = 200) String laboratoryName, @Size(max = 120) String city, @NotBlank @Pattern(regexp = "[A-Za-z]{2}") String state, @Size(max = 40) String organizationSize, @Min(1) @Max(10000) Integer siteCount, @NotNull LeadInterest interest, @Size(max = 4000) String message, @NotBlank @Size(max = 80) String source, @Size(max = 120) String utmSource, @Size(max = 120) String utmMedium, @Size(max = 120) String utmCampaign, @Size(max = 200) String website) { }
  public record LeadResponse(UUID id, String name, String businessEmail, String laboratoryName, String state, LeadInterest interest, Instant createdAt, LeadStatus status, String assignedTo, String notes) { }
  public record UpdateLeadRequest(@NotNull LeadStatus status, @Size(max = 160) String assignedTo, @Size(max = 4000) String notes) { }
}
