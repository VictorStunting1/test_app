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
    "Après une étude approfondie de la situation (environ 3 minutes), voici les différentes options retenues.",
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
      reaction: "Excellent. Le comité approuve ce grand classique.",
    },
    {
      id: "food",
      icon: "food",
      tag: "PLAN GOURMAND",
      title: "On mange un truc",
      label: "Un repas",
      description:
        "Avantage : si la conversation devient catastrophique, il reste toujours la nourriture.",
      reaction: "Une décision de bon goût. Littéralement.",
    },
    {
      id: "activity",
      icon: "activity",
      tag: "ESPRIT DE COMPÉTITION",
      title: "Une petite activité",
      label: "Bowling, billard ou arcade",
      description:
        "Bowling, billard, arcade… pour découvrir beaucoup trop rapidement notre esprit de compétition.",
      reaction: "D’accord. Mais on reste amis après la partie.",
    },
    {
      id: "surprise",
      icon: "surprise",
      tag: "CONFIANCE AVEUGLE",
      title: "Surprise, surprise",
      label: "Une surprise",
      description:
        "Tu me laisses choisir. Niveau de risque : raisonnablement douteux.",
      reaction: "Cette confiance sera traitée avec un sérieux relatif.",
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
    { id: "maybe", label: "Pourquoi pas 👀", response: "Pourquoi pas 👀" },
    {
      id: "lawyer",
      label: "Je demande à mon avocat",
      response: "Je demande à mon avocat avant de me prononcer.",
    },
    {
      id: "no",
      label: "Je passe mon tour",
      response: "Merci pour la proposition, mais je passe mon tour.",
    },
  ],
  refusalNote:
    "Tout refus sera évidemment accepté, même si le comité sera profondément déçu pendant approximativement 12 secondes.",
  validationMessage:
    "Choisis une activité et une période pour que le comité puisse remplir son dossier.",
  summaryTitle: "Mission potentiellement acceptée.",
  pendingTitle: "Dossier transmis à ton avocat.",
  refusedTitle: "Réponse reçue, sans rancune.",
  summaryIntro:
    "Les grandes lignes sont posées. Il ne reste qu’à envoyer ta réponse.",
  summaryLabels: ["Au programme", "Quand", "À quel moment"],
  copyLabel: "Copier ma réponse",
  copiedLabel: "Réponse copiée !",
  copyError:
    "Copie automatique indisponible : sélectionne le texte ci-dessous.",
  editLabel: "Modifier ma réponse",
  footer: "Fait avec un peu de courage et beaucoup trop de réflexion.",
  footerNote: "Aucune réponse n’est envoyée automatiquement.",
  responseText: (selection: ResponseSelection) =>
    `Bon, j’ai étudié ton dossier beaucoup trop sérieusement.\n${selection.decision}\nJe vote pour : ${selection.activity.label}\nPlutôt : ${selection.period} / ${selection.moment}\nÀ toi de jouer 🙂`,
};
