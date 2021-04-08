# Kubernete cluster google cloud

**pitch**: Scaling horizontal de pod docker kubernete dans le google cloud

Prochaine session avec DB + Redis

**URL**: https://console.cloud.google.com/home/dashboard?project=sbw-app01

## Création du cluster Kubernete

Kubernete engine cluster

Pre-requisite: https://cloud.google.com/sdk/docs/downloads-apt-get

	export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"
	echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
	curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
	sudo apt-get update && sudo apt-get install google-cloud-sdk
	sudo apt-get install kubectl

Pour google: toujours créer un projet

	gcloud auth login

Gives a link to authenticate in a browser

    gcloud config set compute/region europe-west1
    gcloud config set compute/zone europe-west1-b
    gcloud config list


	gcloud container clusters create msim-cluster --verbosity error --machine-type n1-standard-1 --num-nodes 1 --region europe-west1 --enable-autoscaling --min-nodes 1 --max-nodes 2

Crée des machines virtuelles avec kubernete et donne les infos d'accès au cluster kubernete

## Creer une image docker

Créer une simple docker avec php7 et une page hello world

	docker build -d docker-php-hello-world

	docker images

	docker run --name=... -it -p 9090:80 docker...

Tester la docker http://localhost:9090

## Register the docker

GCP > Container registry

	gcloud auth configure-docker # pour lier docker non pas a docker hub mais a google cloud

pusher la docker dans eu.gcr.io/..../...

## Deployer le service

	gcloud container clusters ... # donne les credentials pour accéder au cluster

### config deployment

**deployment-hpa.yaml**

kind: HorizontalPodAutoscaler

### Création du service

3 types de services:
* Node port
* ClusterIP
* LoadBalancer

Permet d'exposer les port à l'extérieur

**service.yaml**

	kubectl create -f deployment-hpa.yaml

Aller voir dans GCP > Workloads le service (pas encore accessible)

**Création du service:**

	kubectl create -f service.yml

crée le endpoint

Checker le horizontal scaling

	kubectl get hpa

Checker les pod

	kubectl get pods

## Création du support SSL + Nom de domaine

