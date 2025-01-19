# Prometheus 监控服务

## 项目结构
```
src/
├── cmd/               # 主程序入口
├── internal/          # 内部实现
│   ├── api/           # API接口
│   ├── k8s/           # Kubernetes客户端
│   └── metrics/       # 自定义指标采集
├── configs/           # 配置文件
├── deployments/       # 部署文件
└── scripts/           # 部署脚本
```

## 快速开始

### 1. 安装依赖
```bash
# 安装Prometheus Operator
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus-operator prometheus-community/kube-prometheus-stack
```

### 2. 部署监控服务
```bash
kubectl apply -f deployments/
```

### 3. 访问监控面板
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000
