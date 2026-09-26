# Site Lab’Orientation

Site vitrine de **Lab’Orientation**, cabinet de conseil en orientation scolaire,
universitaire et professionnelle fondé par Johana Ghionda. Next.js (App Router),
TypeScript, Tailwind v4. Unilingue français.

Les maquettes de référence sont dans [`design_handoff_laborientation/`](design_handoff_laborientation/README.md).
Pour les visualiser, ouvrir les fichiers `.dc.html` du dossier `design/` dans un navigateur.

## Démarrer

```bash
npm install
npm run dev
```

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement sur http://localhost:3000 |
| `npm run build` | Build de production (⚠ arrêter `dev` avant : les deux écrivent dans `.next`) |
| `npm run lint` | ESLint |
| `npm test` | Tests unitaires (Vitest) |

## Structure

```
app/(site)/        les sept pages publiques, avec header et footer
app/reserver/      le tunnel de réservation, header simplifié et état partagé
app/api/           disponibilités, réservation, contact
components/        layout, ui (kit), home, offres, faq, contact, testimonials, reserver, seo
content/           tout le contenu éditorial, typé
lib/               disponibilités, mailer, ICS, dates, validation, état du tunnel
```

### Contenu

Tout le texte vit dans `content/`, jamais dans les composants :

| Fichier | Contenu |
|---|---|
| `formulas.ts` | Les six offres : trois parcours, trois modules |
| `testimonials.ts` | Les six témoignages |
| `faq.ts` | Les douze questions et leurs réponses |
| `johana.ts` | La présentation de Johana |
| `vision.ts` | La page Ma vision |
| `site.ts` | Coordonnées, tarifs planchers, signature, adresse publique |
| `structured-data.ts` | Les données schema.org, dérivées des deux fichiers ci-dessus |

Quatre textes sont **repris mot pour mot** et ne doivent pas être réécrits : la présentation
de Johana, les six témoignages (y compris les particularités d’orthographe de celui de
M. Capo, décision assumée), les questions de FAQ et les trois paragraphes de description des
parcours dans `formulas.ts`.

### La gamme

Six offres en deux familles : trois **parcours** par niveau (Premiers Pas en 4ᵉ et 3ᵉ, Cap sur
soi en 2ⁿᵈᵉ, Cap sur l’Avenir en 1ʳᵉ et Terminale) et trois **modules** complémentaires,
réservables seuls ou en complément d’un parcours (CV, Lettre de motivation, Parcoursup).

La page Nos offres suit un design plus récent que les maquettes `Desktop v2` / `Mobile v2`,
qui portent encore l’ancienne gamme de neuf formules. En cas de divergence sur cette page,
c’est le design de la nouvelle gamme qui fait foi ; les autres pages suivent les maquettes v2.

### Design

Les tokens du handoff sont dans `app/globals.css` : couleurs en `@theme`, rôles
typographiques en classes `.t-*` (valeur mobile par défaut, valeur desktop à 900 px),
composants récurrents en classes `.btn-*`, `.chip`, `.field`, `.card`…

La bascule mobile / desktop est le point d’arrêt `nav` (900 px), qui commande à la fois le
passage du header en menu hamburger et le changement d’échelle typographique. Les grilles
à trois colonnes passent à deux à `md` (768 px), puis à une en dessous.

**Les grilles de fiches d’offre font exception** : elles n’ouvrent leur troisième colonne
qu’à `xl` (1280 px), la largeur du design. À 900 px, trois colonnes ne laissaient que
22 caractères par ligne au paragraphe de description, et l’en-tête n’avait plus la place de
poser le badge de famille et la pastille de niveau côte à côte.

⚠️ **L’échelle de points d’arrêt est redéclarée en entier** dans `@theme`, précédée de
`--breakpoint-*: initial`. Tailwind émet les media queries dans l’ordre de déclaration, pas
dans l’ordre des valeurs : ajouter simplement `nav` à l’échelle par défaut le plaçait avant
`md`, et `md:` écrasait alors `nav:` sur tous les écrans de plus de 900 px. Ne pas ajouter
de point d’arrêt sans le replacer dans l’ordre croissant.

**Le contenu occupe toute la largeur de l’écran**, sans largeur maximale ni marges
latérales : seule la gouttière (18 px / 48 px) sépare le contenu du bord. Les proportions
de la maquette sont portées par les grilles, et la longueur des lignes de texte reste tenue
par les `max-width` en `ch` posées paragraphe par paragraphe.

**Aucune ombre nulle part** : la profondeur vient des aplats et des bordures fines.

**Animations discrètes** (section « Animations » de `globals.css`) : arrivée en cascade du
haut de l’accueil, chiffres qui comptent (`components/ui/CountUp.tsx`), cartes de parcours qui
se soulèvent au survol, globe qui tourne, halo du point de l’étiquette. Aucune bibliothèque.
Pour les visiteurs qui demandent moins de mouvement, tout arrive directement à l’état final et
les boucles s’arrêtent, **sauf le globe, qui tourne pour tout le monde** à la demande de la
cliente : ses méridiens sont animés dans le SVG même (`GlobeIcon`, `<animate>`), hors de portée
des règles CSS. Pour rejouer une animation, préférer des `@keyframes` aux transitions : retirer
puis remettre une classe ne relance pas une transition.

