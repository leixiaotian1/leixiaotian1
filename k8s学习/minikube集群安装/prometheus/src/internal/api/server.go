package api

import (
	"net/http"

	"monitoring/internal/k8s"
)

type Server struct {
	k8sClient *k8s.Client
}

func NewServer(k8sClient *k8s.Client) *Server {
	return &Server{
		k8sClient: k8sClient,
	}
}

func (s *Server) Router() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("/pods", s.listPods)
	mux.HandleFunc("/alert", s.createAlert)
	mux.HandleFunc("/alerts", s.getActiveAlerts)
	mux.HandleFunc("/health", s.healthCheck)
	return mux
}

func (s *Server) listPods(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement
}

func (s *Server) createAlert(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement
}

func (s *Server) getActiveAlerts(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement
}

func (s *Server) healthCheck(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("OK"))
}
