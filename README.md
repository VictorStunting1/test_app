# Plan Galère

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

Le parcours demande une activité, puis **un jour précis dans le calendrier** et un moment choisi : journée, début de soirée, soirée ou aucune préférence. Le bouton suivant reste désactivé avec une explication tant que ces choix ne sont pas faits. « Pourquoi pas » reste un intérêt prudent, sans confirmation. Le contrôle scientifique occupe la troisième étape : ses cinq questions se révèlent une à une, avec une navigation précédente/suivante. Les cinq réponses sont nécessaires pour ouvrir le verdict ; les choix sont conservés au retour. Deux clins d’œil maximum (frites et ponctualité) enrichissent le message envoyé.

La réponse à envoyer reste courte, avec deux petites remarques du quiz sur une seconde ligne. **Envoyer ma réponse** ouvre le partage natif lorsqu’il est disponible (HTTPS et navigateur compatible), et **Copier mon verdict** permet de coller la réponse dans la conversation Instagram. Le navigateur choisit les applications proposées : il ne permet ni de filtrer la liste sur Instagram, ni de présélectionner un compte destinataire. Instagram peut ne pas accepter un partage de texte. Il n’y a pas de boutons SMS/mail et aucun message n’est envoyé automatiquement. Si la copie est bloquée, un champ permet de copier manuellement.

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

Les variantes de réactions, questions, réponses, scores et easter eggs sont dans `interactions`, exporté depuis `config/invitation.ts`. Chaque réponse scientifique possède un poids : le score est 80 + la somme des poids choisis. Les cinq réponses déverrouillent le verdict. Le score du contrôle rempli apparaît dans le récapitulatif. La question sur le site ouvre les cinq questions, suivie des frites, de l’orientation, du retard et des plans bancals. Une seule réaction de quiz est affichée à la fois : celle de la dernière réponse, sans effacer les choix précédents. La réponse à partager reprend uniquement deux remarques définies par `shareText` dans la configuration, sans recopier toutes les questions ni le score.

La jauge utilise `calculateSeriousness` : activité, date précise, moment et réponses au quiz, même incomplet. Les mêmes choix donnent les mêmes pourcentages, labels et phrase. Les poids et profils restent personnalisables dans `seriousnessRules`, dans `config/invitation.ts`. Les trois pourcentages sont normalisés par la méthode des plus grands restes et totalisent 100 %, y compris pendant leur animation commune de 320 ms. Le recalcul est automatique, sans bouton ni aléatoire. Les informations classifiées se réinitialisent après 3,5 secondes sans clic. La plaisanterie sur la confiance dure une seconde et ne désactive aucune carte. Les minuteries sont annulées lors d’un nouveau choix ou du démontage des composants.

Les petits secrets sont le lien d’explication du hero, l’étoile du ticket, les informations classifiées et le texte de fabrication dans le footer. Tous sont accessibles au clavier. Les compteurs et mouvements respectent la réduction des animations du système ; il n’y a aucune animation permanente.

## Téléphone et navigateur Instagram

La version mobile resserre légèrement les titres, le hero, les cartes et les blocs du quiz. Elle empile les cartes et les réponses, avec des boutons de 48 px minimum, des textes lisibles et les safe areas iOS. Tous les secrets fonctionnent au tap et au clavier. Les illustrations du cagou et de la voiture sont des SVG légers sans téléchargement d’image. La voiture ne traverse que sa zone réservée, dont la largeur est mesurée, et les confettis sont limités à leur propre conteneur.

Le parcours révèle une seule étape à la fois : activité → disponibilité → contrôle scientifique → verdict. Les étapes futures ne sont pas montées avant leur déverrouillage ; les étapes déjà visitées sont masquées avec `hidden` lors du retour. Elles ne prennent aucune place dans le scroll et leurs contrôles sont exclus du clavier et de l’arbre d’accessibilité. Le retour conserve les choix, les secrets et les réponses au quiz. Le footer apparaît seulement au verdict. « Deux trois précisions » reste dans un accordéon ; le quiz est visible et ne monte qu’une question à la fois.

Un seul bouton **Non (si j’y arrive)** esquive trois fois, au tap ou au survol de la souris, dans son emplacement réservé au milieu des réponses. Ses petites phrases sont affichées sur le bouton. Il accepte ensuite normalement le refus ; au clavier il accepte immédiatement. Les déplacements tiennent compte de l’espace disponible et ne réinitialisent pas en revenant à une étape précédente. Le cagou est un escargot à coquille ; la voiture se déclenche en choisissant **Surprise**. Les animations respectent la réduction des mouvements.

