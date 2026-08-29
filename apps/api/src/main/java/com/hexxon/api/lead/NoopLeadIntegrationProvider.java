package com.hexxon.api.lead;
import org.slf4j.Logger; import org.slf4j.LoggerFactory; import org.springframework.stereotype.Component;
@Component public class NoopLeadIntegrationProvider implements LeadIntegrationProvider { private static final Logger log = LoggerFactory.getLogger(NoopLeadIntegrationProvider.class); public void register(ContactLead lead) { log.info("CRM integration not configured; leadId={}", lead.getId()); } }
