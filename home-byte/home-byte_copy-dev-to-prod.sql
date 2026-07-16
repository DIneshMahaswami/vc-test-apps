DROP TABLE IF EXISTS "payments";
DROP SEQUENCE IF EXISTS "payments_id_seq";
DROP TABLE IF EXISTS "work_orders";
DROP SEQUENCE IF EXISTS "work_orders_id_seq";
DROP TABLE IF EXISTS "invoices";
DROP SEQUENCE IF EXISTS "invoices_id_seq";
DROP TABLE IF EXISTS "service_requests";
DROP SEQUENCE IF EXISTS "service_requests_id_seq";
DROP TABLE IF EXISTS "user_security_profiles";
DROP SEQUENCE IF EXISTS "user_security_profiles_id_seq";
DROP TABLE IF EXISTS "leads";
DROP SEQUENCE IF EXISTS "leads_id_seq";
DROP TABLE IF EXISTS "rental_agreements";
DROP SEQUENCE IF EXISTS "rental_agreements_id_seq";
DROP TABLE IF EXISTS "template_documents_extended_attributes";
DROP SEQUENCE IF EXISTS "template_documents_extended_attributes_id_seq";
DROP TABLE IF EXISTS "auth_audit_logs";
DROP SEQUENCE IF EXISTS "auth_audit_logs_id_seq";
DROP TABLE IF EXISTS "known_devices";
DROP SEQUENCE IF EXISTS "known_devices_id_seq";
DROP TABLE IF EXISTS "trusted_devices";
DROP SEQUENCE IF EXISTS "trusted_devices_id_seq";
DROP TABLE IF EXISTS "recovery_codes";
DROP SEQUENCE IF EXISTS "recovery_codes_id_seq";
DROP TABLE IF EXISTS "passkey_credentials";
DROP SEQUENCE IF EXISTS "passkey_credentials_id_seq";
DROP TABLE IF EXISTS "totp_credentials";
DROP SEQUENCE IF EXISTS "totp_credentials_id_seq";
DROP TABLE IF EXISTS "session_records";
DROP SEQUENCE IF EXISTS "session_records_id_seq";
DROP TABLE IF EXISTS "password_auths";
DROP SEQUENCE IF EXISTS "password_auths_id_seq";
DROP TABLE IF EXISTS "history";
DROP SEQUENCE IF EXISTS "history_id_seq";
DROP TABLE IF EXISTS "units";
DROP SEQUENCE IF EXISTS "units_id_seq";
DROP TABLE IF EXISTS "customers";
DROP SEQUENCE IF EXISTS "customers_id_seq";
DROP TABLE IF EXISTS "document_templates";
DROP SEQUENCE IF EXISTS "document_templates_id_seq";
DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS "users_id_seq";
DROP TABLE IF EXISTS "contractors";
DROP SEQUENCE IF EXISTS "contractors_id_seq";
DROP TABLE IF EXISTS "properties";
DROP SEQUENCE IF EXISTS "properties_id_seq";
DROP TABLE IF EXISTS "auth_policies";
DROP SEQUENCE IF EXISTS "auth_policies_id_seq";
DROP TABLE IF EXISTS "digital_signatures";
DROP SEQUENCE IF EXISTS "digital_signatures_id_seq";
DROP TABLE IF EXISTS "files";
DROP SEQUENCE IF EXISTS "files_id_seq";
DROP TABLE IF EXISTS "error_logs";
DROP SEQUENCE IF EXISTS "error_logs_id_seq";
DROP TABLE IF EXISTS "access_logs";
DROP SEQUENCE IF EXISTS "access_logs_id_seq";
DROP TABLE IF EXISTS "settings";
DROP SEQUENCE IF EXISTS "settings_id_seq";
DROP TABLE IF EXISTS "auto_assign_sequences";
DROP SEQUENCE IF EXISTS "auto_assign_sequences_id_seq";
DROP TABLE IF EXISTS "tenants";
DROP SEQUENCE IF EXISTS "tenants_id_seq";

CREATE SEQUENCE IF NOT EXISTS "tenants_id_seq";
CREATE TABLE "tenants" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"tenants_id_seq"'),
  "name" TEXT,
  "is_org_owner" BOOLEAN
);
CREATE INDEX IF NOT EXISTS "idx_tenants_name" ON "tenants" ("name");

CREATE SEQUENCE IF NOT EXISTS "auto_assign_sequences_id_seq";
CREATE TABLE "auto_assign_sequences" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"auto_assign_sequences_id_seq"'),
  "resource" TEXT,
  "field" TEXT,
  "current_value_number" INTEGER,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_auto_assign_sequences_tenant_id" ON "auto_assign_sequences" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "settings_id_seq";
CREATE TABLE "settings" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"settings_id_seq"'),
  "tenant_id" INTEGER REFERENCES "tenants"("id"),
  "config_name" TEXT,
  "config_value" TEXT
);
CREATE INDEX IF NOT EXISTS "idx_settings_tenant_id" ON "settings" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_settings_config_name" ON "settings" ("config_name");

CREATE SEQUENCE IF NOT EXISTS "access_logs_id_seq";
CREATE TABLE "access_logs" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"access_logs_id_seq"'),
  "timestamp" TIMESTAMP WITH TIME ZONE,
  "location" TEXT,
  "user" TEXT,
  "resource" TEXT,
  "method" TEXT,
  "resource_id" INTEGER,
  "post_content" TEXT,
  "total_time" TIMESTAMP WITH TIME ZONE,
  "result" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_access_logs_tenant_id" ON "access_logs" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "error_logs_id_seq";
CREATE TABLE "error_logs" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"error_logs_id_seq"'),
  "timestamp" TIMESTAMP WITH TIME ZONE,
  "type" TEXT,
  "location" TEXT,
  "ip_address" TEXT,
  "device" TEXT,
  "user" TEXT,
  "total_time" TIMESTAMP WITH TIME ZONE,
  "message" TEXT,
  "details" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_error_logs_tenant_id" ON "error_logs" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "files_id_seq";
CREATE TABLE "files" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"files_id_seq"'),
  "name" TEXT,
  "content_type" TEXT,
  "size" TEXT,
  "resource" TEXT,
  "resource_id" INTEGER,
  "engine" TEXT,
  "bucket" TEXT,
  "prefix" TEXT,
  "region" TEXT,
  "storage_system_key" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_files_tenant_id" ON "files" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_files_name" ON "files" ("name");

CREATE SEQUENCE IF NOT EXISTS "digital_signatures_id_seq";
CREATE TABLE "digital_signatures" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"digital_signatures_id_seq"'),
  "document_attachments" TEXT,
  "status" TEXT,
  "name_of_resource" TEXT,
  "id_of_resource" TEXT,
  "signer_user_ids" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_digital_signatures_tenant_id" ON "digital_signatures" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "auth_policies_id_seq";
CREATE TABLE "auth_policies" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"auth_policies_id_seq"'),
  "name" TEXT,
  "onboarding_mode" TEXT,
  "recovery_mode" TEXT,
  "is_password_allowed" BOOLEAN,
  "is_authenticator_allowed" BOOLEAN,
  "is_passkey_allowed" BOOLEAN,
  "is_trusted_device_mfa_bypass" BOOLEAN,
  "trust_duration_days_count" INTEGER,
  "is_remember_recent_logins" BOOLEAN,
  "mfa_enforcement_date" TIMESTAMP WITH TIME ZONE,
  "mfa_grace_period_days_count" INTEGER,
  "governance" TEXT,
  "password_min_length_count" INTEGER,
  "is_password_letter_required" BOOLEAN,
  "is_password_number_required" BOOLEAN,
  "is_password_uppercase_required" BOOLEAN,
  "is_password_special_char_required" BOOLEAN,
  "is_common_password_check_enabled" BOOLEAN,
  "is_breached_password_check_enabled" BOOLEAN,
  "force_change_password_days_count" INTEGER,
  "recent_passwords_not_allowed_count" INTEGER,
  "login_attempts_before_locking_count" INTEGER,
  "inactive_days_before_disabling_count" INTEGER,
  "is_new_location_notify_enabled" BOOLEAN,
  "is_new_device_notify_enabled" BOOLEAN,
  "is_account_lockout_notify_enabled" BOOLEAN,
  "is_notification_settings_locked" BOOLEAN,
  "lockout_duration_minutes_count" INTEGER,
  "max_concurrent_sessions_count" INTEGER,
  "is_reauth_required_for_settings" BOOLEAN,
  "is_inactivity_timeout_enabled" BOOLEAN,
  "inactivity_timeout_minutes_count" INTEGER,
  "inactivity_warning_minutes_count" INTEGER,
  "passkey_aaguid_allowlist" TEXT,
  "is_passkey_attestation_required" BOOLEAN,
  "password_reset_token_ttl_minutes_count" INTEGER,
  "invite_token_ttl_minutes_count" INTEGER,
  "session_ttl_hours_count" INTEGER,
  "created_at" TIMESTAMP WITH TIME ZONE,
  "updated_at" TIMESTAMP WITH TIME ZONE,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_auth_policies_tenant_id" ON "auth_policies" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_auth_policies_name" ON "auth_policies" ("name");

