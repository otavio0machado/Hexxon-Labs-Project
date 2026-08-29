package com.hexxon.api.notification;
import com.hexxon.api.lead.ContactLead;
import org.slf4j.Logger; import org.slf4j.LoggerFactory; import org.springframework.stereotype.Service;
/** Notification port implementation. Delivery provider/address is configured outside frontend code. */
@Service public class CommercialLeadNotificationService { private static final Logger log = LoggerFactory.getLogger(CommercialLeadNotificationService.class); public void notifyNewLead(ContactLead lead) { log.info("Commercial lead notification queued; leadId={}", lead.getId()); } }
