package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"monitoring/internal/api"
	"monitoring/internal/k8s"
	"monitoring/internal/metrics"
)

func main() {
	// 初始化Kubernetes客户端
	k8sClient, err := k8s.NewClient()
	if err != nil {
		log.Fatalf("Failed to create Kubernetes client: %v", err)
	}

	// 初始化指标采集器
	metricsCollector := metrics.NewCollector(k8sClient)
	go metricsCollector.Run(context.Background())

	// 创建API服务器
	server := api.NewServer(metricsCollector)

	// 启动HTTP服务
	go func() {
		if err := server.Start(":8080"); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// 优雅关闭
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exiting")
}
