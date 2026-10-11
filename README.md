# Le fameux verre

Une invitation interactive en français, mobile-first, construite avec Next.js (App Router), TypeScript, Tailwind CSS 4 et Framer Motion. Personnalisée pour Léa, de la part de Victor. Sans backend, compte ni collecte de données. Les choix restent en mémoire dans le navigateur et sont réinitialisés au rechargement.

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

Tout le contenu est dans `config/invitation.ts` : noms, titre, introduction, activités, réactions, disponibilités, paramètres, jauge, décisions, textes du récapitulatif et métadonnées de partage. `responseText` définit le message copié. Les icônes d’activité disponibles sont `glass`, `food`, `activity` et `surprise`. Garder des identifiants uniques et au moins une option de moment. Aucun moment n’est présélectionné : « Aucune préférence » est un vrai choix. Les poids et les textes de la jauge se règlent dans `seriousnessRules` ; la normalisation garantit un total de 100 %.

Le parcours demande une activité, puis **un jour précis dans le calendrier** et un moment choisi : journée, début de soirée, soirée ou aucune préférence. Le bouton suivant reste désactivé avec une explication tant que ces choix ne sont pas faits. « Pourquoi pas » reste un intérêt prudent, sans confirmation. Le quiz se trouve dans un accordéon à la troisième étape et reste facultatif ; ses résultats restent dans le récapitulatif, sans alourdir le message envoyé.

La réponse à envoyer est une phrase courte. **Envoyer ma réponse** ouvre le partage natif lorsqu’il est disponible (HTTPS et navigateur compatible), et **Copier mon verdict** permet de coller la réponse dans la conversation Instagram. Le navigateur choisit les applications proposées : il ne permet ni de filtrer la liste sur Instagram, ni de présélectionner un compte destinataire. Instagram peut ne pas accepter un partage de texte. Il n’y a pas de boutons SMS/mail et aucun message n’est envoyé automatiquement. Si la copie est bloquée, un champ permet de copier manuellement.

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

Les variantes de réactions, questions, réponses, scores et easter eggs sont dans `interactions`, exporté depuis `config/invitation.ts`. Chaque réponse scientifique possède un poids : le score est 80 + la somme des poids choisis. Ce quiz est facultatif et ne bloque jamais une réponse. Le récapitulatif inclut le score uniquement lorsque les cinq questions sont remplies. Les trois questions initiales restent présentes, avec deux questions sur les plans bancals et le site lui-même. La réponse à partager reste courte, sans les détails du quiz.

La jauge utilise `calculateSeriousness` : activité, date précise, moment et réponses au quiz, même incomplet. Les mêmes choix donnent les mêmes pourcentages, labels et phrase. Les poids et profils restent personnalisables dans `seriousnessRules`, dans `config/invitation.ts`. Les trois pourcentages sont normalisés par la méthode des plus grands restes et totalisent 100 %, y compris pendant leur animation commune de 320 ms. Le recalcul est automatique, sans bouton ni aléatoire. Les informations classifiées se réinitialisent après 3,5 secondes sans clic. La plaisanterie sur la confiance dure une seconde et ne désactive aucune carte. Les minuteries sont annulées lors d’un nouveau choix ou du démontage des composants.

Les petits secrets sont le lien d’explication du hero, l’étoile du ticket, les informations classifiées et le texte de fabrication dans le footer. Tous sont accessibles au clavier. Les compteurs et mouvements respectent la réduction des animations du système ; il n’y a aucune animation permanente.

## Téléphone et navigateur Instagram

La version mobile empile les cartes et les réponses, avec des boutons de 48 px minimum, des textes lisibles et les safe areas iOS. Tous les secrets fonctionnent au tap et au clavier. Les illustrations du cagou et de la voiture sont des SVG légers sans téléchargement d’image. La voiture ne traverse que sa zone réservée, dont la largeur est mesurée, et les confettis sont limités à leur propre conteneur.

Le parcours révèle une seule étape à la fois : activité → disponibilité → petits secrets facultatifs → verdict. Les étapes futures ne sont pas montées avant leur déverrouillage ; les étapes déjà visitées sont masquées avec `hidden` lors du retour. Elles ne prennent aucune place dans le scroll et leurs contrôles sont exclus du clavier et de l’arbre d’accessibilité. Le retour conserve les choix, les secrets et les réponses au quiz. Le footer apparaît seulement au verdict. « Deux trois précisions » et le quiz sont repliés dans des accordéons.

Un seul bouton **Non (si j’y arrive)** esquive trois fois, au tap ou au survol de la souris, dans son emplacement réservé au milieu des réponses. Ses petites phrases sont affichées sur le bouton. Il accepte ensuite normalement le refus ; au clavier il accepte immédiatement. Les déplacements tiennent compte de l’espace disponible et ne réinitialisent pas en revenant à une étape précédente. Le cagou est un escargot à coquille ; la voiture se déclenche en choisissant **Surprise**. Les animations respectent la réduction des mouvements.

