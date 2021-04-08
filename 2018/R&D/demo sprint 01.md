# Demo Sprint 01 Controle parental

0. Demander à Cindy des contenus limité qui donnent naissance à des lvie (Viking)
0. Déployer les news-common, library, tv-media, embed (parental-controle)
0. Admin RTBF.be https://me.uat.rtbf.be/?sg=media
0. DB change media id: 1234 UPDATE media.objects SET ageClassification='-12'
1. Livecenter https://me.uat.rtbf.be/livecenter/live
1. Editer pure vision > Planning éditer interdit au moins de 16 ans
1. Voir les direct https://www.uat.rtbf.be/auvio/direct
	1. On voit sur les lives en cours le cadenas
	1. On voit sur les lives futur le cadenas + pastille
1. Choisir un live avec cadenas
	1. Invitation a se connecter
	1. Connection
	1. Par défaut contenu bloqué
	1. Invite aller vers controle parental + lien
1. Page settings controle parental
1. Ouvrir sur le téléphone et constater le status change du controle parental
1. Je veux desactiver + message de confirmation
1. JE retourne sur le live -> je peux voir le live

2. Je vais dans les settings controle parental et je met -12 + je confirme pas --> pas de changement
1. Ouvrir sur le téléphone et constater le status change du controle parental
2. Je vais dans les settings controle parental et je met -12 + je confirme --> changement
1. Ouvrir sur le téléphone et constater le status change du controle parental
2. Je vais voir un media id=1234 et je vois
	2. le cadenas devant le titre
	2. Ecran sur le player
2. JE vais le mettre à -16
3. JE retourne sur le media + play OK
