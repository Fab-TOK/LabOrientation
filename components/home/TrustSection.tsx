const proofs = [
  {
    label: "Expérience",
    text: "Onze années dans le conseil en orientation, auprès des élèves comme des familles.",
  },
  /* ` ` : « 1 000 » ne se coupe jamais en fin de ligne. */
  { label: "Volume", text: "Plus de 1 000 jeunes accompagnés, du collège au post-bac." },
  {
    label: "Systèmes scolaires",
    text: "Un accompagnement sur les parcours internationaux. Une expertise des parcours français, réseau AEFE compris.",
  },
  { label: "Méthode", text: "Une démarche affinée et qui a fait ses preuves." },
  {
    label: "Sur mesure",
    text: "Un accompagnement individualisé, humain, bienveillant et exigeant.",
  },
  { label: "Transmission", text: "Formatrice de conseillers d’orientation pour Campus France." },
];

export function TrustSection() {
  return (
    <section className="bg-slate text-cream">
      <div className="gutter section-y grid items-start gap-6 nav:grid-cols-[0.95fr_1.2fr] nav:gap-14">
        <div>
          <div className="t-eyebrow text-peach">Pourquoi me faire confiance</div>
          <h2 className="t-h2 mt-3 max-w-[17ch] nav:mt-[14px]">
            Une expertise et un accompagnement humain
          </h2>
          <p className="t-quote mt-4 max-w-[40ch] text-peach nav:mt-[22px]">
            Mon rôle n’est pas de décider à la place de l’élève, mais de lui donner les outils, la
            confiance et la méthode.
          </p>
          <p className="t-body mt-[14px] max-w-[44ch] text-cream/80 nav:mt-[18px] nav:text-[15.5px]/[1.75]">
            Je suis convaincue que chaque jeune possède les ressources nécessaires pour
            réussir. Le projet que nous construisons doit lui ressembler réellement et
            respecter ses potentiels.
          </p>
        </div>

        <ul className="grid gap-5 md:grid-cols-2 nav:gap-x-10 nav:gap-y-[30px]">
          {proofs.map((proof) => (
            <li key={proof.label} className="border-t border-cream/24 pt-4 nav:pt-5">
              <div className="t-label text-peach">{proof.label}</div>
              <p className="mt-[11px] text-[14.5px]/[1.6] text-cream/90 nav:text-[15.5px]">
                {proof.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