**Allez, vas-y** confirme le plan et affiche les confettis. **Pourquoi pas** ouvre un dossier « Une piste, pas encore un oui », avec des créneaux à discuter et un texte copié exprimant clairement l’hésitation. Avec « Pourquoi pas », rien n’est considéré comme confirmé.

Si Instagram ou Safari refuse l’accès au presse-papiers, le champ de texte permet de sélectionner et copier le verdict manuellement. Aucune réponse n’est envoyée automatiquement. Les tests mobiles utilisent des événements tactiles dans Chromium aux largeurs 320, 360, 375, 390 et 414 px ; cela ne remplace pas une vérification sur un téléphone réel dans Instagram et Safari.

## Les références personnelles

Les textes contextuels, les réactions de créneaux et les private jokes restent dans `config/invitation.ts` (`personal`, `interactions`, `journey`). Les illustrations légères du petit démon, de l’escargot et de la voiture sont des SVG dans les composants.

- Au début : le verre proposé par Léa, les rumeurs sur « ce fameux verre » et le badge de plan bourbier, avec plusieurs réponses au tap. Deux petites icônes monochromes les illustrent ; une seule réaction est affichée à la fois, même en alternant rapidement entre les badges. Les compteurs de chaque secret sont conservés.
- Dans l’agenda : le faux bilan 12 % / 104 %, la flexibilité de Victor dès vendredi soir et l’analyse qui se révèle au clic.
- Dans les secrets : le petit démon a quatre réactions ; le calcul douteux se déplie, puis avoue sa méthodologie ; l’archive de Lyon reste cachée avant le premier tap.
- Les phrases de verdict ont **3 secondes** de lecture entre chaque réaction, puis avant le récapitulatif. Ce délai se règle avec `verdictReadingMs` dans la configuration. Le « Enfin si 🙃 » arrive 600 ms après la provocation pour la désamorcer rapidement ; il reste ensuite lisible pendant 3 secondes, avant « Mais laisse-moi ma vanne. ». Le peut-être et la réflexion ont chacun trois réactions successives. Le chrono mental est fictif : son sablier tourne une seule fois pendant quelques secondes, sans imposer trois minutes d’attente. Les boutons restent accessibles pendant la réflexion, pour changer immédiatement de verdict. Les temporisations sont annulées quand on quitte l’étape ou modifie la réponse.
- Chaque récapitulatif a son cagou escargot : fou de joie pour le oui, dubitatif pour le peut-être, les mains jointes et en questionnement pour la réflexion, triste pour le non. Les expressions et leurs descriptions sont définies par `personal.verdictSnails`. Les petits mouvements respectent la réduction des animations. **Laisse-moi réfléchir 3 minutes** ouvre un dossier en réflexion, avec une réponse à partager distincte du peut-être.

Le texte à copier reste une seule phrase utile, sans les private jokes ni le détail du quiz. Le partage et la copie restent des actions explicites.

## Calendrier et disponibilité de Victor

Le calendrier intégré remplace le champ de date natif. Il affiche les jours occupés, la sélection prune, une légende et des boutons tactiles ; ses flèches changent de mois. Au clavier, les flèches déplacent le focus d’un jour ou d’une semaine, et Entrée sélectionne le jour. Les dates sont traitées en ISO et UTC pour conserver le même jour sur tous les téléphones.

Les règles et tous les textes sont dans `availability`, exporté depuis `config/invitation.ts` : `earliestDate` vaut **2026-10-16** et `earliestMoment` vaut **evening**. Les jours précédents sont désactivés. Le 16 sélectionne automatiquement Soirée et désactive les autres moments ; dès le 17, tous les moments sont possibles pour les jours disponibles. Les règles sont aussi vérifiées dans le parcours, avant le récapitulatif. Pour déplacer la première disponibilité, modifier ces valeurs et les textes associés dans la configuration.

L’agenda propose uniquement un jour précis dans le calendrier, puis un moment. La date et le moment sont nécessaires pour continuer ; aucun n’est présélectionné à l’arrivée. Les périodes larges et le choix « peu importe le jour » ont été retirés. Le récapitulatif et le message court reprennent la date choisie.

Le ticket d’accueil affiche « Bon. On le cale quand ce verre ? », avec un tilt réduit sur téléphone et une brève animation de flottement. Toute la carte est tactile et déclenche son easter egg. Le bouton **Pourquoi t’as fait tout ça ? 😂** fait tourner sept réponses dans une petite bulle. Le quiz reste facultatif ; ses réponses ont un feedback immédiat et des zones tactiles de 52 px minimum. Les nouvelles animations respectent la réduction des mouvements.

Les exceptions du calendrier se règlent dans `availability.dateExceptions`. Les **19 et 22 octobre 2026** sont « À confirmer » : leurs cases restent sélectionnables et leurs notes apparaissent juste sous le calendrier lors du choix. Le **24 octobre 2026** est « Indisponible » : sa case est désactivée et son motif reste visible sous le calendrier d’octobre, sans tooltip ni besoin de cliquer un bouton désactivé. Les flèches du clavier sautent ce jour bloqué. Les mêmes règles protègent aussi le passage à l’étape suivante. Les autres jours à partir du 16 restent disponibles, avec la restriction de soirée du 16 inchangée.
