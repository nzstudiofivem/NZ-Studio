/* =====================================================
   Logique du site (tu n'as normalement pas à toucher ici)
   ===================================================== */

const ICONES = {
  eclair: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  maison: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>',
  liste: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
  chevron: '<svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  loupe: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  oeil: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  telecharger: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 20h16"/></svg>',
  cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/></svg>'
};

// Protège les textes affichés (évite de casser la page avec des caractères spéciaux)
function esc(texte) {
  return String(texte ?? "").replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function compter(idCategorie) {
  return RESSOURCES.filter(r => r.categorie === idCategorie).length;
}

function nomCategorie(id) {
  const c = CATEGORIES.find(c => c.id === id);
  return c ? c.nom : "";
}

/* ---------- En-tête ---------- */
function afficherEntete() {
  const page = document.body.dataset.page;
  const liens = CATEGORIES.map(c =>
    `<a href="categorie.html?cat=${esc(c.id)}">${esc(c.nom)}<span>${compter(c.id)}</span></a>`
  ).join("");

  document.getElementById("entete").innerHTML = `
    <header class="entete">
      <div class="conteneur entete-interieur">
        <a class="logo" href="index.html" aria-label="Accueil">${ICONES.eclair}<span>${esc(NOM_DU_SITE)}</span></a>

        <nav class="nav" aria-label="Navigation principale">
          <a class="nav-lien ${page === "accueil" ? "actif" : ""}" href="index.html">${ICONES.maison}Accueil</a>

          <div class="menu" id="menu-ressources">
            <button class="nav-bouton ${page === "categorie" ? "actif" : ""}" type="button" aria-expanded="false" aria-haspopup="true">
              ${ICONES.liste}Ressources${ICONES.chevron}
            </button>
            <div class="sous-menu">
              ${liens}
              <a class="tout" href="categorie.html?cat=tout">Voir toutes les ressources</a>
            </div>
          </div>
        </nav>

        <form class="recherche" id="form-recherche" role="search">
          ${ICONES.loupe}
          <input type="search" name="q" placeholder="Rechercher..." aria-label="Rechercher une ressource">
        </form>
      </div>
    </header>`;

  const menu = document.getElementById("menu-ressources");
  const bouton = menu.querySelector("button");

  const basculer = ouvrir => {
    menu.classList.toggle("ouvert", ouvrir);
    bouton.setAttribute("aria-expanded", String(ouvrir));
  };

  bouton.addEventListener("click", () => basculer(!menu.classList.contains("ouvert")));
  menu.addEventListener("mouseenter", () => { if (window.matchMedia("(hover: hover)").matches) basculer(true); });
  menu.addEventListener("mouseleave", () => { if (window.matchMedia("(hover: hover)").matches) basculer(false); });
  document.addEventListener("click", e => { if (!menu.contains(e.target)) basculer(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") basculer(false); });

  document.getElementById("form-recherche").addEventListener("submit", e => {
    e.preventDefault();
    const q = new FormData(e.target).get("q").trim();
    location.href = "categorie.html?cat=tout" + (q ? "&q=" + encodeURIComponent(q) : "");
  });
}

/* ---------- Carte d'une ressource ---------- */
function carteRessource(r) {
  const visuel = r.image
    ? `<div class="visuel" role="img" aria-label="${esc(r.titre)}" style="background-image:url('${esc(r.image)}')"></div>`
    : `<div class="visuel" aria-hidden="true">${ICONES.cube}</div>`;

  return `
    <article class="carte">
      ${visuel}
      <div class="carte-corps">
        <span class="cat">${esc(nomCategorie(r.categorie))}</span>
        <h3>${esc(r.titre)}</h3>
        <p>${esc(r.description)}</p>
        <div class="stats">
          <span>${ICONES.oeil}${esc(r.vues ?? 0)} vues</span>
          <span>${ICONES.telecharger}${esc(r.telechargements ?? 0)}</span>
        </div>
        <a class="bouton" href="${esc(r.lien || "#")}" target="_blank" rel="noopener">${ICONES.telecharger}Voir la ressource</a>
      </div>
    </article>`;
}

/* ---------- Page d'accueil ---------- */
function afficherAccueil() {
  document.getElementById("liste-categories").innerHTML = CATEGORIES.map(c =>
    `<a href="categorie.html?cat=${esc(c.id)}"><span>${esc(c.nom)}</span><span class="compte">${compter(c.id)}</span></a>`
  ).join("");

  const vedette = RESSOURCES.find(r => r.une) || RESSOURCES[0];
  const zoneUne = document.getElementById("une");
  if (vedette) {
    const image = vedette.image
      ? `<div class="une-image visuel" role="img" aria-label="${esc(vedette.titre)}" style="background-image:url('${esc(vedette.image)}')"></div>`
      : `<div class="une-image visuel" aria-hidden="true">${ICONES.cube}</div>`;
    zoneUne.innerHTML = `
      <div class="une-texte">
        <span class="etiquette">À la une cette semaine</span>
        <h2>${esc(vedette.titre)}</h2>
        <p>${esc(vedette.description)}</p>
        <div class="stats">
          <span>${ICONES.oeil}${esc(vedette.vues ?? 0)} vues</span>
          <span>${ICONES.telecharger}${esc(vedette.telechargements ?? 0)}</span>
        </div>
        <div><a class="bouton" href="${esc(vedette.lien || "#")}" target="_blank" rel="noopener">${ICONES.telecharger}Voir la ressource</a></div>
      </div>
      ${image}`;
  } else {
    zoneUne.innerHTML = `<div class="vide">Ajoute une ressource dans data.js pour la voir ici.</div>`;
  }

  document.getElementById("recentes").innerHTML =
    RESSOURCES.slice().reverse().slice(0, 6).map(carteRessource).join("");
}

/* ---------- Page d'une catégorie ---------- */
function afficherCategorie() {
  const params = new URLSearchParams(location.search);
  const cat = params.get("cat") || "tout";
  const q = (params.get("q") || "").trim().toLowerCase();

  const categorie = CATEGORIES.find(c => c.id === cat);
  const titre = q ? `Recherche : ${params.get("q")}` : (categorie ? categorie.nom : "Toutes les ressources");
  const description = categorie && !q ? categorie.description : "Toutes les catégories confondues.";

  document.title = `${titre} - ${NOM_DU_SITE}`;
  document.getElementById("titre-page").textContent = titre;
  document.getElementById("desc-page").textContent = description;

  document.getElementById("onglets").innerHTML =
    [{ id: "tout", nom: "Tout" }, ...CATEGORIES].map(c =>
      `<a class="onglet ${c.id === cat ? "actif" : ""}" href="categorie.html?cat=${esc(c.id)}">${esc(c.nom)}</a>`
    ).join("");

  let liste = RESSOURCES.filter(r => cat === "tout" || r.categorie === cat);
  if (q) liste = liste.filter(r => (r.titre + " " + r.description).toLowerCase().includes(q));

  document.getElementById("grille").innerHTML = liste.length
    ? liste.map(carteRessource).join("")
    : `<div class="vide">Aucune ressource ici pour le moment.<br>Ajoute-en dans <strong>data.js</strong> ou essaie une autre recherche.</div>`;
}

/* ---------- Démarrage ---------- */
document.addEventListener("DOMContentLoaded", () => {
  afficherEntete();
  const page = document.body.dataset.page;
  if (page === "accueil") afficherAccueil();
  if (page === "categorie") afficherCategorie();
  const annee = document.getElementById("annee");
  if (annee) annee.textContent = new Date().getFullYear();
});
