---
name: deploy
description: Sync site files to S3 and invalidate CloudFront cache. Use after terraform apply to push site content live.
allowed-tools: Bash, Read
disable-model-invocation: true
---

Manually deploy the React app to S3 and invalidate CloudFront cache.

Steps:
- [ ] Get terraform outputs: `cd terraform && terraform output -json`
- [ ] Install dependencies: `npm install`
- [ ] Build React app: `npm run build`
- [ ] Sync build folder: `aws s3 sync build/ s3://<bucket> --delete`
- [ ] Invalidate cache: `aws cloudfront create-invalidation --distribution-id <dist-id> --paths "/*"`
- [ ] Report the CloudFront URL and invalidation status

If any step fails, stop and report the error. Do not continue to the next step.
