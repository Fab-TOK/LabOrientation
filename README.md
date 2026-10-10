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
app/api/contact/   réception du formulaire de contact
app/drapeaux/      drapeaux du champ « Numéro WhatsApp », écrits au build depuis country-flag-icons
components/        layout, ui (kit), home, offres, faq, contact, testimonials, seo
content/           tout le contenu éditorial, typé
lib/               mailer SMTP, gabarits d’e-mails, anti-robots, validation, métadonnées
```

### Contenu

Tout le texte vit dans `content/`, jamais dans les composants :

| Fichier | Contenu |
|---|---|
| `formulas.ts` | Les dix offres : quatre parcours, trois candidatures, trois modules |
| `testimonials.ts` | Les six témoignages |
| `faq.ts` | Les douze questions et leurs réponses |
| `johana.ts` | La présentation de Johana |
| `vision.ts` | La page Ma vision |
| `site.ts` | Coordonnées, tarifs planchers (séance, parcours, par zone), signature, adresse publique |
| `whatsapp.ts` | Les messages WhatsApp déjà rédigés de la page Contact |
| `phone-countries.ts` | Pays et indicatifs du champ « Numéro WhatsApp », liste figée |
| `structured-data.ts` | Les données schema.org, dérivées des deux fichiers ci-dessus |
| `photos/` | La photo de Johana, affichée par `components/ui/JohanaPhoto.tsx` |

Quatre textes sont **repris mot pour mot** et ne doivent pas être réécrits : la présentation
de Johana, les six témoignages (y compris les particularités d’orthographe de celui de
M. Capo, décision assumée), les questions de FAQ et les paragraphes de description des
parcours 1 à 3 dans `formulas.ts`, gardés même là où la nouvelle maquette les raccourcit.
Seule exception, la réponse « Combien coûte un accompagnement ? » : elle est construite à
partir des tarifs de `site.ts`, pour ne jamais contredire les prix affichés.

### La gamme

Dix offres en trois familles :
- quatre **parcours** par niveau : Premiers Pas (4ᵉ et 3ᵉ), Cap sur soi (3ᵉ et 2ⁿᵈᵉ), Cap sur
  l’Avenir (1ʳᵉ et Terminale), Cap Réussite (Terminale, Cap sur l’Avenir + Parcoursup phase
  principale), ce dernier en grande carte ardoise sous les trois autres ;
- trois **candidatures** : Parcoursup phase principale, Parcoursup étudiants internationaux,
  Candidatures hors de France ;
- trois **modules** complémentaires, réservables seuls ou en complément d’un parcours : Bilan
  d’orientation, CV, Lettre de motivation.

L’accueil ne montre que les trois premiers parcours (`homeParcours`).

**Tarifs** : le bloc « Les tarifs » de la page Offres a un interrupteur Bénin / International,
Bénin par défaut et déjà rendu côté serveur (`components/offres/PricingToggle.tsx`). Les
montants de toutes les zones occupent la même case, les autres invisibles : la largeur ne
bouge pas à la bascule. L’accueil n’affiche que le prix d’une séance par zone.

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

## Formulaire de contact et e-mails

Chaque demande envoie deux e-mails par le serveur SMTP de Hostinger (`lib/mailer.ts`,
nodemailer) : la demande à Johana, qui peut répondre directement au visiteur, et un accusé de
réception au visiteur, dont la réponse revient à Johana (sans en-tête de réponse distinct : contact@
est un alias de sa boîte, et un « Répondre à » différent de l’expéditeur alerte les filtres).
Les deux e-mails sont mis en page dans `lib/emails/` : HTML en tableaux et styles en ligne,
version texte jointe, contenu tapé par le visiteur neutralisé (`escapeHtml`). Le site se connecte avec la boîte
johana@laborientation.com et envoie sous son alias contact@laborientation.com. SPF, DKIM et
DMARC du domaine sont déjà réglés chez Hostinger.

| Variable | Valeur |
|---|---|
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `465` (SSL) |
| `SMTP_USER` | `johana@laborientation.com` |
| `SMTP_PASSWORD` | le mot de passe de cette boîte |

Sur l’ordinateur, elles vivent dans `.env.local`, ignoré par Git (modèle : `.env.example`) ;
pour le site en ligne, dans Vercel > Settings > Environment Variables. Sans mot de passe, les
e-mails sont seulement notés dans le journal ; sur Vercel, c’est une erreur, et le visiteur
voit le message d’échec qui lui donne l’adresse de Johana. **Si Johana change le mot de passe
de sa boîte, il faut le changer aussi chez Vercel.**

Si l’e-mail à Johana échoue, le visiteur le voit. Si seul l’accusé de réception échoue
(adresse fausse), la demande compte comme envoyée : Johana l’a reçue.

**Anti-robots** (`lib/anti-spam.ts`), invisible pour les visiteurs, sans service externe :
un champ piège caché que seuls les robots remplissent, un délai minimal de 3 secondes entre
l’ouverture du formulaire et l’envoi (une demande qui n’a pas ce délai n’est pas passée par la
page), et ni lien ni adresse dans le nom, qui est recopié dans l’accusé de réception. Une
demande écartée reçoit la même réponse qu’une demande envoyée. Si du spam passait quand même,
l’étape suivante serait Cloudflare Turnstile.

Le reste fonctionne pour de bon : validation partagée client / serveur (`lib/validation.ts`),
numéro WhatsApp vérifié pour son pays par libphonenumber-js (sauf au Bénin : 8 ou 10 chiffres,
car bien des comptes WhatsApp gardent l’ancien numéro à 8 chiffres), messages WhatsApp déjà
rédigés.

**Il n’y a plus de calendrier de réservation.** Tous les boutons « Réserver… », « Prenons
contact » et « Demander cette formule » mènent au même formulaire : Johana rappelle pour fixer
l’entretien. L’adresse `/reserver` n’existe plus (page introuvable, sans redirection).

## Référencement

Le site est **ouvert aux moteurs**. L’adresse publique vit dans `content/site.ts` (`siteUrl`)
et se surcharge par `NEXT_PUBLIC_SITE_URL` : sans quoi une préproduction annoncerait les URL
de production dans ses canoniques et son sitemap.

⚠️ **L’adresse principale est celle avec www** (`https://www.laborientation.com`) : Vercel y
redirige `laborientation.com`. `siteUrl` doit toujours désigner le domaine principal choisi
dans Vercel, celui où la redirection aboutit : une canonique qui pointe vers une adresse
redirigée envoie aux moteurs deux réponses contradictoires.

