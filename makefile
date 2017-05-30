PROJECT = "UK Analytics"

setup: ;@echo "Setup Minikube and init Helm - ${PROJECT}"; \
		minikube start --memory 8192 --disk-size 40g && helm init

helminstall: ;@echo "Helm install - ${PROJECT}"; \
	helm install ./helmchart -n uk-analytics && helm dependency update

destroy: ;@echo "Destroying - ${PROJECT}"; \
	helm delete --purge uk-analytics

dashboard: ;@echo "Open minikube dashboard - ${PROJECT}"; \
	minikube dashboard

