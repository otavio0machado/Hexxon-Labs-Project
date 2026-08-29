package com.hexxon.api.lead;
/** Port for future CRM adapters. Providers must be idempotent by ContactLead id. */
public interface LeadIntegrationProvider { void register(ContactLead lead); }
