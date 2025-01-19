# Alert Manager

Prometheus告警规则管理微服务

## 功能特性
- 通过REST API创建Prometheus告警规则
- 支持自定义告警表达式和持续时间
- 提供健康检查接口

## 快速开始

### 构建镜像
```bash
docker build -t alert-manager .
```

### 本地运行
```bash
go run main.go
```

### Kubernetes部署
1. 构建镜像并推送到镜像仓库
2. 修改deployment.yaml中的镜像地址
3. 部署到Kubernetes集群：
```bash
kubectl apply -f deployment.yaml
```

## API文档

### 创建告警规则
```
POST /alert
Content-Type: application/json

{
  "name": "high-cpu-usage",
  "namespace": "monitoring",
  "expr": "sum(rate(container_cpu_usage_seconds_total[5m])) by (pod) > 0.8",
  "duration": "5m",
  "severity": "critical"
}
```

### 健康检查
```
GET /health
```

## 开发指南
1. 安装依赖
```bash
go mod download
```

2. 运行测试
```bash
go test ./...
```

3. 构建
```bash
go build -o alert-manager .
