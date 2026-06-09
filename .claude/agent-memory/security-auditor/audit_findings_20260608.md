---
name: audit-findings-20260608
description: Security audits on 2026-06-08 (two runs) — findings stable, state file now gitignored but still present on disk
metadata:
  type: project
---

## Audit 1 (2026-06-08, original)

Files audited: main.tf, variables.tf, outputs.tf, providers.tf, backend.tf, terraform.tfstate

Findings summary:
- HIGH: terraform.tfstate committed to git (exposes account ID 092443461861 and resource ARNs)
- HIGH: CloudFront minimum TLS version is TLSv1 (should be TLSv1.2_2021)
- MEDIUM: No response_headers_policy on CloudFront (missing CSP, X-Frame-Options, HSTS, etc.)
- MEDIUM: S3 bucket SSE not declared in HCL (relies on AWS default — not enforced by code)
- MEDIUM: Remote state backend not enabled (backend.tf block is commented out)
- LOW: CloudFront access logging disabled
- LOW: CloudFront IPv6 not enabled (is_ipv6_enabled = false in state)
- LOW: No WAF web_acl_id on CloudFront

Clean items (passed):
- S3 public access block: all four flags true
- CloudFront uses OAC (not OAI)
- viewer_protocol_policy = redirect-to-https
- S3 bucket policy scoped to specific CloudFront ARN via condition
- No wildcard IAM actions or resources
- No hardcoded credentials in .tf files

## Audit 2 (2026-06-08, second run / re-audit)

Changes observed since Audit 1:
- terraform.tfstate is now listed in .gitignore (line 16) — HIGH severity reduced to MEDIUM
  (file is still present on disk; account ID 092443461861 still visible in it; git tracking status not verified)
- All other findings remain open — no new .tf code was added or changed

Outstanding findings (unchanged):
- MEDIUM (was HIGH): state file present on disk with account ID + resource ARNs; gitignored but not removed and not migrated to remote backend
- HIGH: CloudFront viewer_certificate uses cloudfront_default_certificate = true with no minimum_protocol_version set in HCL → state shows TLSv1 (main.tf line 89-91)
- MEDIUM: No aws_cloudfront_response_headers_policy resource; no security headers (CSP, X-Frame-Options, HSTS, X-Content-Type-Options)
- MEDIUM: No aws_s3_bucket_server_side_encryption_configuration resource (SSE present in AWS but not enforced by code)
- MEDIUM: backend.tf S3 backend block is fully commented out (lines 9-17)
- LOW: No logging_config block in aws_cloudfront_distribution.site
- LOW: is_ipv6_enabled absent from HCL (state shows false)
- LOW: No web_acl_id on CloudFront distribution
