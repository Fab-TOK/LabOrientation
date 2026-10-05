import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-slate text-cream">
      <div className="gutter grid gap-7 py-7 nav:grid-cols-[1.7fr_1fr_1fr_1.15fr] nav:items-start nav:gap-11 nav:py-12">
        <div className="flex flex-col">
          <div className="flex items-center nav:h-[11px]">
            <Image
              src="/logo-icon.png"
              alt="Lab’Orientation"
              width={120}
              height={120}
              className="h-[30px] w-auto brightness-0 invert nav:h-[34px]"
            />
          </div>
          <p className="mt-[30px] hidden max-w-[34ch] text-[13.5px]/[1.65] text-cream/72 nav:block">
            Orientation scolaire, universitaire et professionnelle, des collégiens aux
            adultes en reconversion. En présentiel au Bénin, en visioconférence partout
            ailleurs.
          </p>
          <div className="mt-[14px] font-serif text-[14px]/[1.5] italic text-peach nav:mt-4 nav:text-[15px]">
            {site.signature}
          </div>
        </div>

        {/* Sous 340 px (iPhone 5, premier iPhone SE), l’adresse e-mail et le
            lien WhatsApp ne tiennent pas dans une demi-largeur : « Contact »
            passe sous « Le site ». */}
        <div className="grid grid-cols-2 gap-4 max-[340px]:grid-cols-1 max-[340px]:gap-y-6 nav:contents">
          <FooterColumn title="Le site">
            {/* Sans coupure : à 900 px, la colonne s’élargit pour garder
                « Les accompagnements » sur une ligne. */}
            {footerNav.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap hover:text-cream">
                {item.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <ContactItem label="Téléphone">
              <a href={site.phoneHref} className="hover:text-cream">
                {site.phone}
              </a>
            </ContactItem>
            <ContactItem label="WhatsApp">
              {/* Le numéro WhatsApp n’est jamais affiché : seulement ce libellé. */}
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-peach hover:underline"
              >
                Écrire sur WhatsApp <span aria-hidden="true">→</span>
              </a>
            </ContactItem>
            <ContactItem label="E-mail">
              <a href={site.emailHref} className="hover:text-cream">
                {site.email}
              </a>
            </ContactItem>
          </FooterColumn>
        </div>

        <div className="hidden flex-col nav:flex">
          <div className="t-label border-b border-cream/18 pb-[14px] text-cream/50">
            Entretien préalable gratuit
          </div>
          <p className="mt-4 text-[13.5px]/[1.6] text-cream/82">
            20 minutes, offertes, sans engagement. En français ou en anglais.
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Une coordonnée : petit intitulé au-dessus, valeur cliquable en dessous. */
function ContactItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[2px] nav:gap-1">
      <span className="text-[11.5px]/[1.3] text-cream/55 nav:text-[12px]">{label}</span>
      {children}
    </div>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="t-label text-[10.5px] text-cream/50 nav:border-b nav:border-cream/18 nav:pb-[14px] nav:text-[11px]">
        {title}
      </div>
      <div className="mt-2 flex flex-col gap-[3px] text-[13px]/[1.9] text-cream/80 nav:mt-4 nav:gap-[10px] nav:text-[13.5px]/[1.3] nav:text-cream/82">
        {children}
      </div>
    </div>
  );
}
