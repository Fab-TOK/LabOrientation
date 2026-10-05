import { site } from "@/content/site";
import { whatsappHref } from "@/content/whatsapp";
import { cn } from "@/lib/cn";

/** Carte ardoise « Vous préférez WhatsApp ? », avec un premier message déjà rédigé. */
export function WhatsAppCard({ message, className }: { message: string; className?: string }) {
  return (
    <div className={cn("rounded-[16px] bg-slate p-[22px] text-cream nav:p-7", className)}>
      <h2 className="font-serif text-[22px]/[1.2] text-peach nav:text-[26px]">
        Vous préférez WhatsApp ?
      </h2>
      <p className="mt-[10px] text-[14px]/[1.65] text-cream/85 text-pretty">
        Écrivez directement à Johana. Un premier message est déjà rédigé, il suffit de
        l’envoyer.
      </p>
      <a
        href={whatsappHref(message)}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-4 block rounded-full bg-peach p-[15px] text-center text-[14.5px]/none font-bold text-slate transition-colors hover:bg-peach/90 nav:mt-[18px]"
      >
        Écrire sur WhatsApp <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

const steps = [
  "Vous envoyez votre demande.",
  `Johana vous recontacte sous ${site.responseDelay}.`,
  "Vous convenez ensemble de votre entretien préalable gratuit de 20 minutes.",
];

/** Encadré sable « Comment ça se passe », trois étapes. */
export function HowItWorks({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-slate/12 bg-sand p-5 nav:rounded-[16px] nav:p-[26px]",
        className,
      )}
    >
      <h2 className="text-[10.5px]/none font-bold tracking-[0.12em] text-slate/55 uppercase nav:text-[11px]">
        Comment ça se passe
      </h2>
      <ol className="mt-[14px] flex flex-col gap-3 nav:mt-4 nav:gap-[14px]">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3">
            <span className="flex size-6 flex-none items-center justify-center rounded-full bg-slate text-[11.5px]/none font-bold text-peach">
              {index + 1}
            </span>
            <span className="pt-[2px] text-[14px]/[1.55] text-slate/85">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Colonne de droite, sur ordinateur seulement : sur téléphone, la carte
 * WhatsApp passe au-dessus du formulaire et « Comment ça se passe » en
 * dessous (voir `ContactExperience`).
 */
export function ContactSidebar({ message }: { message: string }) {
  return (
    <aside className="hidden flex-col gap-4 nav:sticky nav:top-5 nav:flex">
      <WhatsAppCard message={message} />
      <HowItWorks />
      <div className="flex flex-col gap-[14px] rounded-[16px] border border-slate/12 bg-white px-[26px] py-[22px]">
        <ContactLine label="Téléphone" value={site.phone} href={site.phoneHref} />
        <div className="h-px bg-slate/10" aria-hidden="true" />
        <ContactLine label="E-mail" value={site.email} href={site.emailHref} />
      </div>
    </aside>
  );
}

function ContactLine({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div>
      <div className="text-[12px]/[1.3] font-medium text-slate/55">{label}</div>
      <a href={href} className="mt-1 block text-[15px]/[1.3] font-semibold hover:underline">
        {value}
      </a>
    </div>
  );
}
