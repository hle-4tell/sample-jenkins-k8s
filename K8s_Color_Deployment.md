1. Color Teller

// Apply Deployment
kubectl apply -f /Users/cuongvo/vol/docker/kubenetes/color_teller_deployment.yaml

// Apply Service / Expose Service
kubectl apply -f /Users/cuongvo/vol/docker/kubenetes/color_teller_service.yaml
-- kubectl expose deployment color-teller-deployment --type=NodePort --port 6000
-- kubectl expose deployment color-teller-deployment --type=LoadBalancer --port 6000

2. Gateway

// Apply Deployment
kubectl apply -f /Users/cuongvo/vol/docker/kubenetes/gateway_deployment.yaml
// Apply Service / Expose Service
kubectl apply -f /Users/cuongvo/vol/docker/kubenetes/gateway_service.yaml

3. SSH

// Get POD
kubectl get pods 

kubectl exec -it gateway-deployment-6557797868-99jrh -- /bin/sh

4. Port forward
kubectl port-forward deployment/gateway-deployment 4000:4000

5. Access to Gateway in Minikube

> minikube status
minikube: Running
cluster: Running
kubectl: Correctly Configured: pointing to minikube-vm at 192.168.99.103

> kubectl get svc --all-namespaces
NAMESPACE     NAME                      TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                  AGE
default       color-teller-deployment   NodePort    10.99.80.78      <none>        5001:32576/TCP           12m
default       gateway-deployment        NodePort    10.103.115.227   <none>        4000:30694/TCP           3m56s

> wget http://192.168.99.103:30694/color

6. Scale
kubectl scale deployment color-teller-deployment --replicas=2