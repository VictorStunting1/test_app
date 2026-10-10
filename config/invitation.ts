import type { Activity, Choice, ResponseSelection } from "@/types/invitation";

export const invitation = {
  recipientName: "Léa",
  senderName: "Victor",
  metadata: {
    title: "Une proposition · Victor → Léa",
    description:
      "Une invitation très sérieusement pas sérieuse. À toi de choisir la suite.",
  },
  brand: "le comité des bonnes idées",
  dossier: "INVITATION N° 001",
  badge: "À l’attention de",
  title: "Une proposition extrêmement sérieuse vient de t’être transmise.",
  intro:
    "J’aurais pu envoyer « on se voit ? ».\nMais visiblement j’ai préféré développer un site.",
  artwork: {
    heading: "UNE BONNE IDÉE",
    lines: ["Toi.", "Moi."],
    question: "On voit ?",
    ticket: "ENTRÉE POUR DEUX",
    caption: "probabilité de passer un bon moment : élevée",
  },
  finalEyebrow: "LA BALLE EST DANS TON CAMP",
  heroNote: "Pas de pression. Juste une bonne excuse pour se voir.",
  heroCta: "Étudier la proposition",
  activityHeading: "On fait quoi ?",
  activityIntro: "Quatre pistes. Aucun mauvais choix. Enfin, normalement.",
  voteLabel: "Je vote pour ça",
  selectedLabel: "Mon vote est posé",
  activities: [
    {
      id: "drink",
      icon: "glass",
      tag: "VALEUR SÛRE",
      title: "Le classique efficace",
      label: "Un verre",
      description:
        "Un verre quelque part, discussion tranquille et probablement quelques conneries racontées.",
      reaction: "Classique. Efficace. Le comité valide.",
      risk: "Risque de catastrophe : 8 %",
    },
    {
      id: "food",
      icon: "food",
      tag: "PLAN GOURMAND",
      title: "On mange un truc",
      label: "Un repas",
      description:
        "Avantage : si la conversation devient catastrophique, il reste toujours la nourriture.",
      reaction:
        "Très bon choix. Difficile d’être de mauvaise humeur avec de la bouffe.",
      risk: "Risque de voler une frite dans ton assiette : 73 %",
    },
    {
      id: "activity",
      icon: "activity",
      tag: "ESPRIT DE COMPÉTITION",
      title: "Une petite activité",
      label: "Bowling, billard ou arcade",
      description:
        "Bowling, billard, arcade… pour découvrir beaucoup trop rapidement notre esprit de compétition.",
      reaction:
        "Ah. Donc on veut potentiellement découvrir qui est mauvais perdant.",
      risk: "Risque de mauvaise foi : 91 %",
    },
    {
      id: "surprise",
      icon: "surprise",
      tag: "CONFIANCE AVEUGLE",
      title: "Surprise, surprise",
      label: "Une surprise",
      description:
        "Tu me laisses choisir. Niveau de risque : raisonnablement douteux.",
      reaction: "Attends… tu me fais vraiment confiance là ?",
      risk: "Informations classifiées.",
      classified: true,
    },
  ] satisfies Activity[],
  availabilityHeading: "Et dans nos agendas ?",
  availabilityIntro:
    "Une vague idée suffit. On n’organise pas un sommet international.",
  periodLabel: "LE BON CRÉNEAU",
  momentLabel: "PLUTÔT…",
  periods: [
    { id: "week", label: "Cette semaine" },
    { id: "weekend", label: "Ce week-end" },
    { id: "next", label: "Semaine prochaine" },
    {
      id: "improvise",
      label: "On improvisera comme des adultes pas organisés",
    },
  ] satisfies Choice[],
  moments: [
    { id: "afternoon", label: "Après-midi" },
    { id: "evening", label: "Soirée" },
    { id: "any", label: "Aucune préférence" },
  ] satisfies Choice[],
  parametersHeading: "Les petits caractères",
  parametersIntro: "Quelques paramètres d’une importance toute relative.",
  parameters: [
    {
      icon: "shirt",
      title: "Dress code",
      text: "Viens comme tu veux, ce n’est pas un entretien d’embauche.",
    },
    {
      icon: "wallet",
      title: "Budget",
      text: "Normal, je ne propose pas Monaco.",
    },
    {
      icon: "clock",
      title: "Durée",
      text: "De 1h à « ah merde il est déjà cette heure-là ».",
    },
  ],
  seriousnessLabel: "NIVEAU DE SÉRIEUX",
  stats: [
    { label: "organisation", value: 20 },
    { label: "bonne idée", value: 30 },
    { label: "improvisation", value: 50 },
  ],
  finalHeading: "Alors, verdict ?",
  finalIntro: "Le comité attend ton avis. Avec un calme presque crédible.",
  decisions: [
    { id: "yes", label: "Ça me chauffe", response: "Ça me chauffe 🙂" },
    {
      id: "maybe",
      label: "Pourquoi pas 👀",
      response:
        "Pourquoi pas 👀 Ça me tente, mais je ne confirme rien pour l’instant. On en discute ?",
    },
    {
      id: "lawyer",
      label: "Je demande à mon avocat",
      response: "Je demande à mon avocat avant de me prononcer.",
    },
    {
      id: "no",
      label: "Non, je passe mon tour",
      response: "Merci pour la proposition, mais je passe mon tour.",
    },
  ],
  refusalNote:
    "Tout refus sera évidemment accepté, même si le comité sera profondément déçu pendant approximativement 12 secondes.",
  validationMessage:
    "Choisis une activité et une période pour que le comité puisse remplir son dossier.",
  summaryTitle: "Bon bah… on dirait qu’on va devoir se voir.",
  pendingTitle: "Dossier transmis à ton avocat.",
  refusedTitle: "Réponse reçue, sans rancune.",
  summaryIntro:
    "Terrible nouvelle pour nos agendas, excellente nouvelle pour nous.",
  summaryLabels: ["Au programme", "Quand", "À quel moment"],
  copyLabel: "Copier mon verdict",
  copiedLabel: "Réponse copiée !",
  copyError:
    "Copie automatique indisponible : sélectionne le texte ci-dessous.",
  editLabel: "Modifier ma réponse",
  footer: "Fait avec beaucoup trop de réflexion.",
  footerNote: "Aucune réponse n’est envoyée automatiquement.",
  responseText: (selection: ResponseSelection) => {
    const tentative = selection.decisionId === "maybe";
    const science = selection.science
      ? `\nIndice scientifique : ${selection.science.score} % compatible\nRisque identifié : ${selection.science.risk}\n${selection.science.answers.map((a) => `${a.question} ${a.answer}`).join("\n")}`
      : "";
    return tentative
      ? `Pourquoi pas 👀 Ça me tente, mais rien n’est confirmé.\nLa piste qui me plaît : ${selection.activity.label}\nCréneau à discuter : ${selection.period} / ${selection.moment}${science}\nOn en parle avant de fixer le plan ?`
      : `Bon, j’ai étudié ton dossier beaucoup trop sérieusement.\nÇa me chauffe 🙂\nJe vote pour : ${selection.activity.label}\nPlutôt : ${selection.period} / ${selection.moment}${science}\nÀ toi de jouer 🙂`;
  },
};

