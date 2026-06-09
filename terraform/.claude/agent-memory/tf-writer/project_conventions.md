---
name: project-conventions
description: Naming, tagging, and code style conventions used across all Terraform files in this project
metadata:
  type: project
---

## Tagging

All resources use exactly two tags with no extras:

```hcl
tags = {
  Project     = var.project_name
  Environment = var.environment
}
```

## Resource naming

Names follow `${var.project_name}-${var.environment}-<suffix>` for AWS-visible names (e.g., S3 bucket). IAM resources drop the environment segment and use `${var.project_name}-<role/policy-name>`.

## Policies

All IAM and bucket policies are written inline using `jsonencode({...})` — no heredoc strings, no external JSON files.

## Locals

Computed or repeated values are extracted to a `locals {}` block at the top of the file that needs them (e.g., `bucket_name` in main.tf).

## Provider constraints

AWS provider pinned with `~> 5.0`. Terraform version `>= 1.5`.

## OIDC / GitHub Actions pattern

- `thumbprint_list = []` — AWS natively trusts GitHub's OIDC CA; an empty list is correct and intentional.
- Trust policy uses `StringEquals` on `aud` (value: `sts.amazonaws.com`) AND `StringLike` on `sub` scoped to the specific repo and branch (`repo:Dvzr2k/my-react-app:ref:refs/heads/main`).
- Inline policy (`aws_iam_role_policy`) rather than managed policy — keeps permissions co-located with the role.

**Why:** Least-privilege, no hardcoded keys, branch-scoped to main only.
**How to apply:** Use this pattern for any future CI/CD OIDC role additions.
