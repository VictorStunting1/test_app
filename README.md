# Une proposition extrêmement sérieuse

Une invitation interactive en français, mobile-first, construite avec Next.js (App Router), TypeScript, Tailwind CSS 4 et Framer Motion. Sans backend, compte ni collecte de données. Les choix restent en mémoire dans le navigateur et sont réinitialisés au rechargement.

## Installation

Prérequis : Node.js 20.9 ou supérieur et npm.

```sh
npm install
npm run dev
```

Ouvrir `http://localhost:3000`. Pour une installation reproductible après le premier téléchargement : `npm ci`.

```sh
npm run typecheck
npm run build
npm start
```

Arrêter le serveur de développement avant de lancer la compilation de production : les deux utilisent le dossier `.next`.

## Personnaliser

Tout le contenu est dans `config/invitation.ts` : noms, titre, introduction, activités, réactions, disponibilités, paramètres, jauge, décisions, textes du récapitulatif et métadonnées de partage. `responseText` définit le message copié. Les icônes d’activité disponibles sont `glass`, `food`, `activity` et `surprise`. Garder des identifiants uniques et au moins une option de moment (l’option `any` est sélectionnée par défaut si présente, sinon la première). Les valeurs de la jauge sont des poids ; leur somme devrait être 100.

Le choix d’une activité et d’une période est nécessaire pour accepter. « Pourquoi pas » reste disponible sans remplir le formulaire : c’est un intérêt prudent, sans confirmation. Les réponses d’attente et de refus restent accessibles sans remplir le formulaire. Un refus n’affiche aucun confetti. La copie nécessite un contexte HTTPS ou localhost ; si le navigateur la bloque, un champ permet de copier manuellement. Rien n’est transmis à Victor : il faut lui envoyer le texte soi-même.

## Structure

- `app/` : page, layout, styles et métadonnées.
- `components/` : cartes, disponibilités, statistiques, décision et récapitulatif.
- `config/` : contenu de l’invitation.
- `types/` : types partagés.

Les animations respectent la préférence système de réduction des mouvements. Les cartes et sélecteurs sont de vrais boutons utilisables au clavier, avec état sélectionné annoncé.

## Déployer gratuitement sur Vercel

1. Enregistrer le projet dans votre dépôt GitHub et pousser la branche souhaitée.
2. Sur [vercel.com](https://vercel.com), créer un compte puis choisir **Add New → Project** et importer le dépôt.
3. Garder le preset **Next.js**, la racine du projet et les commandes par défaut. Aucune variable d’environnement n’est nécessaire.
4. Cliquer sur **Deploy**, puis partager l’URL HTTPS obtenue. Chaque nouveau push déclenche un déploiement.

L’offre Hobby convient aux projets personnels, selon les conditions et quotas en vigueur. Une invitation déployée est publique : éviter d’y mettre des informations privées. Cette V1 propose une invitation unique ; plusieurs invitations exigent des configurations ou déploiements distincts.

## Invitation de Léa — configuration prête

Le destinataire est **Léa**, l’expéditeur est **Victor**. Les métadonnées de la page sont également personnalisées. Le fichier `vercel.json` configure Next.js, l’installation reproductible avec `npm ci` et la compilation avec `npm run build`.

Pour publier cette version : importer `VictorStunting1/test_app` depuis GitHub dans Vercel, choisir la branche `main` et laisser **Root Directory** à la racine. Aucune clé ni variable n’est requise. Une fois déployée, tester une réponse et la copie du récapitulatif sur l’URL HTTPS, puis partager ce lien avec Léa.

## Interactions et humour

Les variantes de réactions, questions, réponses, scores et easter eggs sont dans `interactions`, exporté depuis `config/invitation.ts`. Chaque réponse scientifique possède un poids : le score est 80 + la somme des poids choisis. Ce quiz est facultatif et ne bloque jamais une réponse. Le récapitulatif et le texte copié incluent le score et les réponses uniquement lorsque les trois questions sont remplies.

La jauge choisit aléatoirement une autre répartition parmi `statsVariants` (conserver au moins deux variantes dont les proportions totalisent 100). Les informations classifiées se réinitialisent après 3,5 secondes sans clic ; le titre d’agenda revient après 4 secondes ; le bouton avocat revient après 6 secondes sans clic. La plaisanterie sur la confiance dure une seconde et ne désactive aucune carte. Les minuteries sont annulées lors d’un nouveau choix ou du démontage des composants.

Les petits secrets sont le lien d’explication du hero, l’étoile du ticket, les informations classifiées et le texte de fabrication dans le footer. Tous sont accessibles au clavier. Les compteurs et mouvements respectent la réduction des animations du système ; il n’y a aucune animation permanente.

## Téléphone et navigateur Instagram

La version mobile empile les cartes et les réponses, avec des boutons de 48 px minimum, des textes lisibles et les safe areas iOS. Tous les secrets fonctionnent au tap et au clavier. Les illustrations du cagou et de la voiture sont des SVG légers sans téléchargement d’image. La voiture ne traverse que sa zone réservée, dont la largeur est mesurée, et les confettis sont limités à leur propre conteneur.

Un seul bouton **Non, je passe mon tour** refuse immédiatement, au tap ou au clavier, avec une petite animation discrète. Il ne se déplace pas et aucun deuxième bouton de refus n’est affiché. Le cagou est représenté par un escargot à coquille : au tap il se calme pendant 1,4 seconde, puis reprend un court mouvement. La voiture rouge se déclenche lorsque l’activité **Surprise** est sélectionnée ; elle n’a aucun bouton dédié. Les animations restent limitées et respectent la réduction des mouvements.

**Ça me chauffe** confirme le plan et affiche les confettis. **Pourquoi pas** ouvre un dossier « Une piste, pas encore un oui », avec des créneaux à discuter et un texte copié exprimant clairement l’hésitation. Avec « Pourquoi pas », rien n’est considéré comme confirmé.

Si Instagram ou Safari refuse l’accès au presse-papiers, le champ de texte permet de sélectionner et copier le verdict manuellement. Aucune réponse n’est envoyée automatiquement. Les tests mobiles utilisent des événements tactiles dans Chromium aux largeurs 320, 360, 375, 390 et 414 px ; cela ne remplace pas une vérification sur un téléphone réel dans Instagram et Safari.
