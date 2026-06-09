# My React App — AWS DevOps Capstone

![Live](https://img.shields.io/badge/site-live-brightgreen)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![AWS](https://img.shields.io/badge/AWS-S3%20%2B%20CloudFront-orange?logo=amazon-aws)
![Terraform](https://img.shields.io/badge/IaC-Terraform-7b42bc?logo=terraform)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088ff?logo=github-actions)
![Claude](https://img.shields.io/badge/AI-Claude%20Code-black?logo=anthropic)

**Live site:** https://d255xh9kackac4.cloudfront.net

A React 19 portfolio app deployed to AWS using S3 + CloudFront, provisioned with Terraform, automated via GitHub Actions with OIDC keyless authentication, and orchestrated entirely by Claude Code as the AI engine.

---

## Architecture

```mermaid
flowchart TD
    DEV["👨‍💻 Developer\n(local)"]
    GH["🐙 GitHub\npush to main"]
    GHA["⚙️ GitHub Actions\nnpm ci + npm run build\nOIDC → AWS auth"]
    OIDC["🔑 IAM OIDC Role\nno stored keys"]

    subgraph CLAUDE ["🤖 Claude Code — AI Orchestration"]
        direction TB
        TFW["tf-writer\nTerraform gen"]
        SEC["security-auditor\nTF audit · Sonnet"]
        COST["cost-optimizer\nHaiku"]
        DRIFT["drift-detector\nHaiku"]
        HOOKS["🛡️ Safety Hooks\nUserPromptSubmit · PreToolUse · PostToolUse"]
        SKILLS["Skills: /deploy · /tf-plan · /tf-apply · /infra-audit"]
    end

    TF["🏗️ Terraform\nIaC Provisioning"]

    subgraph AWS ["☁️ AWS Infrastructure"]
        S3["🪣 S3 Bucket\nStatic hosting · OAC"]
        CF["☁️ CloudFront\nCDN · Cache invalidation"]
        TFSTATE["🔒 TF State\nS3 backend\n(DynamoDB lock optional)"]
    end

    USER["🌐 End User\nReact SPA"]

    DEV -->|git push| GH
    GH -->|trigger workflow| GHA
    GHA -->|assume role| OIDC
    GHA -->|sync build/| S3
    GHA -->|invalidate cache| CF
    DEV -.->|invoke skills| CLAUDE
    CLAUDE --> TF
    TF -->|provision| S3
    TF -->|provision| CF
    TF -->|provision| OIDC
    TF -->|manage| TFSTATE
    CF -->|serve static assets| USER

    style CLAUDE fill:#1c1c2e,stroke:#d2a8ff,color:#d2a8ff
    style AWS fill:#1a1f2e,stroke:#e3b341,color:#e3b341
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19 | UI component |
| Hosting | AWS S3 | Static file storage |
| CDN | AWS CloudFront | HTTPS + global delivery |
| Auth | AWS IAM + OIDC | Keyless CI/CD authentication |
| Encryption | AES256 (SSE-S3) | S3 object encryption |
| IaC | Terraform | Infrastructure provisioning |
| CI/CD | GitHub Actions | Auto-deploy on push to main |
| AI Engine | Claude Code | Agentic DevOps orchestration |

---

## Project Structure

```
my-react-app/
├── src/                        # React source code
├── public/                     # Static assets
├── terraform/                  # All AWS infrastructure
│   ├── main.tf                 # S3 + CloudFront + encryption
│   ├── github-oidc.tf          # OIDC provider + IAM role
│   ├── variables.tf
│   ├── outputs.tf
│   ├── providers.tf
│   └── backend.tf              # S3 remote state (optional)
├── .github/
│   └── workflows/
│       └── build-deploy.yaml   # CI/CD pipeline
├── .claude/
│   ├── agents/                 # security-auditor, cost-optimizer, drift-detector, tf-writer
│   ├── skills/                 # /tf-plan, /tf-apply, /deploy, /infra-audit, etc.
│   ├── hooks/                  # Safety guards
│   ├── settings.json           # Hooks configuration
│   └── settings.local.json     # AWS credentials (gitignored)
├── .mcp.json                   # MCP servers (AWS + Terraform)
└── CLAUDE.md                   # Claude Code instructions
```

---

## Claude Code Features

### Skills
| Skill | Purpose |
|---|---|
| `/scaffold-terraform` | Generates all Terraform files from scratch |
| `/tf-plan` | Runs terraform plan + risk analysis |
| `/tf-apply` | Runs terraform apply + verifies deployment |
| `/deploy` | Builds React app and syncs to S3 + invalidates CloudFront |
| `/setup-gh-actions` | Creates or validates the GitHub Actions workflow |
| `/infra-audit` | Parallel security + cost + drift audit |
| `/infra-status` | Health dashboard of all resources |

### Subagents
| Agent | Model | Tools | Purpose |
|---|---|---|---|
| `security-auditor` | Sonnet | Read | Audits Terraform for security issues |
| `cost-optimizer` | Haiku | Read | Finds cost optimization opportunities |
| `drift-detector` | Haiku | Bash, Read | Detects infrastructure drift |
| `tf-writer` | Sonnet | Read, Write | Generates production-quality Terraform |

### Hooks
| Hook | Event | Guards Against |
|---|---|---|
| `user-prompt-guard` | UserPromptSubmit | Destructive prompts (nuke, wipe, delete all) |
| `pre-tool-guard` | PreToolUse | Dangerous commands (terraform destroy, aws s3 rm) |
| `post-tool-logger` | PostToolUse | Logs every terraform apply to deploy.log |

### MCP Servers
- **AWS MCP** — Claude queries live AWS resources directly
- **Terraform MCP** — Claude looks up provider docs from the official registry

---

## CI/CD Flow

Every push to `main` triggers the pipeline automatically:

```yaml
- uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::092443461861:role/my-react-app-github-actions-role

- run: npm ci && npm run build
- run: aws s3 sync build/ s3://my-react-app-production-site --delete
- run: aws cloudfront create-invalidation --distribution-id E1BFQPCLMEHGE --paths "/*"
```

No AWS access keys stored anywhere — OIDC issues a temporary 1-hour token scoped to this repo and main branch only.

---

## Security

- S3 bucket is fully private — accessible only via CloudFront OAC
- HTTPS enforced — HTTP redirects to HTTPS automatically
- OIDC authentication — no long-lived AWS credentials
- IAM least privilege — only S3 sync + CloudFront invalidation permissions
- AES256 encryption at rest on all S3 objects

---

## Local Development

```bash
npm install --no-bin-links        # VMware shared folder workaround
npm start                         # Run dev server
```

> **Note:** On VMware hgfs use `node node_modules/react-scripts/bin/react-scripts.js build` instead of `npm run build`

---

## How to Use

### Deploy a React code change (automatic)
```
1. Edit any file in src/
2. git add + commit + push to main
3. GitHub Actions triggers automatically (~2 min)
4. Site updates — no manual steps needed
```

### Add or change infrastructure
```
1. Claude uses MCP to look up resource docs from Terraform registry
2. tf-writer agent generates or modifies the .tf file
3. /tf-plan     → preview what will change in AWS
4. /tf-apply    → push changes to AWS
5. /infra-audit → verify security + cost + drift
6. git push     → save .tf changes to GitHub
```
> Always commit your .tf changes after applying — keeps code and AWS in sync.

### Audit → fix → verify loop
```
1. /infra-audit              → get full security + cost + drift report
2. "fix [finding name]"      → Claude uses MCP + tf-writer to apply fix
3. /tf-plan                  → preview the fix
4. /tf-apply                 → push fix to AWS
5. /infra-audit              → verify finding is gone
6. git push                  → save to GitHub
```

### Health checks
```
/infra-status   → quick check: is everything alive? (S3, CloudFront, HTTP 200)
/infra-audit    → full checkup: security + cost + drift all at once
```

### When to use each skill or agent

| Situation | Use |
|---|---|
| Something looks broken | `/infra-status` |
| Before a big change | `/infra-audit` |
| Adding new AWS resources | MCP → tf-writer → `/tf-plan` → `/tf-apply` |
| Security concern | `security-auditor` agent directly |
| Cost review | `cost-optimizer` agent directly |
| Suspected drift | `drift-detector` agent directly |
| Emergency deploy (CI/CD failed) | `/deploy` |

---

Built by **Diego Valdez** · Powered by React, AWS & Claude Code · 2026