CREATE SEQUENCE IF NOT EXISTS "properties_id_seq";
CREATE TABLE "properties" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"properties_id_seq"'),
  "name" TEXT,
  "property_type" TEXT,
  "address_line_1" TEXT,
  "city" TEXT,
  "state" TEXT,
  "pin_code" TEXT,
  "notes" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_properties_tenant_id" ON "properties" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_properties_name" ON "properties" ("name");

CREATE SEQUENCE IF NOT EXISTS "contractors_id_seq";
CREATE TABLE "contractors" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"contractors_id_seq"'),
  "name" TEXT,
  "contractor_type" TEXT,
  "notes" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_contractors_tenant_id" ON "contractors" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_contractors_name" ON "contractors" ("name");

CREATE SEQUENCE IF NOT EXISTS "users_id_seq";
CREATE TABLE "users" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"users_id_seq"'),
  "first_name" TEXT,
  "last_name" TEXT,
  "email" TEXT,
  "mobile_no" TEXT,
  "role" TEXT,
  "is_active" BOOLEAN,
  "creation_date" TIMESTAMP WITH TIME ZONE,
  "scope_extensions" TEXT,
  "image_file_id" INTEGER REFERENCES "files"("id"),
  "image_file_name" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_users_image_file_id" ON "users" ("image_file_id");
CREATE INDEX IF NOT EXISTS "idx_users_tenant_id" ON "users" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_users_first_name" ON "users" ("first_name");
CREATE INDEX IF NOT EXISTS "idx_users_last_name" ON "users" ("last_name");
CREATE INDEX IF NOT EXISTS "idx_users_image_file_name" ON "users" ("image_file_name");

CREATE SEQUENCE IF NOT EXISTS "document_templates_id_seq";
CREATE TABLE "document_templates" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"document_templates_id_seq"'),
  "name" TEXT,
  "document_type" TEXT,
  "document_attachment_file_id" INTEGER REFERENCES "files"("id"),
  "document_attachment_file_name" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_document_templates_document_attachment_file_id" ON "document_templates" ("document_attachment_file_id");
CREATE INDEX IF NOT EXISTS "idx_document_templates_tenant_id" ON "document_templates" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_document_templates_name" ON "document_templates" ("name");
CREATE INDEX IF NOT EXISTS "idx_document_templates_document_attachment_file_name" ON "document_templates" ("document_attachment_file_name");

CREATE SEQUENCE IF NOT EXISTS "customers_id_seq";
CREATE TABLE "customers" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"customers_id_seq"'),
  "business_name" TEXT,
  "business_type" TEXT,
  "business_pan" TEXT,
  "gstin" TEXT,
  "primary_contact_name" TEXT,
  "primary_contact_phone" TEXT,
  "primary_contact_email" TEXT,
  "secondary_contact_name" TEXT,
  "secondary_contact_phone" TEXT,
  "secondary_contact_email" TEXT,
  "registered_building_name" TEXT,
  "registered_suite" TEXT,
  "registered_address_line_1" TEXT,
  "registered_address_line_2" TEXT,
  "registered_city" TEXT,
  "registered_state" TEXT,
  "registered_pin_code" TEXT,
  "incorporation_certificate_attachment_file_id" INTEGER REFERENCES "files"("id"),
  "memorandum_of_articles_attachment_file_id" INTEGER REFERENCES "files"("id"),
  "articles_of_association_attachment_file_id" INTEGER REFERENCES "files"("id"),
  "gst_registration_attachment_file_id" INTEGER REFERENCES "files"("id"),
  "incorporation_certificate_attachment_file_name" TEXT,
  "memorandum_of_articles_attachment_file_name" TEXT,
  "articles_of_association_attachment_file_name" TEXT,
  "gst_registration_attachment_file_name" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_customers_incorporation_certificate_attachment_file_id" ON "customers" ("incorporation_certificate_attachment_file_id");
CREATE INDEX IF NOT EXISTS "idx_customers_memorandum_of_articles_attachment_file_id" ON "customers" ("memorandum_of_articles_attachment_file_id");
CREATE INDEX IF NOT EXISTS "idx_customers_articles_of_association_attachment_file_id" ON "customers" ("articles_of_association_attachment_file_id");
CREATE INDEX IF NOT EXISTS "idx_customers_gst_registration_attachment_file_id" ON "customers" ("gst_registration_attachment_file_id");
CREATE INDEX IF NOT EXISTS "idx_customers_tenant_id" ON "customers" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_customers_business_name" ON "customers" ("business_name");
CREATE INDEX IF NOT EXISTS "idx_customers_primary_contact_name" ON "customers" ("primary_contact_name");
CREATE INDEX IF NOT EXISTS "idx_customers_secondary_contact_name" ON "customers" ("secondary_contact_name");
CREATE INDEX IF NOT EXISTS "idx_customers_registered_building_name" ON "customers" ("registered_building_name");
CREATE INDEX IF NOT EXISTS "idx_customers_incorporation_certificate_attachment_file_name" ON "customers" ("incorporation_certificate_attachment_file_name");
CREATE INDEX IF NOT EXISTS "idx_customers_memorandum_of_articles_attachment_file_name" ON "customers" ("memorandum_of_articles_attachment_file_name");
CREATE INDEX IF NOT EXISTS "idx_customers_articles_of_association_attachment_file_name" ON "customers" ("articles_of_association_attachment_file_name");
CREATE INDEX IF NOT EXISTS "idx_customers_gst_registration_attachment_file_name" ON "customers" ("gst_registration_attachment_file_name");

CREATE SEQUENCE IF NOT EXISTS "units_id_seq";
CREATE TABLE "units" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"units_id_seq"'),
  "property_id" INTEGER REFERENCES "properties"("id"),
  "name" TEXT,
  "floor" TEXT,
  "sqft_number" INTEGER,
  "rent_per_sqft_price" NUMERIC,
  "maintenance_per_sqft_price" NUMERIC,
  "status" TEXT,
  "is_furnished" BOOLEAN,
  "description" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_units_property_id" ON "units" ("property_id");
CREATE INDEX IF NOT EXISTS "idx_units_tenant_id" ON "units" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_units_name" ON "units" ("name");

CREATE SEQUENCE IF NOT EXISTS "history_id_seq";
CREATE TABLE "history" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"history_id_seq"'),
  "timestamp" TIMESTAMP WITH TIME ZONE,
  "id_of_resource" TEXT,
  "name_of_resource" TEXT,
  "type" TEXT,
  "data" TEXT,
  "previous_data" TEXT,
  "location" TEXT,
  "ip_address" TEXT,
  "user_id" INTEGER REFERENCES "users"("id"),
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_history_user_id" ON "history" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_history_tenant_id" ON "history" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "password_auths_id_seq";
CREATE TABLE "password_auths" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"password_auths_id_seq"'),
  "user_id" INTEGER REFERENCES "users"("id"),
  "password_hash" TEXT,
  "last_password_change_date" TIMESTAMP WITH TIME ZONE,
  "recent_password_hashes" TEXT,
  "password_reset_token" TEXT,
  "password_reset_expires_date" TIMESTAMP WITH TIME ZONE,
  "locked_until" TEXT,
  "lockout_count" INTEGER,
  "force_password_change_flag" BOOLEAN,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_password_auths_user_id" ON "password_auths" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_password_auths_tenant_id" ON "password_auths" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "session_records_id_seq";
