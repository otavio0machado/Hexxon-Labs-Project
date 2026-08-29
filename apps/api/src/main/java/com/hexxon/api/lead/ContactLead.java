package com.hexxon.api.lead;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;
@Entity @Table(name = "contact_leads")
public class ContactLead {
  @Id private UUID id; @Column(nullable = false) private String name; @Column(name = "business_email", nullable = false) private String businessEmail;
  private String phone; @Column(name = "laboratory_name", nullable = false) private String laboratoryName; private String city; @Column(length = 2, nullable = false) private String state;
  @Column(name = "organization_size") private String organizationSize; @Column(name = "site_count") private Integer siteCount; @Enumerated(EnumType.STRING) @Column(nullable = false) private LeadInterest interest;
  @Column(columnDefinition = "TEXT") private String message; @Column(nullable = false) private String source; @Column(name = "utm_source") private String utmSource; @Column(name = "utm_medium") private String utmMedium; @Column(name = "utm_campaign") private String utmCampaign;
  @Column(name = "created_at", nullable = false, updatable = false) private Instant createdAt; @Enumerated(EnumType.STRING) @Column(nullable = false) private LeadStatus status; @Column(name = "assigned_to") private String assignedTo; @Column(columnDefinition = "TEXT") private String notes;
  protected ContactLead() { }
  public ContactLead(UUID id, String name, String businessEmail, String phone, String laboratoryName, String city, String state, String organizationSize, Integer siteCount, LeadInterest interest, String message, String source, String utmSource, String utmMedium, String utmCampaign, Instant createdAt) { this.id = id; this.name = name; this.businessEmail = businessEmail; this.phone = phone; this.laboratoryName = laboratoryName; this.city = city; this.state = state; this.organizationSize = organizationSize; this.siteCount = siteCount; this.interest = interest; this.message = message; this.source = source; this.utmSource = utmSource; this.utmMedium = utmMedium; this.utmCampaign = utmCampaign; this.createdAt = createdAt; this.status = LeadStatus.NEW; }
  public UUID getId() { return id; } public String getName() { return name; } public String getBusinessEmail() { return businessEmail; } public String getLaboratoryName() { return laboratoryName; } public String getState() { return state; } public LeadInterest getInterest() { return interest; } public Instant getCreatedAt() { return createdAt; } public LeadStatus getStatus() { return status; } public String getAssignedTo() { return assignedTo; } public String getNotes() { return notes; }
  public void updateCommercialState(LeadStatus status, String assignedTo, String notes) { this.status = status; this.assignedTo = assignedTo; this.notes = notes; }
}
