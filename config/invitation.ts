import type {
  Activity,
  Choice,
  ResponseSelection,
  SnailMood,
  VerdictFrame,
  SeriousnessRules,
} from "@/types/invitation";

// Temps de lecture entre les réactions de verdict, en millisecondes.
const verdictReadingMs = 3000;

export const invitation = {
  recipientName: "Léa",
  senderName: "Victor",
  metadata: {
    title: "Le fameux verre",
    description:
      "Une méthode beaucoup trop élaborée pour réussir à boire ce fameux verre.",
  },
  brand: "le bureau du fameux verre",
  dossier: "MISSION : TROUVER UN CRÉNEAU",
  badge: "À l’attention de",
  title: "Une proposition extrêmement sérieuse vient de t’être transmise.",
  intro:
    "Bon allez, on arrête de parler de ce verre comme d’un projet prévu pour 2028.\nC’était ton idée à la base. Je ne fais qu’assurer un suivi de projet extrêmement rigoureux.",
  artwork: {
    heading: "UNE BONNE IDÉE",
    lines: ["Bon.", "On le cale quand"],
    question: "ce verre ?",
    ticket: "ENTRÉE POUR DEUX",
    caption: "statut : beaucoup trop discuté, pas encore bu",
  },
  finalEyebrow: "LA BALLE EST DANS TON CAMP",
  heroNote: "Pas de pression. Juste une bonne excuse pour se voir.",
  heroCta: "Étudier la proposition",
  activityHeading: "On fait quoi ?",
  activityIntro:
    "Ce verre commence à devenir une légende urbaine. On garde l’idée ou on bifurque ?",
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
      reaction:
        "Retour à ton idée de départ. Des témoins affirment que ce verre pourrait réellement avoir lieu.",
      risk: "Risque de bourbier : modéré",
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
        "Un détour par la bouffe. Un plan bourbier avec des frites reste un plan acceptable.",
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
        "Deux experts en galères, maintenant en compétition. Qu’est-ce qui pourrait mal se passer ?",
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
      reaction:
        "Évidemment. Deux experts du plan bourbier ne pouvaient pas choisir autre chose.",
      risk: "Informations classifiées.",
      classified: true,
    },
  ] satisfies Activity[],
  availabilityHeading: "Et dans nos agendas ?",
  availabilityIntro:
    "Disponible à partir du vendredi 16 octobre au soir. Après ça, mon agenda devient étonnamment flexible.",
  periodLabel: "LE BON CRÉNEAU",
  momentLabel: "PLUTÔT…",
  periods: [
    { id: "weekend", label: "Ce week-end" },
    { id: "next", label: "Semaine prochaine" },
    {
      id: "improvise",
      label: "On improvisera comme des adultes pas organisés",
    },
  ] satisfies Choice[],
  moments: [
    { id: "afternoon", label: "En journée" },
    { id: "early", label: "Début de soirée" },
    { id: "evening", label: "Soirée" },
    { id: "any", label: "Aucune préférence" },
  ] satisfies Choice[],
  parametersHeading: "Deux trois précisions",
  parametersIntro: "Quelques détails d’une importance toute relative.",
  parameters: [
    {
      icon: "target",
      title: "Objectif",
      text: "Faire enfin exister ce fameux verre autrement qu’en discussion Insta 😂",
    },
    {
      icon: "clock",
      title: "Durée",
      text: "Durée variable selon le niveau de discussion, de vannes, et d’éventuels détours imprévus 🙃",
    },
  ],
  seriousnessLabel: "NIVEAU DE SÉRIEUX",
  finalHeading: "Alors, verdict ?",
  finalIntro: "Le comité attend ton avis. Avec un calme presque crédible.",
  decisions: [
    { id: "yes", label: "Allez, vas-y", response: "Allez, vas-y 😄" },
    {
      id: "maybe",
      label: "Pourquoi pas 👀",
      response:
        "Pourquoi pas 👀 Ça me tente, mais je ne confirme rien pour l’instant. On en discute ?",
    },
    {
      id: "lawyer",
      label: "Laisse-moi réfléchir 3 minutes",
      response: "Je prends un peu de temps pour réfléchir, je te redis.",
    },
    {
      id: "no",
      label: "Non (si j’y arrive)",
      response: "Merci pour la proposition, mais je passe mon tour.",
    },
  ],
  refusalNote:
    "Tout refus sera évidemment accepté, même si le comité sera profondément déçu pendant approximativement 12 secondes.",
  validationMessage:
    "Une activité, une période ou un jour précis, puis un moment : le dossier est prêt.",
  summaryTitle: "Bon bah… on dirait qu’on va devoir se voir.",
  pendingTitle: "Dossier en réflexion.",
  refusedTitle: "Réponse reçue, sans rancune.",
  summaryIntro:
    "Ce fameux verre se rapproche dangereusement de la réalité. On ajuste le créneau ensemble.",
  summaryLabels: ["Au programme", "Quand", "À quel moment"],
  copyLabel: "Copier mon verdict",
  copiedLabel: "Réponse copiée !",
  copyError:
    "Copie automatique indisponible : sélectionne le texte ci-dessous.",
  editLabel: "Modifier ma réponse",
  footer: "Ce site aurait pu être un message de 8 mots.",
  footerNote: "Aucune réponse n’est envoyée automatiquement.",
  responseText: (selection: ResponseSelection) => {
    const when = [
      selection.date
        ? new Intl.DateTimeFormat("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }).format(new Date(`${selection.date}T12:00:00`))
        : selection.period,
      selection.moment,
    ].join(" · ");
    return selection.decisionId === "maybe"
      ? `Pourquoi pas 👀 ${selection.activity.label}, ${when} ? Rien de confirmé, on en parle.`
      : `Allez, vas-y 😄 ${selection.activity.label}, ${when}. À toi de jouer !`;
  },
};

