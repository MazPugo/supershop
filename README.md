# Supershop

A production-grade static e-commerce website hosted on AWS, provisioned entirely with CloudFormation and deployed automatically via GitHub Actions.

The project demonstrates a complete cloud architecture: private S3 origins fronted by CloudFront, WAF protection, a dedicated images bucket with lifecycle policies, cross-region replication for disaster recovery, a CloudWatch monitoring dashboard, and a CI/CD pipeline.

## Architecture

```
                            ┌─────────────┐
   Users ────HTTPS────────▶ │  CloudFront │ ◀──── WAF (SQLi + Bad Inputs)
                            └──────┬──────┘
                        ┌──────────┴───────────┐
                  default /*              /images/*
                        │                      │
                 ┌──────▼──────┐        ┌───────▼───────┐
                 │  Website    │        │    Images     │
                 │  S3 bucket  │        │   S3 bucket   │   (private, OAC only)
                 └──────┬──────┘        └───────┬───────┘
                        │  Cross-Region Replication (versioned)
                 ┌──────▼──────┐        ┌───────▼───────┐
                 │ Website DR  │        │  Images DR    │   (eu-west-2)
                 │  S3 bucket  │        │   S3 bucket   │
                 └─────────────┘        └───────────────┘
```

## Features

- **Static site hosting** — private S3 bucket served exclusively through CloudFront using Origin Access Control (OAC). No public bucket access.
- **Web Application Firewall** — AWS WAF on the CloudFront distribution with managed rule groups for SQL injection and known bad inputs.
- **Dedicated images origin** — a separate S3 bucket serves product images via a `/images/*` CloudFront path, with its own OAC.
- **Storage lifecycle** — image objects transition to S3 Standard-IA after 60 days and to Glacier after 180 days.
- **Disaster recovery** — Cross-Region Replication copies both buckets to `eu-west-2`, with versioning enabled on all source and destination buckets.
- **Monitoring** — a CloudWatch dashboard tracking CloudFront requests, error rates, bytes downloaded, and S3 request metrics.
- **CI/CD** — GitHub Actions syncs the site to S3 and invalidates the CloudFront cache on every push to `main`.

## Repository structure

```
.
├── index.html              # Supershop storefront markup + SPA router
├── app.js                  # Product data, cart logic, rendering
├── styles.css              # Storefront styles
├── deploy.yaml             # Main CloudFormation stack (us-east-1)
├── deploy-dr.yaml          # DR destination buckets (eu-west-2)
├── portfolio/              # Standalone personal portfolio site
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── .github/workflows/
    └── deploy.yml          # CI/CD pipeline
```

## Prerequisites

