provider "aws" {
  region = "${var.region}"
}

terraform {
  required_version = "0.11.11"

  backend "s3" {
    bucket = "neon-dev-terraform-state"
    key    = "<%= props.appName %>/us-west-2/security-groups/terraform.tfstate"
    region = "us-east-1"

    dynamodb_table = "neon-dev_terraform_statelock"
  }
}