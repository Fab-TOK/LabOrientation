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
components/        layout, ui (kit), home, offres, faq, contact, testimonials, reserver
content/           tout le contenu éditorial, typé
lib/               disponibilités, mailer, ICS, dates, validation, état du tunnel
```

### Contenu

Tout le texte vit dans `content/`, jamais dans les composants :

| Fichier | Contenu |
|---|---|
| `formulas.ts` | Les neuf formules, en trois familles |
| `testimonials.ts` | Les six témoignages |
| `faq.ts` | Les treize questions |
| `johana.ts` | La présentation de Johana |
| `vision.ts` | La page Ma vision |
| `site.ts` | Coordonnées, tarifs planchers, signature |

Trois textes sont **repris mot pour mot** et ne doivent pas être réécrits : la présentation
de Johana, les six témoignages (y compris les particularités d’orthographe de celui de
M. Capo, décision assumée) et les questions de FAQ.

### Design

Les tokens du handoff sont dans `app/globals.css` : couleurs en `@theme`, rôles
typographiques en classes `.t-*` (valeur mobile par défaut, valeur desktop à 900 px),
composants récurrents en classes `.btn-*`, `.chip`, `.field`, `.card`…

La bascule mobile / desktop est le point d’arrêt `nav` (900 px), qui commande à la fois le
passage du header en menu hamburger et le changement d’échelle typographique. Les grilles
à trois colonnes passent à deux à `md` (768 px), puis à une en dessous.

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

## Reste à obtenir de la cliente

1. **Les photographies** — hero de l’accueil, section Qui suis-je ?, hero de la page
   Qui suis-je ?, avatars des témoignages. Les emplacements sont réservés aux bonnes
   proportions (`components/ui/PhotoPlaceholder.tsx`) ; il suffira de remplacer le composant
   par un `next/image`.
2. **Onze réponses de FAQ** — les questions s’affichent avec la mention « Réponse à venir ».
   Renseigner `answer` dans `content/faq.ts` suffit à publier la réponse.
3. **Identifiants Google Cloud et clé d’envoi d’e-mails**, pour les deux intégrations
   ci-dessus.

## Décisions d’arbitrage

Sur les points laissés ouverts par le handoff :

- **« Ma vision » reste hors du menu desktop**, comme sur la maquette. La page est accessible
  depuis l’accueil, la page Qui suis-je ? et le menu mobile.
- **Le bouton du header reste « Prenons contact »** et mène au formulaire ; tous les autres
  appels à l’action mènent au tunnel de réservation. Sur la page Contact elle-même, il est
  remplacé par le téléphone, comme sur la maquette.
- **« Formation aux professionnels » est conservée** dans le formulaire de contact sans
  créer de dixième fiche : la FAQ confirme que le service existe.
- **Les trois catégories de la FAQ sont des repères de navigation**, pas un filtre : la
  maquette montre les trois sections affichées en même temps avec une seule en surbrillance.
  La catégorie active suit le défilement.
- **Le contenu ne se dédouble pas entre les deux maquettes.** Là où la maquette mobile
  raccourcit un paragraphe, c’est le texte complet qui est repris : la mise en page s’adapte,
  le contenu non. Seul le badge du hero, trop long pour 390 px, a une variante courte.
