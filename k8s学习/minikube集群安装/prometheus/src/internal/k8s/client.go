package k8s

import (
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
)

type Client struct {
	clientset *kubernetes.Clientset
}

func NewClient() (*Client, error) {
	config, err := rest.InClusterConfig()
	if err != nil {
		// 如果不在集群内运行，使用kubeconfig
		kubeconfig := clientcmd.NewDefaultClientConfigLoadingRules().GetDefaultFilename()
		config, err = clientcmd.BuildConfigFromFlags("", kubeconfig)
		if err != nil {
			return nil, err
		}
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		return nil, err
	}

	return &Client{
		clientset: clientset,
	}, nil
}

func (c *Client) GetClusterStatus() (string, error) {
	// TODO: 实现集群状态查询
	return "Healthy", nil
}

func (c *Client) GetNodeMetrics() (map[string]interface{}, error) {
	// TODO: 实现节点指标查询
	return make(map[string]interface{}), nil
}

func (c *Client) GetPodMetrics() (map[string]interface{}, error) {
	// TODO: 实现Pod指标查询
	return make(map[string]interface{}), nil
}
