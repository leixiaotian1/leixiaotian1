package k8s

import (
	"context"

	monitoringclient "github.com/prometheus-operator/prometheus-operator/pkg/client/versioned"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

type Client struct {
	Clientset        *kubernetes.Clientset
	MonitoringClient *monitoringclient.Clientset
}

func NewClient() (*Client, error) {
	config, err := rest.InClusterConfig()
	if err != nil {
		return nil, err
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		return nil, err
	}

	monClient, err := monitoringclient.NewForConfig(config)
	if err != nil {
		return nil, err
	}

	return &Client{
		Clientset:        clientset,
		MonitoringClient: monClient,
	}, nil
}

func (c *Client) ListPods(namespace string) ([]PodInfo, error) {
	pods, err := c.Clientset.CoreV1().Pods(namespace).List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		return nil, err
	}

	var podList []PodInfo
	for _, pod := range pods.Items {
		podList = append(podList, PodInfo{
			Name:      pod.Name,
			Namespace: pod.Namespace,
			Status:    string(pod.Status.Phase),
		})
	}

	return podList, nil
}

type PodInfo struct {
	Name      string
	Namespace string
	Status    string
}
