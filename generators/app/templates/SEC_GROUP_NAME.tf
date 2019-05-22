resource "aws_security_group" "<%= props.secGroupName %>" {
  name        = "<%= props.secGroupName %>"
  description = "Description: Security Group  <%= props.secGroupName %> for <%= props.appName %> service"
  vpc_id      = "${var.main_vpc}"
  
  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    security_groups = [
      "${data.aws_security_group.infra_bastion.id}",
    ]
  }
  
  ingress {
    from_port = 7001
    to_port   = 7001
    protocol  = "tcp"
    cidr_blocks = ["${var.trdevops_cidrs}", "${var.trdev_cidrs}"]
  }
  
  ingress {
    from_port = 8077
    to_port   = 8077
    protocol  = "tcp"
    cidr_blocks = ["${var.trdevops_cidrs}", "${var.trdev_cidrs}"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = "${merge(var.default_tags, map("Name", "<%= props.secGroupName %>"))}"
}