// Tous les textes et variantes interactives restent personnalisables ici.
export const interactions = {
  whyLabel: "Pourquoi t’as fait tout ça ? 😂",
  whyAnswers: [
    "Parce qu’un simple message, c’était visiblement beaucoup trop raisonnable 😂",
    "J’ai entendu ‘on prend un verre’ et j’ai réagi de manière parfaitement disproportionnée 🤣",
    "Techniquement, j’aurais pu écrire 8 mots.\nMais où serait le fun ? 🙃",
    "Rappel historique : cette idée venait quand même de toi 😄",
    "Je ne fais donc qu’assurer un suivi de projet extrêmement rigoureux 😂",
    "Tu voulais apprendre un peu le dev.\nVoilà un cas d’usage parfaitement essentiel 🤣",
    "Une légère surinterprétation de ‘on prendra un verre’, rien de grave 🙃",
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
    weekend: "Très raisonnable. Presque inquiétant venant de nous.",
    next: "On anticipe carrément maintenant ?",
    improvise: "Voilà. Je nous reconnais mieux.",
  } as Record<string, string>,
  momentReactions: {
    afternoon: "Version sage du projet.",
    early: "Très bon compromis entre organisation et potentiel de connerie.",
    evening: "Là ça commence à ressembler au fameux verre.",
    any: "Traduction : trouvons juste un trou dans ton agenda.",
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
            reaction:
              "Le plan bourbier inclut donc un partage de frites. Ça se précise.",
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
            reaction:
              "Notre talent commun pour les plans bourbiers vient de refaire surface.",
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
      {
        id: "bourbier",
        question: "Face à un plan un peu bancal, tu fais quoi ?",
        answers: [
          {
            id: "follow",
            label: "Je suis, évidemment 😂",
            reaction: "Esprit plan bourbier détecté.",
            weight: 3,
          },
          {
            id: "questions",
            label: "Je pose deux questions puis je suis 😄",
            reaction: "Un minimum de prudence. Étonnant.",
            weight: 1,
          },
          {
            id: "hesitate",
            label: "Je fais semblant d’hésiter 🙃",
            reaction: "Oui oui. On connaît cette technique 🤣",
            weight: 2,
          },
        ],
      },
      {
        id: "website",
        question: "Devant ce site, ta réaction honnête :",
        answers: [
          {
            id: "like",
            label: "C’est débile, j’aime bien 🤣",
            reaction: "C’était globalement l’objectif.",
            weight: 3,
          },
          {
            id: "too-much",
            label: "Il en fait beaucoup trop 😂",
            reaction: "Je refuse de commenter cette accusation 🙃",
            weight: 1,
          },
          {
            id: "finish",
            label: "Bon… je vais quand même jusqu’au bout 😄",
            reaction:
              "Très bon choix. T’es déjà beaucoup trop loin pour abandonner.",
            weight: 2,
          },
        ],
      },
    ] satisfies import("@/types/invitation").ScienceQuestion[],
  },
  footerSecrets: [
    "Mais ça aurait été beaucoup moins drôle.",
    "Et tu me connais.",
    "Voilà.",
  ],
  starLabel: "Examiner le petit détail",
  starReply: "Bravo. Tu viens de gagner absolument rien.",
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
  carReply: "KA-CHOW. Départ vers un plan raisonnablement bancal.",
};