**Vas-y, on se voit** confirme le plan et affiche les confettis. Ce bouton reste transparent ; sa taille, sa bordure et sa typographie le distinguent des autres choix. **Pourquoi pas** ouvre un dossier « Une piste, pas encore un oui », avec des créneaux à discuter et un texte copié exprimant clairement l’hésitation. Avec « Pourquoi pas », rien n’est considéré comme confirmé.

Si Instagram ou Safari refuse l’accès au presse-papiers, le champ de texte permet de sélectionner et copier le verdict manuellement. Aucune réponse n’est envoyée automatiquement. Les tests mobiles utilisent des événements tactiles dans Chromium aux largeurs 320, 360, 375, 390 et 414 px ; cela ne remplace pas une vérification sur un téléphone réel dans Instagram et Safari.

## Les références personnelles

Les textes contextuels, les réactions de créneaux et les private jokes restent dans `config/invitation.ts` (`personal`, `interactions`, `journey`). Les illustrations légères du petit démon, de l’escargot et de la voiture sont des SVG dans les composants.

- Au début : les badges **ce fameux verre** et **Plan certifié raisonnablement bancal** sélectionnent réellement le verre ou la surprise. La carte choisie est brièvement mise en évidence ; les badges, la suite du parcours et la jauge reprennent ce même choix. Une seule réaction de choix est affichée, même en alternant entre badges et cartes. Plusieurs changements de choix déclenchent une remarque sur les revirements.
- Dans l’agenda : le faux bilan 12 % / 104 %, la flexibilité de Victor dès vendredi soir et l’analyse qui se révèle au clic.
- Dans les secrets : le petit démon centré a quatre réactions ; le calcul douteux se déplie, puis avoue sa méthodologie. Une seule de leurs réactions reste visible. L’archive de Lyon apparaît uniquement pour une surprise ou une soirée ; son texte se remplace au tap, sans cumuler les commentaires. Le quiz conserve uniquement son dernier commentaire. La date et le moment ont aussi des réactions contextuelles, remplacées par l’analyse de l’agenda si on la consulte.
- Les phrases de verdict ont **3 secondes** de lecture entre chaque réaction, puis avant le récapitulatif. Ce délai se règle avec `verdictReadingMs` dans la configuration. Le « Enfin si 🙃 » arrive 600 ms après la provocation pour la désamorcer rapidement ; il reste ensuite lisible pendant 3 secondes, avant « Mais laisse-moi ma vanne. ». Le peut-être et la réflexion ont chacun trois réactions successives. Le chrono mental est fictif : son sablier tourne une seule fois pendant 1,5 seconde, puis disparaît, sans imposer trois minutes d’attente. Cette durée se règle avec `personal.thinkingTimerDurationMs` ; les phrases gardent leurs 3 secondes de lecture. Les boutons restent accessibles pendant la réflexion, pour changer immédiatement de verdict. Les temporisations sont annulées quand on quitte l’étape ou modifie la réponse.
- Chaque récapitulatif a son cagou escargot : fou de joie pour le oui, dubitatif pour le peut-être, les mains jointes et en questionnement pour la réflexion, triste pour le non. Les expressions et leurs descriptions sont définies par `personal.verdictSnails`. Les petits mouvements respectent la réduction des animations. **Laisse-moi réfléchir 3 minutes** ouvre un dossier en réflexion, avec une réponse à partager distincte du peut-être.

Le texte à copier reprend une réponse courte, puis deux remarques maximum du quiz grâce à `appendScienceHighlights`. Pour un refus, il commence par « Je décline, mais je reconnais l’effort franchement disproportionné 😂 ». Ce complément est aussi repris dans les réponses hésitante et en réflexion, sans y ajouter un plan confirmé. Le partage et la copie restent des actions explicites.

## Calendrier et disponibilité de Victor

Le calendrier intégré remplace le champ de date natif. Il affiche les jours occupés, la sélection prune, une légende et des boutons tactiles ; ses flèches changent de mois. Au clavier, les flèches déplacent le focus d’un jour ou d’une semaine, et Entrée sélectionne le jour. Les dates sont traitées en ISO et UTC pour conserver le même jour sur tous les téléphones.

Les règles et tous les textes sont dans `availability`, exporté depuis `config/invitation.ts` : `earliestDate` vaut **2026-10-16** et `earliestMoment` vaut **evening**. Les jours précédents sont désactivés. Le 16 reste cliquable, avec une case au contour pointillé et un repère à moitié rempli. Son encadré apparaît uniquement à la sélection : « Vendredi je débloque officiellement le mode liberté en soirée 😄 », avec le badge « Mode chômage débloqué 😂 ». Il disparaît au choix d’un autre jour ; aucune précision permanente ni entrée supplémentaire dans la légende ne s’ajoute pour le vendredi. Le 16 sélectionne automatiquement Soirée et désactive les autres moments ; dès le 17, tous les moments sont possibles pour les jours disponibles. Les règles sont aussi vérifiées dans le parcours, avant le récapitulatif. Pour déplacer la première disponibilité, modifier ces valeurs et les textes associés dans la configuration.

