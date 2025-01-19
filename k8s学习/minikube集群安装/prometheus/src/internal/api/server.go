package api

import (
	"context"
	"net/http"

	"monitoring/internal/metrics"
)

type Server struct {
	metricsCollector *metrics.Collector
}

func NewServer(metricsCollector *metrics.Collector) *Server {
	return &Server{
		metricsCollector: metricsCollector,
	}
}

func (s *Server) Start(addr string) error {
	http.HandleFunc("/metrics", s.handleMetrics)
	return http.ListenAndServe(addr, nil)
}

func (s *Server) Shutdown(ctx context.Context) error {
	// TODO: 实现优雅关闭
	return nil
}

func (s *Server) handleMetrics(w http.ResponseWriter, r *http.Request) {
	// TODO: 实现指标处理
	w.WriteHeader(http.StatusOK)
}
