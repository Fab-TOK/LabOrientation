import { site } from "@/content/site";

const guarantees = [
  "En français ou en anglais",
  "Présentiel au Bénin, visio partout ailleurs",
  "Aucun paiement sur le site",
];

export function ContactSidebar() {
  return (
    <aside className="flex flex-col gap-4 nav:sticky nav:top-5">
      <div className="rounded-[14px] bg-slate p-5 text-cream nav:rounded-[16px] nav:p-[26px]">
        <h2 className="font-serif text-[22px]/[1.2] text-peach nav:text-[24px]">
          20 minutes offertes
        </h2>
        <p className="mt-3 text-[13.5px]/[1.65] text-cream/85">
          L’entretien préalable est gratuit et sans engagement. Il sert à
          comprendre votre besoin et à vous orienter vers la formule adaptée. Le tarif et
          les modalités de paiement sont discutés à ce moment-là.
        </p>
        <ul className="mt-4 flex flex-col gap-[10px] border-t border-cream/20 pt-4">
          {guarantees.map((item) => (
            <li key={item} className="flex gap-[10px] text-[13.5px]/[1.5] text-cream/90">
              <span className="font-bold text-turquoise" aria-hidden="true">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="card bg-white p-5 nav:p-[26px]">
        <h2 className="text-[15.5px]/[1.3] font-semibold">Après votre demande</h2>
        <p className="mt-2 text-[13.5px]/[1.65] text-slate/78">
          Lab’Orientation vous recontactera afin d’échanger sur votre besoin et de vous
          expliquer les prochaines étapes.
        </p>
      </div>

      <div className="rounded-[14px] bg-peach p-5 nav:rounded-[16px] nav:p-[26px]">
        <h2 className="text-[15.5px]/[1.3] font-semibold">Une question avant de vous lancer ?</h2>
        <p className="mt-2 text-[13.5px]/[1.65] text-slate/80">
          Écrivez-moi directement sur WhatsApp.
        </p>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 block font-serif text-[20px]/[1.2] hover:underline"
        >
          Écrire sur WhatsApp <span aria-hidden="true">→</span>
        </a>
        <a
          href={site.emailHref}
          className="mt-[6px] block text-[13.5px]/[1.5] text-slate/80 hover:underline"
        >
          {site.email}
        </a>
      </div>
    </aside>
  );
}
