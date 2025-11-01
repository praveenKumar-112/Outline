output "vpc_id" {
  value = aws_vpc.main.id
}

output "public_subnet_id" {
  value = aws_subnet.public_subnet.id
}

output "private_subnet_id" {
  value = aws_subnet.private_subnet.id
}

output "jenkins_public_ip" {
  value = aws_instance.jenkins.public_ip
}

output "app_node_public_ip" {
  value = aws_instance.app_node.public_ip
}
