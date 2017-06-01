PROJECT = "UK Analytics"

start: ;@echo "Start Minikube - ${PROJECT}"; \
		minikube start --memory 8192 --disk-size 40g; \
		helm init

stop: ;@echo "Stop Minikube - ${PROJECT}";\
		minikube stop

helmdependency: ;\
 cd ./helmchart; \
 helm dependency update

destroy: ;@echo "Destroying - ${PROJECT}"; \
	helm delete --purge uk-analytics

dashboard: ;@echo "Open minikube dashboard - ${PROJECT}"; \
	minikube dashboard

fly-login: ;@echo "Login to fly";\
	fly -t ci login -c http://concourse.invalid -u concourse -p concourse

fly: ;@echo "Fly will run concourseci/pipeline.yml";\
	fly -t ci set-pipeline -p test -c concourseci/pipeline.yml --load-vars-from ~/credentials.yml

setup: ;@echo "setup for first use";\
		minikube start --memory 8192 --disk-size 40g; \
		helm init; \ 
		helm install ./helmchart -n uk-analytics

flydestroy: ;@echo "Fly destroy pipeline test";\
		fly -t ci destroy-pipeline --pipeline test