export const journey = {
  steps: ["Une idée", "Un créneau", "Les petits secrets", "Ton verdict"],
  continueLabels: [
    "Et côté agenda ?",
    "Découvrir la suite",
    "Donner mon verdict",
  ],
  backLabel: "Revenir en arrière",
  optionalQuiz:
    "Encore un test beaucoup trop élaboré. Tu peux parfaitement le passer.",
  dateLabel: "Un jour précis ?",
  dateHint: "Une date précise ou un créneau large : comme tu préfères.",
  dateClear: "Franchement, peu importe 😂",
  detailsLabel: "Deux trois précisions",
  noTeases: ["Ahhh non 😂", "Léa.", "Fais pas la cagou 🤣"],
  noFinished: "Bon ok, j’arrête de tricher 🙃",
  noInitial: "Le comité prépare sa petite esquive…",
  shareLabel: "Envoyer ma réponse",
  shareHint:
    "Choisis Instagram si proposé, puis notre conversation. Sinon, copie ton verdict et colle-le dans notre échange.",
  shareUnavailable:
    "Le partage n’est pas disponible ici. Copie ton verdict pour notre conversation Instagram.",
  sharedLabel: "Réponse transmise à l’application choisie.",
};

// Les private jokes sont révélées dans leur contexte, jamais toutes ensemble.
export const personal = {
  arrival: [
    "Ahhh t’as 5 minutes ? Ça tombe bien :)",
    "J’ai justement développé un site beaucoup trop élaboré pour te prendre environ 30 secondes.",
  ],
  glassLabel: "ce fameux verre",
  glassReplies: [
    "Des rumeurs circulent.",
    "Cette légende urbaine pourrait vraiment devenir réelle 😄",
    "Reste encore à l’observer dans son habitat naturel.",
  ],
  bourbierLabel: "Plan certifié raisonnablement bancal",
  bourbierReplies: [
    "Deux experts du plan bourbier. Qu’est-ce qui pourrait mal se passer ? 🙃",
    "Ne rigole pas.",
  ],
  agenda: {
    heading: "ÉTAT ACTUEL DES DISPONIBILITÉS",
    recipient: "agenda de ministre",
    recipientValue: "12 %",
    sender: "dès vendredi 16 au soir · flexibilité premium",
    senderValue: "104 %",
    note: "Avantage du chômage temporaire : j’ai officiellement beaucoup trop de temps.",
    analysisLabel: "Voir l’analyse scientifique",
    analysis: "On devrait statistiquement réussir à trouver 1 heure.",
    aside:
      "Le principal obstacle logistique vient d’être identifié. Je ne citerai personne.",
  },
  heading: "Deux experts. Un plan normal.",
  intro:
    "Vu nos talents respectifs, le défi n’est pas de boire un verre. C’est d’y arriver sans transformer ça en plan bourbier.",
  demonLabel: "Toucher le petit démon de Léa",
  demonCaption: "Ton petit démon n’est pas convié aujourd’hui.",
  demonReplies: [
    "Ah lui.",
    "Il te lâche vraiment jamais.",
    "Pour une fois tu peux le laisser à la maison.",
    "Le verre est garanti sans emmerdes.*",
  ],
  demonFootnote: "*garantie absolument non contractuelle.",
  mathLabel: "Les maths sont formelles.",
  mathHeading: "CALCUL SCIENTIFIQUE",
  mathTerms: [
    "Ton talent pour les galères",
    "mon talent pour les plans bourbiers",
    "un verre",
  ],
  mathResult: "soirée statistiquement intéressante",
  mathReply: "Je n’ai absolument pas vérifié les maths.",
  lyonLabel: "Ouvrir une archive du comité",
  lyonIntro:
    "Promis, cette fois l’objectif n’est pas de finir à errer dans Lyon à une heure douteuse.",
  lyonReplies: [
    "Je maintiens que Lyon était sous contrôle 😂",
    "Plus ou moins.",
    "Bon changeons de sujet.",
  ],
  quizLabel: "Passer le contrôle scientifique (facultatif)",
  activityHint: "Choisis une piste pour ouvrir l’agenda.",
  availabilityHint:
    "Choisis une période ou un jour précis, puis un moment. « Aucune préférence » compte aussi.",
  messageLabel: "TA RÉPONSE, TOUT SIMPLEMENT",
  readingMs: verdictReadingMs,
  verdictSnails: [
    { decisionId: "yes", mood: "happy", label: "Le cagou est fou de joie." },
    {
      decisionId: "maybe",
      mood: "skeptical",
      label: "Le cagou reste dubitatif.",
    },
    {
      decisionId: "lawyer",
      mood: "hopeful",
      label: "Le cagou réfléchit, les mains jointes.",
    },
    {
      decisionId: "no",
      mood: "sad",
      label: "Le cagou est triste, mais accepte le refus.",
    },
  ] satisfies { decisionId: string; mood: SnailMood; label: string }[],
  thinkingTimerLabel: "Chrono mental · parfaitement fictif",
  thinkingTimerDisplay: "03:00",
  yesSequence: [
    { at: 0, text: "Voilà 😂", detail: "" },
    {
      at: verdictReadingMs,
      text: "C’était quand même l’objectif de tout ce site.",
      detail: "",
      car: true,
    },
    {
      at: verdictReadingMs * 2,
      text: "Maintenant t’as plus le choix.",
      detail: "",
    },
    {
      // On désamorce cette vanne rapidement, puis on laisse le temps de lire.
      at: verdictReadingMs * 2 + 600,
      text: "Maintenant t’as plus le choix.",
      detail: "Enfin si 🙃",
    },
    {
      at: verdictReadingMs * 3 + 600,
      text: "Mais laisse-moi ma vanne.",
      detail: "",
    },
  ] satisfies VerdictFrame[],
  maybeSequence: [
    { at: 0, text: "Hmm 👀", detail: "" },
    { at: verdictReadingMs, text: "Je note un intérêt prudent.", detail: "" },
    {
      at: verdictReadingMs * 2,
      text: "C’est suffisamment proche d’un oui pour que je sois content 😄",
      detail: "",
    },
  ] satisfies VerdictFrame[],
  thinkingSequence: [
    { at: 0, text: "3 minutes ?", detail: "" },
    { at: verdictReadingMs, text: "Très précis.", detail: "" },
    {
      at: verdictReadingMs * 2,
      text: "Je lance le chrono mentalement 😂",
      detail: "",
      thinkingTimer: true,
    },
  ] satisfies VerdictFrame[],
  // Le dernier message a aussi son temps de lecture avant le récapitulatif.
  noSequence: [
    { at: 0, text: "Ah.", detail: "" },
    {
      at: verdictReadingMs,
      text: "Bon bah mon suivi de projet vient de prendre un coup 😞",
      detail: "",
    },
    {
      at: verdictReadingMs * 2,
      text: "Je vais faire comme si je n’avais pas développé un site entier.",
      detail: "",
    },
    {
      at: verdictReadingMs * 3,
      text: "Nan en vrai aucun souci :)",
      detail: "",
    },
  ] satisfies VerdictFrame[],
};

