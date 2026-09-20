/* =====================================================
   DONNÉES DU SITE  —  C'est ici que tu modifies tout
   ===================================================== */

// Nom affiché en haut à gauche
const NOM_DU_SITE = "MonSite";

// Les 4 catégories du menu "Ressources"
// (l'id sert dans le lien : categorie.html?cat=armes)
const CATEGORIES = [
  { id: "armes",     nom: "Armes",     description: "Toutes les armes disponibles." },
  { id: "scripts",   nom: "Scripts",   description: "Tous les scripts disponibles." },
  { id: "maps",      nom: "Maps",      description: "Toutes les maps et mappings disponibles." },
  { id: "vehicules", nom: "Véhicules", description: "Tous les véhicules disponibles." }
];

// Les ressources. Pour en ajouter une : copie un bloc { ... }, colle-le à la suite
// (n'oublie pas la virgule entre deux blocs) et change les infos.
//
//  titre        : nom de la ressource
//  categorie    : "armes", "scripts", "maps" ou "vehicules"
//  description  : petit texte de présentation
//  image        : lien ou chemin d'une image (ex: "images/ak47.png"), laisse "" pour aucune
//  lien         : lien du bouton "Voir la ressource" (Discord, MEGA, page perso...)
//  vues         : nombre de vues affiché
//  telechargements : nombre de téléchargements affiché
//  une          : true = affichée en "À la une" sur l'accueil (mets true sur une seule)
const RESSOURCES = [
  {
    titre: "Pack armes exemple",
    categorie: "armes",
    description: "Exemple de description pour une arme. Remplace ce texte par le tien.",
    image: "",
    lien: "#",
    vues: 120,
    telechargements: 34,
    une: true
  },
  {
    titre: "Pistolet exemple",
    categorie: "armes",
    description: "Deuxième exemple dans la catégorie Armes.",
    image: "",
    lien: "#",
    vues: 85,
    telechargements: 12
  },
  {
    titre: "Script braquage exemple",
    categorie: "scripts",
    description: "Exemple de script. Indique ici ce qu'il fait et comment l'installer.",
    image: "",
    lien: "#",
    vues: 391,
    telechargements: 130
  },
  {
    titre: "Script métier exemple",
    categorie: "scripts",
    description: "Deuxième exemple dans la catégorie Scripts.",
    image: "",
    lien: "#",
    vues: 210,
    telechargements: 58
  },
  {
    titre: "Map commissariat exemple",
    categorie: "maps",
    description: "Exemple de map. Précise l'emplacement et les fichiers fournis.",
    image: "",
    lien: "#",
    vues: 176,
    telechargements: 47
  },
  {
    titre: "Véhicule sportif exemple",
    categorie: "vehicules",
    description: "Exemple de véhicule. Indique s'il est addon ou remplaçant.",
    image: "",
    lien: "#",
    vues: 254,
    telechargements: 91
  }
];