CREATE TABLE "session_records" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"session_records_id_seq"'),
  "user_id" INTEGER REFERENCES "users"("id"),
  "app_version" TEXT,
  "sign_in_at" TIMESTAMP WITH TIME ZONE,
  "ip_address" TEXT,
  "location" TEXT,
  "device_info" TEXT,
  "auth_method" TEXT,
  "session_token_hash" TEXT,
  "session_token_expires_at" TIMESTAMP WITH TIME ZONE,
  "is_active" BOOLEAN,
  "sign_out_at" TIMESTAMP WITH TIME ZONE,
  "sign_out_reason" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_session_records_user_id" ON "session_records" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_session_records_tenant_id" ON "session_records" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "totp_credentials_id_seq";
CREATE TABLE "totp_credentials" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"totp_credentials_id_seq"'),
  "user_id" INTEGER REFERENCES "users"("id"),
  "secret_enc" TEXT,
  "is_verified" BOOLEAN,
  "failed_totp_attempts_count" INTEGER,
  "locked_until" TEXT,
  "lockout_count" INTEGER,
  "last_used_at" TIMESTAMP WITH TIME ZONE,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_totp_credentials_user_id" ON "totp_credentials" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_totp_credentials_tenant_id" ON "totp_credentials" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "passkey_credentials_id_seq";
CREATE TABLE "passkey_credentials" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"passkey_credentials_id_seq"'),
  "user_id" INTEGER REFERENCES "users"("id"),
  "credential_identifier" TEXT,
  "public_key" TEXT,
  "credential_device_type" TEXT,
  "is_credential_backed_up" BOOLEAN,
  "aaguid" TEXT,
  "device_name" TEXT,
  "sign_count" INTEGER,
  "transports" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE,
  "last_used_at" TIMESTAMP WITH TIME ZONE,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_passkey_credentials_user_id" ON "passkey_credentials" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_passkey_credentials_tenant_id" ON "passkey_credentials" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_passkey_credentials_device_name" ON "passkey_credentials" ("device_name");

CREATE SEQUENCE IF NOT EXISTS "recovery_codes_id_seq";
CREATE TABLE "recovery_codes" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"recovery_codes_id_seq"'),
  "user_id" INTEGER REFERENCES "users"("id"),
  "code_hash" TEXT,
  "used_at" TIMESTAMP WITH TIME ZONE,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_recovery_codes_user_id" ON "recovery_codes" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_recovery_codes_tenant_id" ON "recovery_codes" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "trusted_devices_id_seq";
CREATE TABLE "trusted_devices" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"trusted_devices_id_seq"'),
  "user_id" INTEGER REFERENCES "users"("id"),
  "device_token_hash" TEXT,
  "device_name" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE,
  "last_used_at" TIMESTAMP WITH TIME ZONE,
  "expires_at" TIMESTAMP WITH TIME ZONE,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_trusted_devices_user_id" ON "trusted_devices" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_trusted_devices_tenant_id" ON "trusted_devices" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_trusted_devices_device_name" ON "trusted_devices" ("device_name");

CREATE SEQUENCE IF NOT EXISTS "known_devices_id_seq";
CREATE TABLE "known_devices" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"known_devices_id_seq"'),
  "user_id" INTEGER REFERENCES "users"("id"),
  "device_token_hash" TEXT,
  "device_name" TEXT,
  "first_seen_at" TIMESTAMP WITH TIME ZONE,
  "last_seen_at" TIMESTAMP WITH TIME ZONE,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_known_devices_user_id" ON "known_devices" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_known_devices_tenant_id" ON "known_devices" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_known_devices_device_name" ON "known_devices" ("device_name");

CREATE SEQUENCE IF NOT EXISTS "auth_audit_logs_id_seq";
CREATE TABLE "auth_audit_logs" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"auth_audit_logs_id_seq"'),
  "user_id" INTEGER REFERENCES "users"("id"),
  "session_token_hash" TEXT,
  "action" TEXT,
  "detail" TEXT,
  "ip_address" TEXT,
  "location" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE,
  "admin_user_id" INTEGER REFERENCES "users"("id"),
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_auth_audit_logs_user_id" ON "auth_audit_logs" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_auth_audit_logs_admin_user_id" ON "auth_audit_logs" ("admin_user_id");
CREATE INDEX IF NOT EXISTS "idx_auth_audit_logs_tenant_id" ON "auth_audit_logs" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "template_documents_extended_attributes_id_seq";
CREATE TABLE "template_documents_extended_attributes" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"template_documents_extended_attributes_id_seq"'),
  "name_of_resource" TEXT,
  "id_of_resource" TEXT,
  "field_of_resource" TEXT,
  "document_template_id" INTEGER REFERENCES "document_templates"("id"),
  "document_attachments" TEXT,
  "is_manual_upload" BOOLEAN,
  "esign_status" TEXT,
  "email_sent_date" TIMESTAMP WITH TIME ZONE,
  "receiver_emails" TEXT,
  "created_by_user_id" INTEGER REFERENCES "users"("id"),
  "updated_by_user_id" INTEGER REFERENCES "users"("id"),
  "created_date" TIMESTAMP WITH TIME ZONE,
  "updated_date" TIMESTAMP WITH TIME ZONE,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_template_documents_extended_attributes_document_template_id" ON "template_documents_extended_attributes" ("document_template_id");
CREATE INDEX IF NOT EXISTS "idx_template_documents_extended_attributes_created_by_user_id" ON "template_documents_extended_attributes" ("created_by_user_id");
CREATE INDEX IF NOT EXISTS "idx_template_documents_extended_attributes_updated_by_user_id" ON "template_documents_extended_attributes" ("updated_by_user_id");
CREATE INDEX IF NOT EXISTS "idx_template_documents_extended_attributes_tenant_id" ON "template_documents_extended_attributes" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "rental_agreements_id_seq";
CREATE TABLE "rental_agreements" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"rental_agreements_id_seq"'),
  "unit_id" INTEGER REFERENCES "units"("id"),
  "customer_id" INTEGER REFERENCES "customers"("id"),
  "status" TEXT,
  "rental_start_date" TIMESTAMP WITH TIME ZONE,
  "rental_end_date" TIMESTAMP WITH TIME ZONE,
  "agreement_date" TIMESTAMP WITH TIME ZONE,
  "rent_amount" NUMERIC,
  "security_deposit_amount" NUMERIC,
  "rental_agreement_attachment_file_id" INTEGER REFERENCES "files"("id"),
  "rental_agreement_attachment_file_name" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_rental_agreements_unit_id" ON "rental_agreements" ("unit_id");
CREATE INDEX IF NOT EXISTS "idx_rental_agreements_customer_id" ON "rental_agreements" ("customer_id");
CREATE INDEX IF NOT EXISTS "idx_rental_agreements_rental_agreement_attachment_file_id" ON "rental_agreements" ("rental_agreement_attachment_file_id");
CREATE INDEX IF NOT EXISTS "idx_rental_agreements_tenant_id" ON "rental_agreements" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_rental_agreements_rental_agreement_attachment_file_name" ON "rental_agreements" ("rental_agreement_attachment_file_name");

CREATE SEQUENCE IF NOT EXISTS "leads_id_seq";
CREATE TABLE "leads" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"leads_id_seq"'),
  "unit_id" INTEGER REFERENCES "units"("id"),
  "status" TEXT,
  "inquiry_date" TIMESTAMP WITH TIME ZONE,
  "customer_name" TEXT,
  "customer_phone" TEXT,
  "customer_email" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_leads_unit_id" ON "leads" ("unit_id");
CREATE INDEX IF NOT EXISTS "idx_leads_tenant_id" ON "leads" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_leads_customer_name" ON "leads" ("customer_name");

CREATE SEQUENCE IF NOT EXISTS "user_security_profiles_id_seq";
CREATE TABLE "user_security_profiles" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"user_security_profiles_id_seq"'),
  "user_id" INTEGER REFERENCES "users"("id"),
  "email" TEXT,
  "last_login_date" TIMESTAMP WITH TIME ZONE,
  "reactivated_at" TIMESTAMP WITH TIME ZONE,
  "failed_login_attempts_count" INTEGER,
  "creation_ip_address" TEXT,
  "creation_location" TEXT,
  "auth_policy_id" INTEGER REFERENCES "auth_policies"("id"),
  "is_password_enrolled" BOOLEAN,
  "is_authenticator_enrolled" BOOLEAN,
  "is_passkey_enrolled" BOOLEAN,
  "primary_method" TEXT,
  "recovery_codes_remaining_count" INTEGER,
  "totp_credential_id" INTEGER REFERENCES "totp_credentials"("id"),
  "password_auth_id" INTEGER REFERENCES "password_auths"("id"),
  "passkey_credential_identifiers" TEXT,
  "is_new_location_notify_enabled" BOOLEAN,
  "is_new_device_notify_enabled" BOOLEAN,
  "is_account_lockout_notify_enabled" BOOLEAN,
  "bypass_code_hash" TEXT,
  "bypass_code_expires_at" TIMESTAMP WITH TIME ZONE,
  "setup_token" TEXT,
  "setup_token_expires_at" TIMESTAMP WITH TIME ZONE,
  "inactive_locked_at" TIMESTAMP WITH TIME ZONE,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_user_security_profiles_user_id" ON "user_security_profiles" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_user_security_profiles_auth_policy_id" ON "user_security_profiles" ("auth_policy_id");
