---
name: project-infra
description: Current Terraform stack — S3 + CloudFront OAC static site; OIDC IAM role not yet written to Terraform; state gitignored but local
metadata:
  type: project
---

Terraform stack as of 2026-06-08 (re-audited) consists of five files across main.tf, variables.tf, outputs.tf, providers.tf, backend.tf:

- aws_s3_bucket.site — private bucket, public access block fully enabled, SSE-AES256 (from state, not declared in HCL)
- aws_s3_bucket_public_access_block.site — all four flags set to true (main.tf lines 15-22)
- aws_s3_bucket_policy.site — OAC-scoped GetObject, conditioned on CloudFront ARN (main.tf lines 33-55)
- aws_cloudfront_origin_access_control.site — OAC (not OAI), sigv4, signing always (main.tf lines 25-30)
- aws_cloudfront_distribution.site — redirect-to-https (line 71), default CF cert (TLSv1 min from state, no explicit TLS floor in HCL line 89-91), no response headers policy, no WAF, no logging, no IPv6

State file: terraform.tfstate is now listed in .gitignore but still exists on disk locally; S3 remote backend is commented out in backend.tf.

**Why:** Capstone portfolio project; infrastructure simplicity prioritized over compliance hardening at this stage.
**How to apply:** Flag missing security controls (headers, WAF, TLS floor, logging, state backend) but treat them as improvements, not blockers.

OIDC IAM role for GitHub Actions is mentioned in CLAUDE.md architecture but has no corresponding Terraform resource in the codebase — it may be applied manually or not yet created.

Account ID 092443461861 is visible in terraform.tfstate (line 35 of state file).
