package com.hexxon.api.lead;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ContactLeadRepository extends JpaRepository<ContactLead, UUID> { }
