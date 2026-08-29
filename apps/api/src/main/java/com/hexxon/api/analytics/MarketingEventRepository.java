package com.hexxon.api.analytics;
import org.springframework.data.jpa.repository.JpaRepository; import java.util.UUID;
public interface MarketingEventRepository extends JpaRepository<MarketingEvent, UUID> { }