## Ce qui est simulé

Le parcours est complet et l’état persiste d’une étape à l’autre, mais deux intégrations
restent à brancher. Chacune est isolée derrière une interface : l’implémenter ne demande
aucune modification de l’interface utilisateur.

| À brancher | Où | Aujourd’hui |
|---|---|---|
| Google Calendar | `lib/availability.ts`, interface `AvailabilityProvider` | `MockAvailabilityProvider` : mois déterministe, week-ends fermés, quelques jours complets, rien au-delà de trois mois |
| E-mails transactionnels | `lib/mailer.ts`, interface `Mailer` | `ConsoleMailer` : journalise le message au lieu de l’envoyer |

Le reste fonctionne pour de bon : validation partagée client / serveur (`lib/validation.ts`),
vérification du créneau côté serveur avant confirmation, génération du fichier `.ics` et du
lien Google Agenda (`lib/ics.ts`).

## Référencement

Le site est **ouvert aux moteurs**. L’adresse publique vit dans `content/site.ts` (`siteUrl`)
et se surcharge par `NEXT_PUBLIC_SITE_URL` : sans quoi une préproduction annoncerait les URL
de production dans ses canoniques et son sitemap.

| Fichier | Ce qu’il produit |
|---|---|
| `app/robots.ts` | `/robots.txt` : tout ouvert, sauf le tunnel de réservation et les routes d’API |
| `app/sitemap.ts` | `/sitemap.xml`, dérivé de `publicRoutes` — ajouter une page à cette liste suffit |
| `app/opengraph-image.png` | La vignette de partage, 1200 × 630, reprise aussi par Twitter |
| `content/structured-data.ts` | schema.org : fiche du cabinet sur l’accueil, FAQ sur `/faq` |

Chaque page publique porte sa propre URL canonique, pour qu’un paramètre de campagne
(`?utm_source=…`) ou de préremplissage (`?formule=…`) ne soit pas indexé comme une page à part.

⚠️ **Le balisage de FAQ ne déclare que les questions réellement répondues.** Les douze le sont
aujourd’hui. Une question ajoutée sans `answer` s’afficherait avec « Réponse à venir » et
resterait hors du balisage : annoncer une réponse absente à un moteur serait faux.

## Reste à obtenir de la cliente

1. **Les photographies** — hero de l’accueil, section Qui suis-je ?, hero de la page
   Qui suis-je ?. Les emplacements sont réservés aux bonnes proportions
   (`components/ui/PhotoPlaceholder.tsx`) ; il suffira de remplacer le composant par un
   `next/image`. Les témoignages, eux, n’attendent plus d’image : ils portent l’initiale de
   leur auteur sur les deux pages.
2. **Identifiants Google Cloud et clé d’envoi d’e-mails**, pour les deux intégrations
   ci-dessus.

## Décisions d’arbitrage

Sur les points laissés ouverts par le handoff :

- **Les pastilles de public ne sont pas des conteneurs flex.** Leur libellé porte un `<sup>`
  (« 1ʳᵉ et Terminale »), et chaque enfant d’un conteneur flex devient un élément à part :
  l’espace avant « et » est alors mangé, et l’exposant, blockifié, hérite du `line-height: 0`
  que le reset pose sur `sup` — boîte de hauteur nulle, plus rien à sélectionner. `.badge-level`
  reste donc en `inline-block`.
- **Les initiales des témoignages sont centrées optiquement**, pas géométriquement : flexbox
  centre la boîte de ligne, or Newsreader réserve sous la ligne de base une place que les
  capitales n’occupent pas. `.avatar-initial` rattrape l’écart, en `em` pour valoir à toutes
  les tailles.
- **« Ma vision » reste hors du menu desktop**, comme sur la maquette. La page est accessible
  depuis l’accueil, la page Qui suis-je ? et le menu mobile.
- **Le bouton du header reste « Prenons contact »** et mène au formulaire ; tous les autres
  appels à l’action mènent au tunnel de réservation. Sur la page Contact elle-même, il est
  remplacé par le téléphone, comme sur la maquette.
- **Les dépliants des fiches d’offre sont repliés au chargement.** Le design les montre tous
  ouverts pour donner à voir le contenu d’un coup ; en production c’est un accordéon. La
  grille est en `items-start` : une carte dépliée s’allonge seule, sans entraîner ses voisines.
- **« Ateliers collectifs » et « Formation aux professionnels » ont disparu** avec la nouvelle
  gamme. La FAQ continue de mentionner les lycées et institutions, à la demande du client :
  la réponse à `etablissements-et-professionnels` explique ce travail (ateliers de groupe,
  formation de conseillers Campus France) hors de la gamme des six offres.
- **Les trois catégories de la FAQ sont des repères de navigation**, pas un filtre : la
  maquette montre les trois sections affichées en même temps avec une seule en surbrillance.
  La catégorie active suit le défilement.
- **Le contenu ne se dédouble pas entre les deux maquettes.** Là où la maquette mobile
  raccourcit un paragraphe, c’est le texte complet qui est repris : la mise en page s’adapte,
  le contenu non. Seul le badge du hero, trop long pour 390 px, a une variante courte.
