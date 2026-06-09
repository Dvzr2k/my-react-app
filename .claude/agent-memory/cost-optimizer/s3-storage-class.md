---
name: s3-storage-class-analysis
description: S3 bucket using Standard storage class; Intelligent-Tiering could reduce costs for variable access patterns
metadata:
  type: project
---

## Current Setup
- Storage class: Standard (default)
- Bucket size: ~3-5 MB typical (build artifacts from React app)
- Versioning: Disabled
- Lifecycle rules: None

## Storage Class Options
- **Standard**: $0.023/GB/month (good for frequent access)
- **Intelligent-Tiering**: $0.0125/GB/month for Frequent tier, auto-moves to Infrequent ($0.0125) after 30 days
- **Standard-IA**: $0.0125/GB/month (cheaper but retrieval fees apply)

## Recommendation
For static build artifacts (rarely updated, published only via CI/CD):
- Enable **S3 Intelligent-Tiering** — no performance impact, auto-manages tiers
- Even if all files stay in Frequent tier, breaks even after ~2 months of inactivity
- Minimal monthly cost for this size bucket anyway (~$0.12 for 5 MB), but good practice for future scale

## Implementation
- Add `aws_s3_bucket_intelligent_tiering_configuration` resource
- Set automatic transitions to Infrequent after 30 days
