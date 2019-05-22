# VPC
data "aws_vpc" "main_vpc" {
  id = "${var.main_vpc_us}"
}

data "aws_vpc" "bridge_vpc" {
  id = "${var.bridge_vpc_us}"
}


# other security-groups

data "aws_security_group" "infra_bastion" {
  name = "infra_bastion"
}

data "aws_security_group" "infra_turbine_hystrix" {
  name = "infra_turbine_hystrix"
}
