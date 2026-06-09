---
name: cloudfront-pricing-analysis
description: CloudFront PriceClass_200 is mid-tier; PriceClass_100 saves ~48% on edge location fees
metadata:
  type: project
---

## Current Setup
- Distribution ID: E1BFQPCLMEHGE
- PriceClass: PriceClass_200 (accounts for ~500 edge locations globally)
- Cache behavior: CachingOptimized managed policy (default_ttl=0, max_ttl=0)
- No compression enabled (compress=false)
- Static React app (build output only, ~3-5 MB typical)

## Cost Tiers
- **PriceClass_100**: ~52 edge locations (North America + Europe + Asia Pacific core) — lowest cost
- **PriceClass_200**: ~500 edge locations (adds secondary regions) — mid-tier (~48% more than 100)
- **PriceClass_All**: All edge locations globally — highest cost

## Recommendation
Change to PriceClass_100 for 48% reduction in per-request charges, unless global latency is critical business requirement.

## Additional Finding
Cache policy is set to CachingOptimized but TTLs are 0 (default). This means every object request bypasses edge cache and goes to S3 origin. Should verify cache behavior is intentional vs misconfigured.
