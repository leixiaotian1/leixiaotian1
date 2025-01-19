### 启动
kubectl apply -f nginx.yaml
### 将端口转发到本机
kubectl port-forward nginx-pod 4000:80
### 关闭转发 ctrl+c