| Fichier | Ce qu’il produit |
|---|---|
| `app/robots.ts` | `/robots.txt` : tout ouvert, sauf les routes d’API |
| `app/sitemap.ts` | `/sitemap.xml`, dérivé de `publicRoutes` — ajouter une page à cette liste suffit |
| `app/opengraph-image.png` | La vignette de partage, 1200 × 630, reprise aussi par Twitter |
| `content/structured-data.ts` | schema.org : fiche du cabinet sur l’accueil, FAQ sur `/faq` |

Chaque page publique porte sa propre URL canonique, pour qu’un paramètre de campagne
(`?utm_source=…`) ou de préremplissage (`?formule=…`) ne soit pas indexé comme une page à part.

⚠️ **Le balisage de FAQ ne déclare que les questions réellement répondues.** Les douze le sont
aujourd’hui. Une question ajoutée sans `answer` s’afficherait avec « Réponse à venir » et
resterait hors du balisage : annoncer une réponse absente à un moteur serait faux.

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
- **Le bouton du header reste « Prenons contact »** et mène au formulaire, comme tous les
  autres appels à l’action. Sur la page Contact elle-même, il est remplacé par le téléphone.
- **Le lien de la page Offres s’appelle « Les accompagnements »** dans le header, le menu
  mobile et le footer. De 900 à 1 023 px, le header n’a pas la place de ses cinq liens :
  « Accueil » s’efface, le logo y mène déjà. Dans le footer, les liens ne se coupent pas.
- **La page Contact lit `?formule=` côté serveur** : l’offre du bouton cliqué est
  présélectionnée dès le premier affichage. La page est donc rendue à chaque visite, et non
  figée au build.
- **Champ « Numéro WhatsApp »** : liste native des pays posée en transparence sur l’étiquette
  visible (drapeau, indicatif, ▾) ; au clic s’ouvre la liste du système, le sélecteur du
  téléphone sur mobile. Bénin par défaut, puis Togo, Côte d’Ivoire, France, Belgique, puis
  l’ordre alphabétique. La liste est figée dans `content/phone-countries.ts` (noms français
  officiels) pour que serveur et navigateur rendent exactement le même texte. Les drapeaux
  sont des images, pas des emoji (Chrome et Edge sous Windows affichent un emoji drapeau en
  deux lettres) : la route `app/drapeaux` les tire de country-flag-icons et les écrit au build
  (`/drapeaux/BJ.svg`), sans aucun fichier dans le projet ; le navigateur ne télécharge que
  celui du pays choisi.
- **Centrages optiques** (mesurés au navigateur, en `em`) : les capitales de Figtree
  remontent de 0,075em dans leur ligne, d’où le décalage des badges et des pastilles
  numérotées ; un titre en Newsreader posé à côté d’une pastille reçoit `.caps-align`.
- **Les dépliants des fiches d’offre sont repliés au chargement.** Le design les montre tous
  ouverts pour donner à voir le contenu d’un coup ; en production c’est un accordéon. La
  grille est en `items-start` : une carte dépliée s’allonge seule, sans entraîner ses voisines.
  Les candidatures, sans dépliant, prennent au contraire la hauteur de la plus haute : leurs
  chiffres et leurs boutons s’alignent.
- **« Ateliers collectifs » et « Formation aux professionnels » ont disparu** avec la nouvelle
  gamme. La FAQ continue de mentionner les lycées et institutions, à la demande du client :
  la réponse à `etablissements-et-professionnels` explique ce travail (ateliers de groupe,
  formation de conseillers Campus France) hors de la gamme des dix offres.
- **Les trois catégories de la FAQ sont des repères de navigation**, pas un filtre : la
  maquette montre les trois sections affichées en même temps avec une seule en surbrillance.
  La catégorie active suit le défilement.
- **Le contenu ne se dédouble pas entre les deux maquettes.** Là où la maquette mobile
  raccourcit un paragraphe, c’est le texte complet qui est repris : la mise en page s’adapte,
  le contenu non. Seul le badge du hero, trop long pour 390 px, a une variante courte.
