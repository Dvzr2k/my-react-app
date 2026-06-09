# S3 Backend Configuration
#
# How to enable remote state:
# 1. First run `terraform init` and `terraform apply` WITHOUT this backend block
#    to create the S3 bucket and DynamoDB table for state storage.
# 2. Then uncomment the backend block below and fill in your bucket name.
# 3. Run `terraform init -migrate-state` to move local state to S3.

# terraform {
#   backend "s3" {
#     bucket         = "<your-state-bucket-name>"
#     key            = "my-react-app/terraform.tfstate"
#     region         = "us-east-1"
#     dynamodb_table = "<your-lock-table-name>"
#     encrypt        = true
#   }
# }