// Tous les textes et variantes interactives restent personnalisables ici.
export const interactions = {
  whyLabel: "Pourquoi t’as fait tout ça ?",
  whyAnswers: [
    "Excellente question.",
    "J’aurais aimé avoir une excellente réponse.",
    "Disons que le « salut ça va ? » n’était pas assez ambitieux.",
    "Maintenant que t’es là, autant continuer.",
  ],
  withdrawLabel: "Je retire ma confiance",
  withdrawReplies: [
    "Trop tard. Le contrat moral a été signé.",
    "Bon ok, tu peux vraiment changer de choix.",
  ],
  riskReplies: {
    drink: "Les 92 % restants sont assez optimistes.",
    food: "Le comité décline toute responsabilité pour les frites disparues.",
    activity: "La mauvaise foi n’est pas éliminée par un échauffement.",
  } as Record<string, string>,
  classifiedAnswers: [
    "Non.",
    "J’ai dit classifié.",
    "Bon : probablement pas un enlèvement.",
  ],
  periodReactions: {
    week: "Wow. Une personne organisée.",
    weekend: "Choix raisonnable, étonnamment.",
    next: "Nous avons donc affaire à quelqu’un qui anticipe.",
    improvise: "Voilà. Enfin une méthode de planification que je comprends.",
  } as Record<string, string>,
  momentReactions: {
    afternoon: "À la lumière du jour. Audacieux.",
    evening: "La soirée est donc officiellement une piste.",
    any: "Une flexibilité qui fera pleurer nos agendas.",
  } as Record<string, string>,
  improvisedHeading: "Bon bah visiblement, pas dans nos agendas.",
  science: {
    heading: "Test scientifique extrêmement fiable",
    intro: "Avant de continuer, quelques vérifications essentielles.",
    optional: "FACULTATIF · AUCUNE VALEUR SCIENTIFIQUE",
    scoreLabel: "Compatibilité scientifique",
    methodology: "Méthodologie : absolument douteuse.",
    defaultRisk: "Confiance dans une méthodologie douteuse",
    questions: [
      {
        id: "fries",
        question: "Partager des frites ?",
        answers: [
          {
            id: "yes",
            label: "Évidemment",
            reaction: "Green flag détecté.",
            weight: 4,
            risk: "Vol de frites potentiel",
          },
          {
            id: "few",
            label: "Une ou deux",
            reaction: "Diplomatiquement acceptable.",
            weight: 1,
            risk: "Quota de frites à négocier",
          },
          {
            id: "no",
            label: "Touche à mes frites et ça part mal",
            reaction: "Information transmise au service sécurité.",
            weight: -2,
            risk: "Frites sous haute surveillance",
          },
        ],
      },
      {
        id: "directions",
        question: "Si on se perd en allant quelque part ?",
        answers: [
          {
            id: "improvise",
            label: "On improvise",
            reaction: "Se perdre ensemble : une activité presque gratuite.",
            weight: 3,
          },
          {
            id: "maps",
            label: "Google Maps immédiatement",
            reaction: "Le service orientation remercie cette personne.",
            weight: 1,
          },
          {
            id: "pretend",
            label: "Je fais semblant de savoir où je vais",
            reaction: "Technique ancestrale. Très populaire chez les hommes.",
            weight: 2,
            risk: "Confiance excessive dans le sens de l’orientation",
          },
        ],
      },
      {
        id: "late",
        question: "Retard acceptable ?",
        answers: [
          {
            id: "zero",
            label: "0 minute",
            reaction: "Le comité vient de régler trois alarmes.",
            weight: -1,
          },
          {
            id: "ten",
            label: "5-10 minutes",
            reaction: "Une marge de négociation très européenne.",
            weight: 1,
          },
          {
            id: "warn",
            label: "Tant que tu préviens",
            reaction: "Communication saine. Nous sommes presque des adultes.",
            weight: 3,
          },
          {
            id: "me",
            label: "Je suis probablement la personne en retard",
            reaction: "Au moins nous avons une confession.",
            weight: 2,
            risk: "Arrivée théoriquement imminente",
          },
        ],
      },
    ] satisfies import("@/types/invitation").ScienceQuestion[],
  },
  statsVariants: [
    invitation.stats,
    [
      { label: "organisation", value: 4 },
      { label: "confiance injustifiée", value: 46 },
      { label: "on verra", value: 50 },
    ],
    [
      { label: "planification", value: 1 },
      { label: "logique", value: 9 },
      { label: "ça va le faire", value: 90 },
    ],
  ],
  statsNote:
    "Les statistiques peuvent légèrement varier selon l’humeur du comité.",
  statsAction: "Recalculer le niveau de sérieux",
  footerSecrets: [
    "Tu cherches vraiment tous les secrets du site toi.",
    "Y’en a peut-être un autre 👀",
  ],
  starLabel: "Examiner le petit détail",
  starReply: "Bravo. Tu viens de gagner absolument rien.",
  verdict: {
    yes: [
      "LE COMITÉ EST EN JOIE.",
      "Enfin… de manière très professionnelle évidemment.",
    ],
    maybe:
      "Le comité note un intérêt prudent. Il range les confettis et attend la suite.",
    lawyer: [
      "Très bien.",
      "Ton avocat a l’air chiant.",
      "Deuxième avis : tu restes évidemment libre de décider.",
    ],
    lawyerButtons: [
      "Mon avocat déconseille cette sortie",
      "Demander un deuxième avis",
    ],
    no: [
      "Compréhensible. Le comité accepte sa défaite avec une dignité remarquable.",
      "Il va maintenant regarder par la fenêtre pendant environ 11 secondes.",
    ],
  },
  summary: {
    plan: "PLAN RETENU",
    organisation: "ORGANISATION",
    moment: "À QUEL MOMENT",
    science: "INDICE SCIENTIFIQUE",
    risk: "RISQUE IDENTIFIÉ",
    answers: "PIÈCES SCIENTIFIQUES DU DOSSIER",
    compatible: "compatible",
    improvise: "Improvisation totale",
  },
  tentativeTitle: "Une piste, pas encore un oui.",
  tentativeIntro:
    "Ça te tente peut-être. Rien n’est fixé : on en discute tranquillement.",
  tentativePlan: "PISTE ENVISAGÉE",
  tentativeOrganisation: "CRÉNEAU À DISCUTER",
  pendingIntro:
    "Prends tout le temps qu’il te faut. Le dossier peut parfaitement rester sans suite.",
  refusalIntro:
    "Aucune justification nécessaire. Merci d’avoir donné ton avis.",
};

export const mobilePlay = {
  snailLabel: "Toucher le cagou escargot",
  snailReply:
    "Le cagou avance doucement. Comme les grandes décisions, mais avec une coquille.",
  carReply: "Le comité arrive. Enfin, il cherche encore une place.",
};