CREATE INDEX IF NOT EXISTS "idx_user_security_profiles_totp_credential_id" ON "user_security_profiles" ("totp_credential_id");
CREATE INDEX IF NOT EXISTS "idx_user_security_profiles_password_auth_id" ON "user_security_profiles" ("password_auth_id");
CREATE INDEX IF NOT EXISTS "idx_user_security_profiles_tenant_id" ON "user_security_profiles" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "service_requests_id_seq";
CREATE TABLE "service_requests" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"service_requests_id_seq"'),
  "rental_agreement_id" INTEGER REFERENCES "rental_agreements"("id"),
  "customer_id" INTEGER REFERENCES "customers"("id"),
  "request_type" TEXT,
  "status" TEXT,
  "request_date" TIMESTAMP WITH TIME ZONE,
  "completed_date" TIMESTAMP WITH TIME ZONE,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_service_requests_rental_agreement_id" ON "service_requests" ("rental_agreement_id");
CREATE INDEX IF NOT EXISTS "idx_service_requests_customer_id" ON "service_requests" ("customer_id");
CREATE INDEX IF NOT EXISTS "idx_service_requests_tenant_id" ON "service_requests" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "invoices_id_seq";
CREATE TABLE "invoices" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"invoices_id_seq"'),
  "invoice_no" TEXT,
  "invoice_date" TIMESTAMP WITH TIME ZONE,
  "invoice_type" TEXT,
  "rental_agreement_id" INTEGER REFERENCES "rental_agreements"("id"),
  "payment_status" TEXT,
  "due_date" TIMESTAMP WITH TIME ZONE,
  "base_amount" NUMERIC,
  "gst_amount" NUMERIC,
  "total_amount" NUMERIC,
  "invoice_attachment_file_id" INTEGER REFERENCES "files"("id"),
  "invoice_attachment_file_name" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_invoices_rental_agreement_id" ON "invoices" ("rental_agreement_id");
CREATE INDEX IF NOT EXISTS "idx_invoices_invoice_attachment_file_id" ON "invoices" ("invoice_attachment_file_id");
CREATE INDEX IF NOT EXISTS "idx_invoices_tenant_id" ON "invoices" ("tenant_id");
CREATE INDEX IF NOT EXISTS "idx_invoices_invoice_attachment_file_name" ON "invoices" ("invoice_attachment_file_name");

CREATE SEQUENCE IF NOT EXISTS "work_orders_id_seq";
CREATE TABLE "work_orders" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"work_orders_id_seq"'),
  "unit_id" INTEGER REFERENCES "units"("id"),
  "work_order_date" TIMESTAMP WITH TIME ZONE,
  "work_order_type" TEXT,
  "contractor_id" INTEGER REFERENCES "contractors"("id"),
  "service_request_id" INTEGER REFERENCES "service_requests"("id"),
  "work_order_amount" NUMERIC,
  "notes" TEXT,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_work_orders_unit_id" ON "work_orders" ("unit_id");
CREATE INDEX IF NOT EXISTS "idx_work_orders_contractor_id" ON "work_orders" ("contractor_id");
CREATE INDEX IF NOT EXISTS "idx_work_orders_service_request_id" ON "work_orders" ("service_request_id");
CREATE INDEX IF NOT EXISTS "idx_work_orders_tenant_id" ON "work_orders" ("tenant_id");

CREATE SEQUENCE IF NOT EXISTS "payments_id_seq";
CREATE TABLE "payments" (
  "id" INTEGER PRIMARY KEY DEFAULT nextval('"payments_id_seq"'),
  "invoice_id" INTEGER REFERENCES "invoices"("id"),
  "payment_reference" TEXT,
  "payment_date" TIMESTAMP WITH TIME ZONE,
  "payment_method" TEXT,
  "payment_amount" NUMERIC,
  "tenant_id" INTEGER REFERENCES "tenants"("id")
);
CREATE INDEX IF NOT EXISTS "idx_payments_invoice_id" ON "payments" ("invoice_id");
CREATE INDEX IF NOT EXISTS "idx_payments_tenant_id" ON "payments" ("tenant_id");

SET DateStyle = 'MDY';

DELETE FROM "tenants";
INSERT INTO "tenants" ("id", "name", "is_org_owner") VALUES
('1', 'Super Admin', TRUE),
('2', 'Home Byte', FALSE);

