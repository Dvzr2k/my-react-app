---
name: cloudfront-compression-finding
description: CloudFront compression disabled; React bundles benefit from gzip compression
metadata:
  type: project
---

## Current Setup
- Compression: Disabled (compress=false in default_cache_behavior)
- Content type: Static React app (HTML, JS, CSS, images)
- React bundle: Typically 30-150 KB uncompressed per app

## Impact
- JavaScript bundles compress by 60-70% with gzip
- CSS by 50-70%
- HTML by 60-80%
- Images: No benefit (already compressed)

## Cost Impact
- Data transfer charges reduced by ~65-70% for text/script files
- CloudFront data transfer OUT to Internet: $0.085/GB (expensive tier)
- Compression saves ~$0.06/GB transferred for typical React apps

## Recommendation
**Enable CloudFront compression** (set compress=true in default_cache_behavior).
- No origin cost (S3 serves pre-compressed with gzip, CloudFront just passes it)
- Viewers with Accept-Encoding: gzip get compressed responses automatically
- Pure savings, no tradeoffs
- Estimated impact: 10-20% reduction in data transfer charges (high impact for bandwidth-heavy traffic)
