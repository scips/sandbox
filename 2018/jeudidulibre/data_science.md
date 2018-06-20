# Data Science

*Xavier Tordoir*

## Introduction

Terme: **Statistics** devient **data science**

* La **Science** c'est créer des modèles basé sur des suppositions et des observations
* Modèles reproductibles
* Modèles utilisable pour decision et prédiction d'evenements

*Il est possible d'avoir quelqu'un qui réalise 1000 piles au jeu de pile ou face*

Data Science terme des années '70

Exemples de modélisation de l'information: Découverte de neptune, Gregor Mendel avec les pois

## Maintenant

Fournir des données permettant des décisions au management.

In --> Collector de donnée --> Event --> Queue --> Stockage --> Database --> Microservice --> Out

## Collecte des données

Système extrèmement simple et fiable (pas de perte de données + capacité de recovery) ex: akka collector

Pas de préssuposition dans le design ==> système flexible % vitesse % point d'entrée

Modèle pub-sub, queue suffisament grande 

Exemple: Apache Kafka

Possibilité de stockage long, ou db ou streaming en directe des données

## Stockage des données

### Stockage distribué

**HDFS** Apache based on Google FS whitepaper

Cluster d'ordinateurs qui fonctionne comme un service (ls, size, job de processing ...) mais avec la facilité d'un file system local

#### HDFS Fonctionnement

	put /data/f256.txt
	replication factor 2

**Name node** va découper le fichier en petit morceaux pour les mettre sur les **data node**

Le système HDFS à besoin d'un système de partitionnement par exemple pour des fichiers texte: retour à la ligne
Pour des fichiers binaire il faut fournir la logique de découpage

Structurellement chaque node se voit créer un répertoire pour chaque fichier dans lequel on met un bout du fichier découpé. 

#### Tachion

Similaire mais en mémoire au maximum

### Stockage distribué en DB

#### Apache Cassandra

## Execution de traitement

### Map Reduce

Comment executer du code sur des fichiers où on ne connait pas l'emplacement

Création de function (**mapper**) qui peuvent s'executer sur chaque partition

Executer du code sur des record de manière indépendante

On envoie un JAR sur chaque noeud du cluster et on récupère le résultat

**Reduction** sur l'ensemble des données rassemblée

## Microservice

Interface avec le client indépendante 


## Carte de l'infratstructure

* Centralisation des méta données
* Technologie de query multi système
* Base de données mémoire

## Analyse des données

* Accès au données (ci dessus)
* Nettoyage des données
* Transformation des données
* Statistics descriptive
* Machine learning lorsqu'on ne sait plus quoi faire en tant qu'humain

## Machine learning

Apprendre une fonction à partir de données

En réduisant le risque d'erreur sur des échantillons tests

### Deep learning

Library: Keras (inclus dans tensorflow) (Python)

Les différentes couches sont déjà existatnte
possède égalemetn ce qui est traitement de séquence, texte , images

### Cas limites

Le data set en lui même est une fonction mais on cherche a avoir quelque chose de plus compacte --> une fonction plus simple.

**over-fitting** trop parfait sur l'échantillon --> mauvais sur les tests
**under-fitting** trop simple sur l'échantillon -->

### Cas particulier

* arbre de décision ne tient pas compte du type de données et sait travailler sur tous type de données

#### Decision tree

Utiliser en régression et classifications

Avantage: non linéaire, discrète, distribuable

Fournit un partitionnement de l'espace des fonctionnalités

Exemple: Random Forests

#### Réseau de neuronne

Avantage: On peut avoir des système extrèmememnt linéaire, matrices

### Industrialisation

* Java + SparkML
* Python + Tensorflow

Solutions: Spark ML ou tensorflow (open source)

## Exemple de Tools

Spark notebook équivalent de Jupiter notebook

Spark c'est un gateway vers le calcul distribué 

ex:
	sparkSession.read.parquet() // pointeur vers les fichiers
	rawDF.filter(...) // ne fait que décrire une opération qui sera éxécutée plus tard
	finalDF.select(...).distinct.count // va utiliser le pointeur, envoyer les functions et executer le tout pour pouvoir faire la réduction

Il y a un compilateur à l'intérieur de spark qui décide quand et où ce sera éxécuter

Avantage du spark notebook: exportable vers Scala et utilisable de manière très directe après

## Questions

Problématique principalement de process

Seriez-vous amenez à casser l'entrainement d'un data set si un user demadne de retirer ses données? Oui sauf si aucun moyen de retracer le record

Comment s'assurer qeu ça marche en continu? Monitoring de la précision du modèle, Réseau de neurone pour monitorer le modèle