- An AWS account with permissions to create S3, CloudFront, WAF, IAM, and CloudWatch resources
- [AWS CLI](https://aws.amazon.com/cli/) configured with credentials
- A GitHub repository with the required secrets configured (see below)

> **Note:** The main stack must be deployed to **us-east-1** because WAF WebACLs for CloudFront can only be created there.

## Deployment

### 1. Deploy the disaster recovery stack (secondary region)

The destination buckets must exist before replication rules are applied.

```bash
aws cloudformation deploy \
  --template-file deploy-dr.yaml \
  --stack-name supershop-dr \
  --parameter-overrides BucketName=supershop-mazpugo \
  --region eu-west-2
```

### 2. Deploy the main stack (primary region)

```bash
aws cloudformation deploy \
  --template-file deploy.yaml \
  --stack-name supershop \
  --parameter-overrides GitHubOrg=<your-github-user> GitHubRepo=<your-repo> \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1
```

### 3. Configure GitHub secrets

In your repository under **Settings → Secrets and variables → Actions**, add:

| Secret | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key ID |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret access key |
| `S3_BUCKET_NAME` | Website bucket name (e.g. `supershop-mazpugo`) |
| `CLOUDFRONT_DISTRIBUTION_ID` | From the `CloudFrontDistributionId` stack output |

### 4. Push to deploy

```bash
git push origin main
```

The workflow syncs `index.html`, `app.js`, and `styles.css` to S3, then creates a CloudFront invalidation so the latest content is served immediately.

## CI/CD pipeline

The workflow in `.github/workflows/deploy.yml` runs on every push to `main`:

1. Checks out the repository
2. Configures AWS credentials from repository secrets
3. Copies the site files to the website S3 bucket with appropriate content types and cache headers
4. Creates a CloudFront invalidation (`/*`) to clear the CDN cache

## Stack outputs

After deploying the main stack, retrieve useful values:

```bash
aws cloudformation describe-stacks --stack-name supershop --region us-east-1 \
  --query "Stacks[0].Outputs" --output table
```

| Output | Description |
|---|---|
| `CloudFrontURL` | The public website URL |
| `CloudFrontDistributionId` | Distribution ID for cache invalidation |
| `DashboardURL` | CloudWatch dashboard link |
| `BucketName` | Website S3 bucket name |
| `ImagesBucketName` | Images S3 bucket name |
| `WebACLArn` | WAF Web ACL ARN |

## Cleanup

S3 buckets have versioning enabled, so all object versions must be purged before the stacks can be deleted.

```bash
# Empty all object versions (repeat per bucket / region)
python -c "import boto3; boto3.resource('s3', region_name='us-east-1').Bucket('supershop-mazpugo').object_versions.delete()"
python -c "import boto3; boto3.resource('s3', region_name='us-east-1').Bucket('supershop-mazpugo-images').object_versions.delete()"
python -c "import boto3; boto3.resource('s3', region_name='eu-west-2').Bucket('supershop-mazpugo-dr').object_versions.delete()"
python -c "import boto3; boto3.resource('s3', region_name='eu-west-2').Bucket('supershop-mazpugo-images-dr').object_versions.delete()"

# Delete the stacks (DR first, then main)
aws cloudformation delete-stack --stack-name supershop-dr --region eu-west-2
aws cloudformation delete-stack --stack-name supershop --region us-east-1
```

## Portfolio site

The `portfolio/` directory contains a standalone, single-page personal portfolio (HTML, CSS, and JavaScript only — no backend). Open `portfolio/index.html` in a browser to view it, or deploy it to S3 under a `/portfolio/` prefix.

## Build roadmap

The project was built incrementally. Each step below maps to a service and a concrete deliverable.

| # | Step | Service | What was done |
|---|------|---------|---------------|
| 1 | **Create static website** | HTML/CSS/JS | Built an Amazon-style e-commerce storefront ("Supershop") with product search and buy flows. Frontend only — no backend or tests. |
| 2 | **Deploy to S3** | Amazon S3 | CloudFormation template creates an S3 bucket and deploys the site, with static website hosting enabled. |
| 3 | **Set up CDN** | Amazon CloudFront | CloudFront distribution uses the S3 bucket as origin. Origin Access Control (OAC) attached; all public bucket access blocked so content is served only through CloudFront. |
| 4 | **Custom domain** | Amazon Route 53 | Configured via the AWS Management Console (not in template). |
| 5 | **SSL/TLS** | AWS ACM | Certificate issued and attached via the AWS Management Console (not in template). |
| 6 | **Secure with WAF** | AWS WAF | Managed rule groups for SQL injection and known bad inputs attached to the CloudFront distribution. |
| 7 | **Monitoring** | CloudWatch / CloudTrail | CloudWatch dashboard displaying CloudFront `Requests` and S3 `AllRequests` metrics (plus error rates and bytes downloaded). |
| 8 | **CI/CD pipeline** | GitHub Actions | Workflow triggers on push to `main`, syncs files to S3, and invalidates the CloudFront cache. Auth via GitHub repository secrets. |
| 9 | **Separate images bucket** | Amazon S3 | Dedicated private images bucket with its own OAC, served through a `/images/*` CloudFront path. |
| 10 | **Transfer Acceleration** | Amazon S3 | Enabled on both the website and images buckets for faster uploads via edge locations. |
| 11 | **Lifecycle rules** | Amazon S3 | Images transition to Standard-IA after 60 days and to Glacier after 180 days. |
| 12 | **Cross-Region Replication** | Amazon S3 | Versioning on all buckets, an IAM replication role, and rules replicating all objects to DR buckets in `eu-west-2`. |
| 13 | **Cost estimation** | AWS Pricing Calculator | Estimate the monthly cost of the architecture (done via the calculator). |

> Steps 4 and 5 (Route 53 + ACM) are performed in the AWS Management Console and are intentionally not part of the CloudFormation template.

### Using S3 Transfer Acceleration

Once enabled, upload through the accelerated endpoint for faster transfers from distant locations:

```bash
aws s3 cp index.html s3://supershop-mazpugo/index.html \
  --endpoint-url https://s3-accelerate.amazonaws.com
```

## Tech stack

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Infrastructure:** AWS CloudFormation
- **AWS services:** S3, CloudFront, WAF, IAM, CloudWatch, Route 53, ACM
- **CI/CD:** GitHub Actions

## License

This project is provided as-is for demonstration and learning purposes.
