CREATE TABLE contact_leads (
  id UUID PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  business_email VARCHAR(254) NOT NULL,
  phone VARCHAR(40),
  laboratory_name VARCHAR(200) NOT NULL,
  city VARCHAR(120),
  state VARCHAR(2) NOT NULL,
  organization_size VARCHAR(40),
  site_count INTEGER,
  interest VARCHAR(32) NOT NULL,
  message TEXT,
  source VARCHAR(80) NOT NULL,
  utm_source VARCHAR(120),
  utm_medium VARCHAR(120),
  utm_campaign VARCHAR(120),
  created_at TIMESTAMPTZ NOT NULL,
  status VARCHAR(32) NOT NULL,
  assigned_to VARCHAR(160),
  notes TEXT
);
CREATE INDEX contact_leads_created_at_idx ON contact_leads (created_at DESC);
CREATE INDEX contact_leads_status_idx ON contact_leads (status, created_at DESC);
CREATE TABLE marketing_events (
  id UUID PRIMARY KEY,
  event_type VARCHAR(48) NOT NULL,
  page_path VARCHAR(300) NOT NULL,
  product_slug VARCHAR(48),
  anonymous_id VARCHAR(80),
  source VARCHAR(80),
  created_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX marketing_events_type_created_idx ON marketing_events (event_type, created_at DESC);