DELETE FROM "auto_assign_sequences";
INSERT INTO "auto_assign_sequences" ("id", "resource", "field", "current_value_number", "tenant_id")
SELECT '1', 'invoices', 'invoice_no', '19', '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "auth_policies";
INSERT INTO "auth_policies" ("id", "name", "onboarding_mode", "recovery_mode", "is_password_allowed", "is_authenticator_allowed", "is_passkey_allowed", "is_trusted_device_mfa_bypass", "trust_duration_days_count", "is_remember_recent_logins", "mfa_enforcement_date", "mfa_grace_period_days_count", "governance", "password_min_length_count", "is_password_letter_required", "is_password_number_required", "is_password_uppercase_required", "is_password_special_char_required", "is_common_password_check_enabled", "is_breached_password_check_enabled", "force_change_password_days_count", "recent_passwords_not_allowed_count", "login_attempts_before_locking_count", "inactive_days_before_disabling_count", "is_new_location_notify_enabled", "is_new_device_notify_enabled", "is_account_lockout_notify_enabled", "is_notification_settings_locked", "lockout_duration_minutes_count", "max_concurrent_sessions_count", "is_reauth_required_for_settings", "is_inactivity_timeout_enabled", "inactivity_timeout_minutes_count", "inactivity_warning_minutes_count", "passkey_aaguid_allowlist", "is_passkey_attestation_required", "password_reset_token_ttl_minutes_count", "invite_token_ttl_minutes_count", "session_ttl_hours_count", "created_at", "updated_at", "tenant_id")
SELECT '1', 'Basic', 'self_service', 'password_only', TRUE, FALSE, FALSE, FALSE, '30', TRUE, NULL, '0', 'admin', '8', TRUE, TRUE, FALSE, FALSE, TRUE, FALSE, '0', '0', '10', '365', FALSE, FALSE, FALSE, TRUE, '5', '3', FALSE, TRUE, '45', '5', NULL, FALSE, '60', '10080', '48', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "properties";
INSERT INTO "properties" ("id", "name", "property_type", "address_line_1", "city", "state", "pin_code", "notes", "tenant_id")
SELECT '1', 'Tech Park Plaza', 'commercial', 'MG Road, Whitefield', 'Bangalore', 'Karnataka', '560066', 'Modern commercial building with IT companies', '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "properties" ("id", "name", "property_type", "address_line_1", "city", "state", "pin_code", "notes", "tenant_id")
SELECT '2', 'Green View Residency', 'residential', 'Koregaon Park', 'Pune', 'Maharashtra', '411001', 'Premium residential apartments', '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "properties" ("id", "name", "property_type", "address_line_1", "city", "state", "pin_code", "notes", "tenant_id")
SELECT '3', 'Metro Business Hub', 'mixed_use', 'Andheri East', 'Mumbai', 'Maharashtra', '400069', 'Mixed use property with retail and office spaces', '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "contractors";
INSERT INTO "contractors" ("id", "name", "contractor_type", "notes", "tenant_id")
SELECT '1', 'Quick Fix Services', 'plumbing', 'Fast response, 24/7 available', '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "contractors" ("id", "name", "contractor_type", "notes", "tenant_id")
SELECT '2', 'PowerTech electricals', 'electrical', 'Licensed electricians, commercial experience', '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "users";
INSERT INTO "users" ("id", "first_name", "last_name", "email", "mobile_no", "role", "is_active", "creation_date", "scope_extensions", "image_file_id", "image_file_name", "tenant_id")
SELECT '1', 'Dinesh', 'R', 'dinesh@mahaswami.com', NULL, 'admin', TRUE, '2026-07-16T06:58:34.613Z', NULL, NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "document_templates";
INSERT INTO "document_templates" ("id", "name", "document_type", "document_attachment_file_id", "document_attachment_file_name", "tenant_id")
SELECT '1', 'Standard Commercial Rental Agreement', 'Rental Agreement', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "document_templates" ("id", "name", "document_type", "document_attachment_file_id", "document_attachment_file_name", "tenant_id")
SELECT '2', 'Standard Residential Rental Agreement', 'Rental Agreement', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "document_templates" ("id", "name", "document_type", "document_attachment_file_id", "document_attachment_file_name", "tenant_id")
SELECT '3', 'No Objection Certificate Template', 'NOC', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "document_templates" ("id", "name", "document_type", "document_attachment_file_id", "document_attachment_file_name", "tenant_id")
SELECT '4', 'Monthly Rent Receipt Format', 'Rent Receipt', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "document_templates" ("id", "name", "document_type", "document_attachment_file_id", "document_attachment_file_name", "tenant_id")
SELECT '5', 'Lease Termination Notice - 60 Days', 'Termination Notice', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "customers";
INSERT INTO "customers" ("id", "business_name", "business_type", "business_pan", "gstin", "primary_contact_name", "primary_contact_phone", "primary_contact_email", "secondary_contact_name", "secondary_contact_phone", "secondary_contact_email", "registered_building_name", "registered_suite", "registered_address_line_1", "registered_address_line_2", "registered_city", "registered_state", "registered_pin_code", "incorporation_certificate_attachment_file_id", "memorandum_of_articles_attachment_file_id", "articles_of_association_attachment_file_id", "gst_registration_attachment_file_id", "incorporation_certificate_attachment_file_name", "memorandum_of_articles_attachment_file_name", "articles_of_association_attachment_file_name", "gst_registration_attachment_file_name", "tenant_id")
SELECT '1', 'InfoTech Solutions Pvt Ltd', 'it_services', 'AADCI1234F', '29AADCI1234F1Z5', 'Rajesh Kumar', '+91-9876543210', 'venkat+infotech@mahaswami.com', 'Priya Sharma', '+91-9876543211', 'priya@infotechsolutions.in', 'Brigade Gateway', '7B', '26/1 Dr Rajkumar Road', 'Malleshwaram', 'Bangalore', 'Karnataka', '560055', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "customers" ("id", "business_name", "business_type", "business_pan", "gstin", "primary_contact_name", "primary_contact_phone", "primary_contact_email", "secondary_contact_name", "secondary_contact_phone", "secondary_contact_email", "registered_building_name", "registered_suite", "registered_address_line_1", "registered_address_line_2", "registered_city", "registered_state", "registered_pin_code", "incorporation_certificate_attachment_file_id", "memorandum_of_articles_attachment_file_id", "articles_of_association_attachment_file_id", "gst_registration_attachment_file_id", "incorporation_certificate_attachment_file_name", "memorandum_of_articles_attachment_file_name", "articles_of_association_attachment_file_name", "gst_registration_attachment_file_name", "tenant_id")
SELECT '2', 'MediCare Pharmacy Ltd', 'healthcare', 'AABCM5678G', '29AABCM5678G1Z3', 'Dr. Amit Patel', '+91-9123456780', 'venkat+medicare@mahaswami.com', 'Sneha Reddy', '+91-9123456781', 'sneha@medicarepharm.com', 'Sigma Tech Park', '304', 'Outer Ring Road', 'Marathahalli', 'Bangalore', 'Karnataka', '560037', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "customers" ("id", "business_name", "business_type", "business_pan", "gstin", "primary_contact_name", "primary_contact_phone", "primary_contact_email", "secondary_contact_name", "secondary_contact_phone", "secondary_contact_email", "registered_building_name", "registered_suite", "registered_address_line_1", "registered_address_line_2", "registered_city", "registered_state", "registered_pin_code", "incorporation_certificate_attachment_file_id", "memorandum_of_articles_attachment_file_id", "articles_of_association_attachment_file_id", "gst_registration_attachment_file_id", "incorporation_certificate_attachment_file_name", "memorandum_of_articles_attachment_file_name", "articles_of_association_attachment_file_name", "gst_registration_attachment_file_name", "tenant_id")
SELECT '3', 'Sharma Enterprises', 'retail', 'AAFHS9012H', '27AAFHS9012H1Z8', 'Vikram Sharma', '+91-9988776655', 'venkat+sharma@mahaswami.com', 'Anjali Sharma', '+91-9988776656', 'anjali@sharmaenterprises.co.in', 'Trade Center', '12A', 'FC Road', 'Shivajinagar', 'Pune', 'Maharashtra', '411005', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "customers" ("id", "business_name", "business_type", "business_pan", "gstin", "primary_contact_name", "primary_contact_phone", "primary_contact_email", "secondary_contact_name", "secondary_contact_phone", "secondary_contact_email", "registered_building_name", "registered_suite", "registered_address_line_1", "registered_address_line_2", "registered_city", "registered_state", "registered_pin_code", "incorporation_certificate_attachment_file_id", "memorandum_of_articles_attachment_file_id", "articles_of_association_attachment_file_id", "gst_registration_attachment_file_id", "incorporation_certificate_attachment_file_name", "memorandum_of_articles_attachment_file_name", "articles_of_association_attachment_file_name", "gst_registration_attachment_file_name", "tenant_id")
SELECT '4', 'Design Studio Co', 'consulting', 'AACDS3456J', '27AACDS3456J1Z1', 'Neha Mehta', '+91-9765432100', 'venkat+designstudio@mahaswami.com', 'Karan Singh', '+91-9765432101', 'karan@designstudio.co', 'Ashoka Chambers', '501', 'Bund Garden Road', 'Pune Cantonment', 'Pune', 'Maharashtra', '411001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "customers" ("id", "business_name", "business_type", "business_pan", "gstin", "primary_contact_name", "primary_contact_phone", "primary_contact_email", "secondary_contact_name", "secondary_contact_phone", "secondary_contact_email", "registered_building_name", "registered_suite", "registered_address_line_1", "registered_address_line_2", "registered_city", "registered_state", "registered_pin_code", "incorporation_certificate_attachment_file_id", "memorandum_of_articles_attachment_file_id", "articles_of_association_attachment_file_id", "gst_registration_attachment_file_id", "incorporation_certificate_attachment_file_name", "memorandum_of_articles_attachment_file_name", "articles_of_association_attachment_file_name", "gst_registration_attachment_file_name", "tenant_id")
SELECT '5', 'Fresh Foods Mumbai', 'retail', 'AAFFF7890K', '27AAFFF7890K1Z6', 'Sanjay Gupta', '+91-9876541230', 'venkat+freshfoods@mahaswami.com', 'Meera Joshi', '+91-9876541231', 'meera@freshfoods.in', 'Peninsula Towers', '15C', 'Lower Parel', 'Elphinstone Road', 'Mumbai', 'Maharashtra', '400013', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "units";
INSERT INTO "units" ("id", "property_id", "name", "floor", "sqft_number", "rent_per_sqft_price", "maintenance_per_sqft_price", "status", "is_furnished", "description", "tenant_id")
SELECT '1', '1', '401', '4', '2500', '65', '8', 'occupied', TRUE, '<img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop" alt="Modern Office Space" style="width: 486px; margin: 0px auto;" /><h3>Premium Office Space</h3><p>Modern 2,500 sq ft office on the 4th floor with panoramic city views. Features include high-speed internet, 24/7 security, and ample parking. Perfect for IT companies and tech startups.</p><p><strong>Amenities:</strong> Wi-Fi, AC, Power Backup, Cafeteria</p><ul><li>2,500 square feet</li><li>4th Floor Location</li><li>24/7 Security & Parking</li><li>High-speed Internet Ready</li></ul>', '2'
WHERE EXISTS (SELECT 1 FROM "properties" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "units" ("id", "property_id", "name", "floor", "sqft_number", "rent_per_sqft_price", "maintenance_per_sqft_price", "status", "is_furnished", "description", "tenant_id")
SELECT '2', '1', '402', '4', '2000', '65', '8', 'occupied', FALSE, '<img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop" alt="Medical Office" style="width: 486px; margin: 0px auto;" /><h3>Medical Office Suite</h3><p>Well-designed 2,000 sq ft medical office with reception area, consultation rooms, and storage. Ideal for clinics and healthcare services with excellent patient accessibility.</p><p><strong>Features:</strong> Waiting Area, Private Rooms, Storage</p><ul><li>2,000 square feet</li><li>Multiple Consultation Rooms</li><li>Reception & Waiting Area</li><li>Ground Floor Access</li></ul>', '2'
WHERE EXISTS (SELECT 1 FROM "properties" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "units" ("id", "property_id", "name", "floor", "sqft_number", "rent_per_sqft_price", "maintenance_per_sqft_price", "status", "is_furnished", "description", "tenant_id")
SELECT '3', '1', '501', '5', '3000', '70', '8', 'available', TRUE, '<img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop" alt="Penthouse Office" style="width: 486px; margin: 0px auto;" /><h3>Premium Penthouse Office</h3><p>Spacious 3,000 sq ft top-floor premium office with stunning skyline views. Features executive cabins, conference room, and modern interiors. Prime location for corporate headquarters.</p><p><strong>Premium Features:</strong> Top Floor, Skyline View, Executive Layout</p><ul><li>3,000 square feet</li><li>Top Floor (5th)</li><li>Executive Cabins</li><li>Conference Room</li><li>Panoramic City Views</li></ul>', '2'
WHERE EXISTS (SELECT 1 FROM "properties" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "units" ("id", "property_id", "name", "floor", "sqft_number", "rent_per_sqft_price", "maintenance_per_sqft_price", "status", "is_furnished", "description", "tenant_id")
SELECT '4', '2', '101', '1', '1200', '35', '5', 'occupied', TRUE, '<img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop" alt="Residential Unit" style="width: 486px; margin: 0px auto;" /><h3>Ground Floor Residential Unit</h3><p>Cozy 1,200 sq ft ground floor apartment with garden access. Features 2 bedrooms, modern kitchen, and peaceful ambiance. Perfect for small families seeking comfort.</p><p><strong>Amenities:</strong> Garden, Parking, Security, Maintenance</p><ul><li>1,200 square feet</li><li>2 Bedrooms</li><li>Garden Access</li><li>Ground Floor Convenience</li></ul>', '2'
WHERE EXISTS (SELECT 1 FROM "properties" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "units" ("id", "property_id", "name", "floor", "sqft_number", "rent_per_sqft_price", "maintenance_per_sqft_price", "status", "is_furnished", "description", "tenant_id")
SELECT '5', '2', '201', '2', '1400', '38', '5', 'available', FALSE, '<img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop" alt="Bright Apartment"  style="width: 486px; margin: 0px auto;" /><h3>Bright 2nd Floor Apartment</h3><p>Airy 1,400 sq ft second floor unit with natural lighting and balcony. Modern amenities, 2 bedrooms, spacious living area. Great for families looking for a peaceful residential space.</p><p><strong>Features:</strong> Balcony, Natural Light, Elevator Access</p><ul><li>1,400 square feet</li><li>2 Bedrooms</li><li>Balcony with Views</li><li>Elevator Access</li></ul>', '2'
WHERE EXISTS (SELECT 1 FROM "properties" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "units" ("id", "property_id", "name", "floor", "sqft_number", "rent_per_sqft_price", "maintenance_per_sqft_price", "status", "is_furnished", "description", "tenant_id")
SELECT '6', '2', '301', '3', '1600', '40', '5', 'occupied', FALSE, '<img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop" alt="Spacious Apartment" style="width: 486px; margin: 0px auto;" /> <h3>Spacious 3rd Floor Unit</h3><p>Premium 1,600 sq ft residential unit on 3rd floor with excellent ventilation. 3 bedrooms, modular kitchen, and premium fixtures. Ideal for growing families seeking extra space.</p><p><strong>Premium Features:</strong> 3 Bedrooms, Modular Kitchen, Premium Finish</p><ul><li>1,600 square feet</li><li>3 Bedrooms</li><li>Modular Kitchen</li><li>Premium Fixtures</li></ul>', '2'
WHERE EXISTS (SELECT 1 FROM "properties" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "units" ("id", "property_id", "name", "floor", "sqft_number", "rent_per_sqft_price", "maintenance_per_sqft_price", "status", "is_furnished", "description", "tenant_id")
SELECT '7', '2', '401', '4', '1400', '38', '5', 'occupied', TRUE, '<img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=500&fit=crop" alt="Top Floor Apartment" style="width: 486px; margin: 0px auto;" /><h3>Top Floor Residential</h3><p>Elegant 1,400 sq ft top floor apartment with terrace access. Features 2 bedrooms, contemporary design, and panoramic views. Perfect for professionals seeking a modern lifestyle.</p><p><strong>Special Features:</strong> Terrace Access, Top Floor, City Views</p><ul><li>1,400 square feet</li><li>2 Bedrooms</li><li>Terrace Access</li><li>Panoramic Views</li></ul>', '2'
WHERE EXISTS (SELECT 1 FROM "properties" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "units" ("id", "property_id", "name", "floor", "sqft_number", "rent_per_sqft_price", "maintenance_per_sqft_price", "status", "is_furnished", "description", "tenant_id")
SELECT '8', '3', 'G01', '0', '800', '80', '10', 'occupied', TRUE, '<img src="https://images.unsplash.com/photo-1555529902-5261145633bf?w=800&h=500&fit=crop" alt="Retail Space" style="width: 486px; margin: 0px auto;" /><h3>Prime Ground Floor Retail</h3><p>High-visibility 800 sq ft retail space with street frontage. Perfect for food retail, convenience stores, or cafes. Heavy foot traffic area with excellent business potential.</p><p><strong>Business Advantages:</strong> Street Access, High Footfall, Display Windows</p><ul><li>800 square feet</li><li>Ground Floor</li><li>Street Frontage</li><li>High Visibility</li></ul>', '2'
WHERE EXISTS (SELECT 1 FROM "properties" ref WHERE ref."id" = '3') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "units" ("id", "property_id", "name", "floor", "sqft_number", "rent_per_sqft_price", "maintenance_per_sqft_price", "status", "is_furnished", "description", "tenant_id")
SELECT '9', '3', 'G02', '0', '600', '75', '10', 'available', TRUE, '<img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop" alt="Compact Retail" style="width: 486px; margin: 0px auto;" /><h3>Compact Retail Space</h3><p>Cozy 600 sq ft ground floor retail unit ideal for boutiques, salons, or service businesses. Corner location with good visibility and convenient customer access.</p><p><strong>Features:</strong> Corner Unit, Ground Access, Compact Layout</p><ul><li>600 square feet</li><li>Corner Location</li><li>Ground Floor</li><li>High Visibility</li></ul>', '2'
WHERE EXISTS (SELECT 1 FROM "properties" ref WHERE ref."id" = '3') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "units" ("id", "property_id", "name", "floor", "sqft_number", "rent_per_sqft_price", "maintenance_per_sqft_price", "status", "is_furnished", "description", "tenant_id")
SELECT '10', '3', '201', '2', '1800', '60', '8', 'occupied', FALSE, '<img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop" alt="Mixed Use Space" style="width: 486px; margin: 0px auto;" /><h3>Mixed Use Office Space</h3><p>Versatile 1,800 sq ft second floor space suitable for office or showroom use. Open layout with flexible configuration options. Ideal for businesses needing display and work areas.</p><p><strong>Flexible Options:</strong> Open Layout, Multi-Purpose, Good Lighting</p><ul><li>1,800 square feet</li><li>Open Floor Plan</li><li>Flexible Configuration</li><li>Natural Lighting</li></ul>', '2'
WHERE EXISTS (SELECT 1 FROM "properties" ref WHERE ref."id" = '3') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "password_auths";
INSERT INTO "password_auths" ("id", "user_id", "password_hash", "last_password_change_date", "recent_password_hashes", "password_reset_token", "password_reset_expires_date", "locked_until", "lockout_count", "force_password_change_flag", "tenant_id")
SELECT '1', '1', '$2a$10$ihrysxo2WWxTAYjY/bwK2.WpeO0vAJNMFGT.nYl.kPatdiwIXbjPy', '2026-07-16T06:58:34.723Z', '$2a$10$ihrysxo2WWxTAYjY/bwK2.WpeO0vAJNMFGT.nYl.kPatdiwIXbjPy', NULL, NULL, NULL, NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "users" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "session_records";
INSERT INTO "session_records" ("id", "user_id", "app_version", "sign_in_at", "ip_address", "location", "device_info", "auth_method", "session_token_hash", "session_token_expires_at", "is_active", "sign_out_at", "sign_out_reason", "tenant_id")
SELECT '1', '1', '2026-07-16T06:58:46.274Z', '2026-07-16T06:59:55.100Z', '2409:4091:9031:fe09:88bc:906:d432:a1f1', '{"city":"Bengaluru","country":"IN","country_code":"IN"}', 'Linux - Chrome (Bengaluru, IN)', 'password', 'b1c68897f48cfa0c86b6bbc7dc852c92d71808e1f2c84971bb1d6ead9141980f', '2026-07-18T06:59:55.100Z', TRUE, NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "users" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "rental_agreements";
INSERT INTO "rental_agreements" ("id", "unit_id", "customer_id", "status", "rental_start_date", "rental_end_date", "agreement_date", "rent_amount", "security_deposit_amount", "rental_agreement_attachment_file_id", "rental_agreement_attachment_file_name", "tenant_id")
SELECT '1', '1', '1', 'active', '2025-12-01', '2027-11-30', '2025-11-15', '162500', '487500', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "units" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "customers" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "rental_agreements" ("id", "unit_id", "customer_id", "status", "rental_start_date", "rental_end_date", "agreement_date", "rent_amount", "security_deposit_amount", "rental_agreement_attachment_file_id", "rental_agreement_attachment_file_name", "tenant_id")
SELECT '2', '2', '2', 'active', '2026-01-01', '2027-12-31', '2025-12-20', '130000', '390000', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "units" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "customers" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "rental_agreements" ("id", "unit_id", "customer_id", "status", "rental_start_date", "rental_end_date", "agreement_date", "rent_amount", "security_deposit_amount", "rental_agreement_attachment_file_id", "rental_agreement_attachment_file_name", "tenant_id")
SELECT '3', '4', '3', 'active', '2026-03-01', '2027-02-28', '2026-02-15', '42000', '126000', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "units" ref WHERE ref."id" = '4') AND
  EXISTS (SELECT 1 FROM "customers" ref WHERE ref."id" = '3') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "rental_agreements" ("id", "unit_id", "customer_id", "status", "rental_start_date", "rental_end_date", "agreement_date", "rent_amount", "security_deposit_amount", "rental_agreement_attachment_file_id", "rental_agreement_attachment_file_name", "tenant_id")
SELECT '4', '6', '4', 'active', '2026-02-01', '2027-01-31', '2026-01-20', '64000', '192000', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "units" ref WHERE ref."id" = '6') AND
  EXISTS (SELECT 1 FROM "customers" ref WHERE ref."id" = '4') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "rental_agreements" ("id", "unit_id", "customer_id", "status", "rental_start_date", "rental_end_date", "agreement_date", "rent_amount", "security_deposit_amount", "rental_agreement_attachment_file_id", "rental_agreement_attachment_file_name", "tenant_id")
SELECT '5', '7', '4', 'active', '2026-02-01', '2027-01-31', '2026-01-20', '53200', '159600', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "units" ref WHERE ref."id" = '7') AND
  EXISTS (SELECT 1 FROM "customers" ref WHERE ref."id" = '4') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "rental_agreements" ("id", "unit_id", "customer_id", "status", "rental_start_date", "rental_end_date", "agreement_date", "rent_amount", "security_deposit_amount", "rental_agreement_attachment_file_id", "rental_agreement_attachment_file_name", "tenant_id")
SELECT '6', '8', '5', 'active', '2026-03-01', '2027-02-28', '2026-02-15', '64000', '192000', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "units" ref WHERE ref."id" = '8') AND
  EXISTS (SELECT 1 FROM "customers" ref WHERE ref."id" = '5') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "leads";
INSERT INTO "leads" ("id", "unit_id", "status", "inquiry_date", "customer_name", "customer_phone", "customer_email", "tenant_id")
SELECT '1', '8', 'converted', '2026-02-01', 'Fresh Foods Mumbai', '+91-9876541230', 'sanjay@freshfoods.in', '2'
WHERE EXISTS (SELECT 1 FROM "units" ref WHERE ref."id" = '8') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "leads" ("id", "unit_id", "status", "inquiry_date", "customer_name", "customer_phone", "customer_email", "tenant_id")
SELECT '2', '3', 'negotiating', '2026-03-15', 'TechStart Innovations', '+91-9123456789', 'contact@techstart.io', '2'
WHERE EXISTS (SELECT 1 FROM "units" ref WHERE ref."id" = '3') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "leads" ("id", "unit_id", "status", "inquiry_date", "customer_name", "customer_phone", "customer_email", "tenant_id")
SELECT '3', '5', 'new', '2026-04-10', 'Mr. Anil Deshmukh', '+91-9988112233', 'anil.deshmukh@gmail.com', '2'
WHERE EXISTS (SELECT 1 FROM "units" ref WHERE ref."id" = '5') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "user_security_profiles";
INSERT INTO "user_security_profiles" ("id", "user_id", "email", "last_login_date", "reactivated_at", "failed_login_attempts_count", "creation_ip_address", "creation_location", "auth_policy_id", "is_password_enrolled", "is_authenticator_enrolled", "is_passkey_enrolled", "primary_method", "recovery_codes_remaining_count", "totp_credential_id", "password_auth_id", "passkey_credential_identifiers", "is_new_location_notify_enabled", "is_new_device_notify_enabled", "is_account_lockout_notify_enabled", "bypass_code_hash", "bypass_code_expires_at", "setup_token", "setup_token_expires_at", "inactive_locked_at", "tenant_id")
SELECT '1', '1', 'dinesh@mahaswami.com', '2026-07-16T06:59:55.100Z', NULL, '0', NULL, NULL, '1', TRUE, FALSE, FALSE, 'password', '0', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "users" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "auth_policies" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "password_auths" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "service_requests";
INSERT INTO "service_requests" ("id", "rental_agreement_id", "customer_id", "request_type", "status", "request_date", "completed_date", "tenant_id")
SELECT '1', '1', '1', 'plumbing', 'completed', '2026-02-15', '2026-02-16', '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "customers" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "service_requests" ("id", "rental_agreement_id", "customer_id", "request_type", "status", "request_date", "completed_date", "tenant_id")
SELECT '2', '2', '2', 'electrical', 'completed', '2026-03-05', '2026-03-06', '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "customers" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "service_requests" ("id", "rental_agreement_id", "customer_id", "request_type", "status", "request_date", "completed_date", "tenant_id")
SELECT '3', '3', '3', 'plumbing', 'in_progress', '2026-04-01', NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '3') AND
  EXISTS (SELECT 1 FROM "customers" ref WHERE ref."id" = '3') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "service_requests" ("id", "rental_agreement_id", "customer_id", "request_type", "status", "request_date", "completed_date", "tenant_id")
SELECT '4', '6', '5', 'hvac', 'open', '2026-03-20', NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '6') AND
  EXISTS (SELECT 1 FROM "customers" ref WHERE ref."id" = '5') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "invoices";
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '1', 'INV-0001', '2026-01-05', 'rent', '1', 'paid', '2026-01-15', '182500', '32850', '215350', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '2', 'INV-0002', '2026-01-05', 'rent', '2', 'paid', '2026-01-15', '146000', '26280', '172280', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '3', 'INV-0003', '2026-01-05', 'rent', '3', 'paid', '2026-01-15', '48000', '0', '48000', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '3') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '4', 'INV-0004', '2026-02-05', 'rent', '4', 'paid', '2026-02-15', '72000', '0', '72000', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '4') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '5', 'INV-0005', '2026-02-05', 'rent', '5', 'paid', '2026-02-15', '60200', '0', '60200', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '5') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '6', 'INV-0006', '2026-02-05', 'rent', '1', 'paid', '2026-02-15', '182500', '32850', '215350', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '7', 'INV-0007', '2026-02-05', 'rent', '2', 'paid', '2026-02-15', '146000', '26280', '172280', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '8', 'INV-0008', '2026-02-05', 'rent', '3', 'overdue', '2026-02-15', '48000', '0', '48000', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '3') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '9', 'INV-0009', '2026-02-05', 'rent', '4', 'paid', '2026-02-15', '72000', '0', '72000', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '4') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '10', 'INV-0010', '2026-02-05', 'rent', '5', 'paid', '2026-02-15', '60200', '0', '60200', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '5') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '11', 'INV-0011', '2026-03-05', 'rent', '6', 'paid', '2026-03-15', '72000', '12960', '84960', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '6') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '12', 'INV-0012', '2026-03-05', 'rent', '1', 'paid', '2026-03-15', '182500', '32850', '215350', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '13', 'INV-0013', '2026-03-05', 'rent', '2', 'pending', '2026-03-15', '146000', '26280', '172280', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '14', 'INV-0014', '2026-03-05', 'rent', '3', 'paid', '2026-03-15', '48000', '0', '48000', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '3') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '15', 'INV-0015', '2026-03-05', 'rent', '4', 'overdue', '2026-03-15', '72000', '0', '72000', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '4') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '16', 'INV-0016', '2026-03-05', 'rent', '5', 'paid', '2026-03-15', '60200', '0', '60200', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '5') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '17', 'INV-0017', '2026-03-05', 'rent', '6', 'paid', '2026-03-15', '72000', '12960', '84960', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '6') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "invoices" ("id", "invoice_no", "invoice_date", "invoice_type", "rental_agreement_id", "payment_status", "due_date", "base_amount", "gst_amount", "total_amount", "invoice_attachment_file_id", "invoice_attachment_file_name", "tenant_id")
SELECT '18', 'INV-0018', '2026-04-05', 'rent', '1', 'pending', '2026-04-15', '182500', '32850', '215350', NULL, NULL, '2'
WHERE EXISTS (SELECT 1 FROM "rental_agreements" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "work_orders";
INSERT INTO "work_orders" ("id", "unit_id", "work_order_date", "work_order_type", "contractor_id", "service_request_id", "work_order_amount", "notes", "tenant_id")
SELECT '1', '1', '2026-02-16', 'plumbing', '1', '1', '3500', 'Fixed leaking pipe in restroom', '2'
WHERE EXISTS (SELECT 1 FROM "units" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "contractors" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "service_requests" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "work_orders" ("id", "unit_id", "work_order_date", "work_order_type", "contractor_id", "service_request_id", "work_order_amount", "notes", "tenant_id")
SELECT '2', '2', '2026-03-06', 'electrical', '2', '2', '5200', 'Replaced faulty circuit breaker', '2'
WHERE EXISTS (SELECT 1 FROM "units" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "contractors" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "service_requests" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

DELETE FROM "payments";
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '1', '1', 'upi/402509/123456', '2026-01-10', 'upi', '215350', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '1') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '2', '2', 'NEFT/2025091201234', '2026-01-12', 'bank_transfer', '172280', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '2') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '3', '3', 'upi/402509/234567', '2026-01-08', 'upi', '48000', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '3') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '4', '4', 'CHQ/789456', '2026-02-09', 'cheque', '72000', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '4') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '5', '5', 'CHQ/789457', '2026-02-09', 'cheque', '60200', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '5') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '6', '6', 'upi/402510/345678', '2026-02-11', 'upi', '215350', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '6') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '7', '7', 'NEFT/2025101301345', '2026-02-13', 'bank_transfer', '172280', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '7') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '8', '9', 'CHQ/789458', '2026-02-14', 'cheque', '72000', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '9') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '9', '10', 'CHQ/789459', '2026-02-14', 'cheque', '60200', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '10') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '10', '11', 'upi/402511/456789', '2026-03-08', 'upi', '84960', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '11') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '11', '12', 'upi/402511/567890', '2026-03-10', 'upi', '215350', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '12') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '12', '14', 'NEFT/2025111201456', '2026-03-12', 'bank_transfer', '48000', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '14') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '13', '16', 'CHQ/789460', '2026-03-14', 'cheque', '60200', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '16') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');
INSERT INTO "payments" ("id", "invoice_id", "payment_reference", "payment_date", "payment_method", "payment_amount", "tenant_id")
SELECT '14', '17', 'upi/402511/678901', '2026-03-16', 'upi', '84960', '2'
WHERE EXISTS (SELECT 1 FROM "invoices" ref WHERE ref."id" = '17') AND
  EXISTS (SELECT 1 FROM "tenants" ref WHERE ref."id" = '2');

