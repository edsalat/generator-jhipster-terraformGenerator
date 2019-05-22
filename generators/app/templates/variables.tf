variable "region" {
  type    = "string"
  default = "us-west-2"
}

variable "trdevops_cidrs" {
  type        = "list"
  description = "cidrs of tr-devops aws account"
  default     = ["10.236.0.0/21"]
}

variable "trdev_cidrs" {
  type        = "list"
  description = "cidrs of tr-dev aws account"

  default = [
    "172.30.0.0/16", # main_vpc vpc-5c039139 us-west-2
    "172.31.0.0/16", # default_vpc vpc-c7198aa2 us-west-2
    "10.152.0.0/20", # bridge_vpc vpc-89ee4ced us-west-2
  ]
}

variable "main_vpc" {
  type        = "string"
  description = "tr-dev aws account vpc id"
}

variable "default_tags" {
  type = "map"

  default = {
    "tr:appFamily"        = "<%= props.appName %>"
    "tr:appName"          = "<%= props.appName %>"
    "tr:environment-type" = "non-prod"
    "tr:Role"             = "security-group"
    "tr:created-by"       = "Terraform"
  }
}