export const availability = {
  earliestDate: "2026-10-16",
  earliestMoment: "evening",
  earliestReaction:
    "Vendredi je débloque officiellement le mode liberté en soirée 😄",
  earliestBadge: "Mode chômage débloqué 😂",
  earliestHint:
    "Le vendredi 16 : soirée uniquement. Les autres jours, tu choisis.",
  dateReaction: "Un vrai jour dans le calendrier. Le cagou se tient prêt 😄",
  flexibleId: "anyday",
  flexibleSummary: "Un jour à caler ensemble",
  flexibleReaction: "Très bien. Trouvons juste un trou dans ton agenda 😂",
  flexibleAside: "Organisation : 0. Confiance : 100 % 🙃",
  calendarLabel: "Choisir un jour",
  previousMonth: "Mois précédent",
  nextMonth: "Mois suivant",
  weekdays: ["L", "M", "M", "J", "V", "S", "D"],
  weekdayNames: [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ],
  legend: { available: "Disponible", busy: "Occupé", selected: "Sélectionné" },
  eveningOnly: "soirée uniquement",
};

// Points humoristiques ajoutés aux trois dimensions, puis normalisés à 100 %.
// Les identifiants correspondent aux options et aux réponses définies plus haut.
export const seriousnessRules: SeriousnessRules = {
  base: { organisation: 20, idea: 30, improvisation: 50 },
  preciseDate: { organisation: 30, idea: 6 },
  activities: {
    drink: { organisation: 8, idea: 8 },
    food: { organisation: 5, idea: 10 },
    activity: { idea: 12, improvisation: 6 },
    surprise: { idea: 8, improvisation: 24 },
  },
  periods: {
    weekend: { organisation: 12, idea: 6 },
    next: { organisation: 18, idea: 4 },
    improvise: { idea: 8, improvisation: 22 },
    [availability.flexibleId]: { idea: 5, improvisation: 18 },
  },
  moments: {
    afternoon: { organisation: 8, idea: 6 },
    early: { organisation: 4, idea: 6, improvisation: 3 },
    evening: { idea: 6, improvisation: 7 },
    any: { improvisation: 10 },
  },
  science: {
    fries: {
      yes: { idea: 8, improvisation: 2 },
      few: { organisation: 6, idea: 3 },
      no: { organisation: 4 },
    },
    directions: {
      improvise: { idea: 2, improvisation: 14 },
      maps: { organisation: 12, idea: 4 },
      pretend: { idea: 4, improvisation: 16 },
    },
    late: {
      zero: { organisation: 12 },
      ten: { organisation: 6, idea: 2 },
      warn: { organisation: 6, idea: 6 },
      me: { improvisation: 12 },
    },
    bourbier: {
      follow: { idea: 6, improvisation: 12 },
      questions: { organisation: 8, idea: 6 },
      hesitate: { idea: 8, improvisation: 8 },
    },
    website: {
      like: { idea: 12, improvisation: 4 },
      "too-much": { organisation: 2, idea: 6 },
      finish: { idea: 8 },
    },
  },
  prudentAnswers: [
    { questionId: "directions", answerId: "maps" },
    { questionId: "late", answerId: "zero" },
    { questionId: "bourbier", answerId: "questions" },
  ],
  thresholds: { organisation: 40, improvisation: 45, prudentAnswers: 2 },
  profiles: {
    balanced: {
      labels: ["organisation", "bonne idée", "improvisation"],
      note: "Un mélange raisonnable de préparation et de décisions douteuses.",
    },
    organised: {
      labels: ["organisation", "bonne idée", "improvisation"],
      note: "Étonnamment structuré. Je suis presque inquiet.",
    },
    improvised: {
      labels: ["organisation", "bonne idée", "on verra bien"],
      note: "Très bien. On retrouve nos standards habituels 🙃",
    },
    bourbier: {
      labels: [
        "logistique",
        "confiance injustifiée",
        "plan bourbier potentiel",
      ],
      note: "Ça sent légèrement le plan bourbier. Donc probablement une bonne idée 😂",
    },
    confident: {
      labels: ["organisation", "confiance injustifiée", "improvisation"],
      note: "Beaucoup de confiance dans ce projet. J’apprécie l’audace 😄",
    },
    prudent: {
      labels: ["organisation", "bonne idée", "chaos contrôlé"],
      note: "Étonnamment structuré. Je suis presque inquiet.",
    },
  },
};
