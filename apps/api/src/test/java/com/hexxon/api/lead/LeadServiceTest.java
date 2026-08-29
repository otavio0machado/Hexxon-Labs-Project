package com.hexxon.api.lead;
import static org.junit.jupiter.api.Assertions.*; import static org.mockito.Mockito.*;
import com.hexxon.api.lead.LeadDtos.CreateLeadRequest; import com.hexxon.api.notification.CommercialLeadNotificationService; import org.junit.jupiter.api.Test;
class LeadServiceTest {
  @Test void blocksHoneypotBeforePersisting() { ContactLeadRepository repository = mock(ContactLeadRepository.class); LeadService service = new LeadService(repository, mock(LeadIntegrationProvider.class), mock(CommercialLeadNotificationService.class)); CreateLeadRequest request = new CreateLeadRequest("Ana", "ana@lab.com", null, "Lab", null, "SP", null, 1, LeadInterest.QC, null, "marketing_site", null, null, null, "https://spam.example"); assertThrows(IllegalArgumentException.class, () -> service.create(request)); verifyNoInteractions(repository); }
}
