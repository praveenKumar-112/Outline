variable "aws_region" {
  description = "AWS region"
  default = "ap-south-1"
}

variable "vpc_cidr" {
  description = "CIDR for creating of VPC"
  default = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR for public subnet"
  default = "10.0.1.0/24"
}

variable "private_subnet_cidr" {
  description = "CIDR for private subnet"
  default = "10.0.2.0/24"
}

variable "instance_type" {
  description = "Type of instance"
  default = "t3.micro"
}

variable "key_name" {
  description = "key pair name"
  default = "linuxlinux"
}