L’agenda propose uniquement un jour précis dans le calendrier, puis un moment. La date et le moment sont nécessaires pour continuer ; aucun n’est présélectionné à l’arrivée. Les périodes larges et le choix « peu importe le jour » ont été retirés. Le récapitulatif et le message court reprennent la date choisie.

Le ticket d’accueil affiche « Bon. On le cale quand ce verre ? », avec un tilt réduit sur téléphone et une brève animation de flottement. Toute la carte est tactile et déclenche son easter egg. Le bouton **Pourquoi t’as fait tout ça ? 😂** fait tourner sept réponses dans une petite bulle. Le contrôle scientifique présente une question à la fois ; ses réponses ont un feedback immédiat et des zones tactiles de 52 px minimum. Les nouvelles animations respectent la réduction des mouvements.

Les exceptions du calendrier se règlent dans `availability.dateExceptions`. Les **19 et 21 octobre 2026** sont « À confirmer » : leurs cases restent sélectionnables et leurs notes apparaissent juste sous le calendrier lors du choix. Le 21, la visite à l’ancienne entreprise est prévue le matin vers 10h30 ou 11h : « En journée » devient « Après-midi » et « Aucune préférence » se limite à l’après-midi ou au soir, y compris dans le verdict copié. Les moments autorisés et leurs libellés se règlent dans `allowedMoments` et `momentLabels` de cette exception. Le **24 octobre 2026** est « Indisponible » : sa case est désactivée et son motif reste visible sous le calendrier d’octobre, sans tooltip ni besoin de cliquer un bouton désactivé. Les flèches du clavier sautent ce jour bloqué. Les mêmes règles protègent aussi le passage à l’étape suivante. Les autres jours à partir du 16 restent disponibles, avec la restriction de soirée du 16 inchangée.

Le footer cache trois réponses derrière « Tout ça pour éviter d’écrire simplement ‘t’es dispo quand ?’. ». Les textes et remarques contextuelles restent modifiables dans la configuration ; aucun lieu ni horaire précis n’est demandé, ces détails se règlent ensuite sur Instagram.

## Audio local

Les extraits fournis sont servis depuis `public/assets/audio/` : `why-not.mp3` (Mystery Quirky, 8 s), `three-minutes.mp3` (Elevator Music on Hold, 12 s), `nope.mp3` (Wah Wah Sad Trombone, effet complet) et `success.mp3` (Victory, 8 s). Aucun service externe n’est utilisé. Les chemins, volumes, limites et boucles se règlent dans `config/audio.ts` ; remplacer un MP3 à cet emplacement suffit pour changer la piste.

`InvitationAudio`, dans `lib/invitationAudio.ts`, précharge les fichiers en JavaScript sans les jouer. Son `playSound(name)` débloque Web Audio directement depuis le clic/tap, puis démarre une source neuve à zéro. Victory démarre dès le clic sur **Vas-y, on se voit**, avec la première réaction et les confettis. Les promesses de reprise du contexte, téléchargement et décodage sont gérées : une erreur audio ne bloque jamais le parcours.

Le peut-être joue un court extrait à volume modéré ; la réflexion joue la musique d’ascenseur jusqu’à la fin de sa séquence ; le refus effectif joue le trombone une fois, après les trois esquives. Une seule source reste active : un nouveau verdict annule aussi les démarrages en attente. Le retour, la modification de réponse, la mise en arrière-plan et le démontage arrêtent le son. Les extraits non bouclés se terminent avec une courte baisse du volume.

Le titre d’onglet est **Plan Galère**. Les fichiers `app/favicon.ico`, `app/icon.png` et `app/apple-icon.png` sont des formats légers de l’icône démon préparée à partir de l’image fournie ; ils servent uniquement à l’onglet et à l’icône mobile.

L’accueil présente, dans cet ordre : la mission, le ticket interactif, « Étudier la proposition », le bouton d’explication centré, puis « Un verre. Quelques vannes. On tente ? ». Le titre reste accessible aux lecteurs d’écran ; il n’y a plus de titre ni de paragraphe au-dessus du ticket. Le bandeau du bureau, les noms avec la flèche et la ligne « À l’attention de » sont retirés ; le bouton d’explication est centré. Le cagou de l’étape idée répond « Cagooou !! ». La note du 24 octobre reste bloquante et indique « Déjà pris — j’ai des invités :) ».