SELECT setval('"tenants_id_seq"', COALESCE((SELECT MAX("id") FROM "tenants"), 0) + 1, false);
SELECT setval('"auto_assign_sequences_id_seq"', COALESCE((SELECT MAX("id") FROM "auto_assign_sequences"), 0) + 1, false);
SELECT setval('"settings_id_seq"', COALESCE((SELECT MAX("id") FROM "settings"), 0) + 1, false);
SELECT setval('"access_logs_id_seq"', COALESCE((SELECT MAX("id") FROM "access_logs"), 0) + 1, false);
SELECT setval('"error_logs_id_seq"', COALESCE((SELECT MAX("id") FROM "error_logs"), 0) + 1, false);
SELECT setval('"files_id_seq"', COALESCE((SELECT MAX("id") FROM "files"), 0) + 1, false);
SELECT setval('"digital_signatures_id_seq"', COALESCE((SELECT MAX("id") FROM "digital_signatures"), 0) + 1, false);
SELECT setval('"auth_policies_id_seq"', COALESCE((SELECT MAX("id") FROM "auth_policies"), 0) + 1, false);
SELECT setval('"properties_id_seq"', COALESCE((SELECT MAX("id") FROM "properties"), 0) + 1, false);
SELECT setval('"contractors_id_seq"', COALESCE((SELECT MAX("id") FROM "contractors"), 0) + 1, false);
SELECT setval('"users_id_seq"', COALESCE((SELECT MAX("id") FROM "users"), 0) + 1, false);
SELECT setval('"document_templates_id_seq"', COALESCE((SELECT MAX("id") FROM "document_templates"), 0) + 1, false);
SELECT setval('"customers_id_seq"', COALESCE((SELECT MAX("id") FROM "customers"), 0) + 1, false);
SELECT setval('"units_id_seq"', COALESCE((SELECT MAX("id") FROM "units"), 0) + 1, false);
SELECT setval('"history_id_seq"', COALESCE((SELECT MAX("id") FROM "history"), 0) + 1, false);
SELECT setval('"password_auths_id_seq"', COALESCE((SELECT MAX("id") FROM "password_auths"), 0) + 1, false);
SELECT setval('"session_records_id_seq"', COALESCE((SELECT MAX("id") FROM "session_records"), 0) + 1, false);
SELECT setval('"totp_credentials_id_seq"', COALESCE((SELECT MAX("id") FROM "totp_credentials"), 0) + 1, false);
SELECT setval('"passkey_credentials_id_seq"', COALESCE((SELECT MAX("id") FROM "passkey_credentials"), 0) + 1, false);
SELECT setval('"recovery_codes_id_seq"', COALESCE((SELECT MAX("id") FROM "recovery_codes"), 0) + 1, false);
SELECT setval('"trusted_devices_id_seq"', COALESCE((SELECT MAX("id") FROM "trusted_devices"), 0) + 1, false);
SELECT setval('"known_devices_id_seq"', COALESCE((SELECT MAX("id") FROM "known_devices"), 0) + 1, false);
SELECT setval('"auth_audit_logs_id_seq"', COALESCE((SELECT MAX("id") FROM "auth_audit_logs"), 0) + 1, false);
SELECT setval('"template_documents_extended_attributes_id_seq"', COALESCE((SELECT MAX("id") FROM "template_documents_extended_attributes"), 0) + 1, false);
SELECT setval('"rental_agreements_id_seq"', COALESCE((SELECT MAX("id") FROM "rental_agreements"), 0) + 1, false);
SELECT setval('"leads_id_seq"', COALESCE((SELECT MAX("id") FROM "leads"), 0) + 1, false);
SELECT setval('"user_security_profiles_id_seq"', COALESCE((SELECT MAX("id") FROM "user_security_profiles"), 0) + 1, false);
SELECT setval('"service_requests_id_seq"', COALESCE((SELECT MAX("id") FROM "service_requests"), 0) + 1, false);
SELECT setval('"invoices_id_seq"', COALESCE((SELECT MAX("id") FROM "invoices"), 0) + 1, false);
SELECT setval('"work_orders_id_seq"', COALESCE((SELECT MAX("id") FROM "work_orders"), 0) + 1, false);
SELECT setval('"payments_id_seq"', COALESCE((SELECT MAX("id") FROM "payments"), 0) + 1, false);