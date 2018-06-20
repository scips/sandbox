# AI demonstration thanks to the Agile method, git and the latest advances

by *AI Mons member Marc*

**Objectif**: Avoir quelque chose fcntl sur le cloud ou sur le pc facilement

## Méthode de travail

### Modèle en V

Cycle en V: Spec -> dev -> livrable

Problème de gestion de l'innatendu

### Méthode agile

Livraison récurrente, permet de mesurer le travail de montrer des résultats et de réorienter en fonction.

Changement de mentalité avec du managemetn inversé avec les gens qui bossent qui sont force de proposition.

Voir vidéo:
* ["Agile production ownership in a nutshell"](https://www.youtube.com/watch?v=502ILHjX9EE)
* ["Making sense of MVP (Minimum Viable Product)"](https://www.youtube.com/watch?v=0P7nCmln7PM)

Product Owner filtre les produits du clients

Et mesurer le thread of $$$ vs Coût dev

Se mettre d'accord sur la difficulté d'une tâche

Se mettre d'accord sur le MVP. Particulièrement en AI parfois on prends bcp de temps pour faire un réseau de neurone mais il suffit d'un petit classifier pour faire la démo.

MVP: Ca permet d'avoir quelque chose qui tourne et de challenger le modèle.

Gagner du temps (cérémonies time boxées, standup 11:50 ? juste avant d'aller manger)

#### Comment faire un MVP

On se met d'accord et on le met sur papier, les post-it c'est bien, mais chacun en a sa vision, il faut donc définir bien précisément et oralement le MVP avec un language commun.

Session post-it et essaye de résoudre le problème en 3 taches pour aller de A à B.

80% du savoir à l'oral 20% à l'écrit.

Doc pas lue ou pas comprise.

#### Tools agile

L'email, c'est comme le pigeon voyageur, essayer de faire un chat avec des pigeons voyageur.

C'est ok pour des comptes rendu de réunion mais pas pour le reste

* **google drive**: collaboration sur un gdoc même document, versionning intégré
* **slack**: irc avec fils de conversation par thèmes + flux d'actualité + conversation commune + intégré avec google drive pour les mise à jour
* **git**: centraliser, collaborer et versionner les projets, continuous delivery
* **trello**: Méthodo agile version todo list / tasks + notifications + visibilité large (cf. vidéo youtube) + templates pré-configurés

## Git

* centraliser
* distribuer
* collaborer
* versions
* intégration continue (tests, delivery...)

## Démo

### Prototypage démonstrateur

Tronc commun poussé par la chine, les US, l'europe et les GAFA, il y a des mises à jours quotidienne et bcp de bruit dans l'informations reçue.

#### Méthode de choix des prototype

**Les confs**

* **CVPR**: Computer Vision Pattern Recognition
* **ICML**: Machine learning + deeplearning (math) 
* **SIGGRAPH**: 3D, réalité augmentée, virtuelle
* **NIPS**: Machine learning + deeplearning (math)

1. Checker les contributeurs des différents papiers produits lors des confs.
2. Concentrez vous d'abord sur l'abstract (150-300 mots)
3. Résultats et metrics voir ce que ça apporte et comparer aux méthodes connues
4. Vérifier si le code est disponible (pour pas devoir ré-entrainer un réseau de neurones soit-même)
5. Vérifier les dépendances et voir si c'est possible avec l'infra (hardware) et la couche software
 
**Les outils de prototypage**

* Google collab (GPU gratuits mais partagé) CO iPython, machine refresh toutes les 12h
* Amazon SageMaker plus de notion de server, environnement pré-configuré, outils de tests, de training et de déployement via API
    * Les mardis du cloud AWS (vidéo dispo par après)
    * AWSBel AWS user group belgium

## Progresser

* **Deepnet** deepnet.fyi AI for good (Londres, Paris, Mons, Ottawa)
* **UMons Formations intelligence artificielle hands on ai**: [Certificat UMons](https://web.umons.ac.be/fpms/fr/formations/intelligence-artificielle-hands-on-ai/), cadre avec crédit FCTS, certifiant. 

### Démo live

* YOLO / jetson tx2
* Movidius + raspberry pi
* Skeleton Neural Network + face recognition
* Mask RCNN
* Détection objet


